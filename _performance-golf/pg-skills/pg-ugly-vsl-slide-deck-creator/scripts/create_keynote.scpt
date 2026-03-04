-- Ugly VSL Slide Deck Creator - Keynote Generator
-- Creates a Keynote presentation from a text file where each line is one slide

on getCleanText(inputText)
    if inputText is "" then return ""
    set cleanText to inputText
    set textLen to length of cleanText

    -- Remove **{red}...{/red}** markers
    repeat while cleanText contains "**{red}"
        set o1 to offset of "**{red}" in cleanText
        set textLen to length of cleanText
        if o1 is 1 then
            -- Marker at start
            if textLen > 7 then
                set cleanText to text 8 thru textLen of cleanText
            else
                set cleanText to ""
            end if
        else
            -- Marker in middle or end
            if (o1 + 6) >= textLen then
                -- Marker at end
                set cleanText to text 1 thru (o1 - 1) of cleanText
            else
                set cleanText to (text 1 thru (o1 - 1) of cleanText) & (text (o1 + 7) thru textLen of cleanText)
            end if
        end if
        if cleanText is "" then exit repeat
    end repeat

    repeat while cleanText contains "{/red}**"
        set o1 to offset of "{/red}**" in cleanText
        set textLen to length of cleanText
        if o1 is 1 then
            -- Marker at start
            if textLen > 8 then
                set cleanText to text 9 thru textLen of cleanText
            else
                set cleanText to ""
            end if
        else
            -- Marker in middle or end
            if (o1 + 7) >= textLen then
                -- Marker at end
                set cleanText to text 1 thru (o1 - 1) of cleanText
            else
                set cleanText to (text 1 thru (o1 - 1) of cleanText) & (text (o1 + 8) thru textLen of cleanText)
            end if
        end if
        if cleanText is "" then exit repeat
    end repeat

    -- Remove ** markers
    repeat while cleanText contains "**"
        set o1 to offset of "**" in cleanText
        set textLen to length of cleanText
        if o1 is 1 then
            -- Marker at start
            if textLen > 2 then
                set cleanText to text 3 thru textLen of cleanText
            else
                set cleanText to ""
            end if
        else
            -- Marker in middle or end
            if (o1 + 1) >= textLen then
                -- Marker at end
                set cleanText to text 1 thru (o1 - 1) of cleanText
            else
                set cleanText to (text 1 thru (o1 - 1) of cleanText) & (text (o1 + 2) thru textLen of cleanText)
            end if
        end if
        if cleanText is "" then exit repeat
    end repeat

    -- Remove __ markers
    repeat while cleanText contains "__"
        set o1 to offset of "__" in cleanText
        set textLen to length of cleanText
        if o1 is 1 then
            -- Marker at start
            if textLen > 2 then
                set cleanText to text 3 thru textLen of cleanText
            else
                set cleanText to ""
            end if
        else
            -- Marker in middle or end
            if (o1 + 1) >= textLen then
                -- Marker at end
                set cleanText to text 1 thru (o1 - 1) of cleanText
            else
                set cleanText to (text 1 thru (o1 - 1) of cleanText) & (text (o1 + 2) thru textLen of cleanText)
            end if
        end if
        if cleanText is "" then exit repeat
    end repeat

    return cleanText
end getCleanText

on safeRemoveMarker(theText, marker, replacement)
    -- Safely remove a marker from text, handling edge cases
    if theText is "" then return ""
    if theText does not contain marker then return theText

    set outText to theText
    set maxIterations to 100
    set iterCount to 0
    repeat while outText contains marker and iterCount < maxIterations
        set iterCount to iterCount + 1
        set o1 to offset of marker in outText
        if o1 is 0 then exit repeat

        set markerLen to length of marker
        set textLen to length of outText

        if o1 is 1 and textLen is markerLen then
            -- Entire text is just the marker
            set outText to replacement
        else if o1 is 1 then
            -- Marker at start, text continues
            set outText to replacement & (text (markerLen + 1) thru textLen of outText)
        else if (o1 + markerLen - 1) >= textLen then
            -- Marker at or near end
            set outText to (text 1 thru (o1 - 1) of outText) & replacement
        else
            -- Marker in middle
            set outText to (text 1 thru (o1 - 1) of outText) & replacement & (text (o1 + markerLen) thru textLen of outText)
        end if
    end repeat
    return outText
end safeRemoveMarker

on run argv
    if (count of argv) < 2 then
        display dialog "Usage: osascript create_keynote.scpt <input_lines_file> <output_keynote_file>"
        return
    end if

    set inputFile to item 1 of argv
    set outputFile to item 2 of argv
    set fileContent to read POSIX file inputFile as «class utf8»

    -- Split content into slides using blank lines as delimiters
    -- Each slide can have multiple lines (for line break control within a slide)
    set rawLines to paragraphs of fileContent
    set slideList to {}
    set currentSlide to ""

    repeat with aLine in rawLines
        set lineText to aLine as text
        if lineText is "" then
            -- Blank line = end of current slide, start new slide
            if currentSlide is not "" then
                set end of slideList to currentSlide
                set currentSlide to ""
            end if
        else
            -- Add line to current slide
            if currentSlide is "" then
                set currentSlide to lineText
            else
                -- Use linefeed (ASCII 10) for line breaks within slide
                -- Keynote requires linefeed for proper line break rendering
                set currentSlide to currentSlide & linefeed & lineText
            end if
        end if
    end repeat

    -- Don't forget the last slide if file doesn't end with blank line
    if currentSlide is not "" then
        set end of slideList to currentSlide
    end if

    set lineList to slideList

    -- Red color (RGB: 177, 24, 0 = #B11800)
    set redColor to {177 * 257, 24 * 257, 0 * 257}

    tell application "Keynote"
        activate

        set newDoc to make new document with properties {document theme:theme "White", width:1920, height:1080}

        tell newDoc
            delete slide 1
            set slideCount to 0

            repeat with lineText in lineList
                set currentLine to lineText as text

                if currentLine is not "" then
                    set cleanText to my getCleanText(currentLine)
                    -- Skip if clean text is empty
                    if cleanText is not "" then
                        set newSlide to make new slide with properties {base layout:master slide "Title - Center"}

                        tell newSlide
                            tell default title item
                                -- Resize and reposition title text box for consistent display
                                -- Position: x=141, y=59 (centered on 1920px slide)
                                -- Size: width=1638, height=962 (default width)
                                -- Orphan detection will expand width dynamically if needed
                                set position to {141, 59}
                                set width to 1638
                                set height to 962

                                set object text to cleanText

                                tell object text
                                    set font to "Montserrat-Medium"
                                    set size to 112
                                end tell

                                -- Process BOLD+RED: **{red}...{/red}**
                                if currentLine contains "**{red}" then
                                    set startMarkerPos to offset of "**{red}" in currentLine
                                    set currentLineLen to length of currentLine
                                    if startMarkerPos > 0 and (startMarkerPos + 7) <= currentLineLen then
                                        -- Get text before marker and calculate clean position
                                        set textBefore to ""
                                        if startMarkerPos > 1 then
                                            set textBefore to text 1 thru (startMarkerPos - 1) of currentLine
                                        end if
                                        set cleanBefore to my getCleanText(textBefore)
                                        if cleanBefore is "" then
                                            set startPos to 1
                                        else
                                            set startPos to (length of cleanBefore) + 1
                                        end if

                                        -- Find end marker - use explicit bounds instead of -1
                                        set afterStartIdx to startMarkerPos + 7
                                        if afterStartIdx <= currentLineLen then
                                            set afterStart to text afterStartIdx thru currentLineLen of currentLine
                                            set endMarkerPos to offset of "{/red}**" in afterStart
                                            if endMarkerPos > 1 then
                                                set markedText to text 1 thru (endMarkerPos - 1) of afterStart
                                                set endPos to startPos + (length of markedText) - 1

                                                if startPos > 0 and endPos >= startPos and endPos <= (length of cleanText) then
                                                    try
                                                        tell object text
                                                            set font of characters startPos thru endPos to "Montserrat-Bold"
                                                            set color of characters startPos thru endPos to redColor
                                                        end tell
                                                    end try
                                                end if
                                            else if endMarkerPos is 1 then
                                                -- Edge case: empty content between markers, skip
                                            end if
                                        end if
                                    end if
                                end if

                                -- Process BOLD: **...** (but not the red ones)
                                -- First check if there are non-red ** markers
                                set tempLine to currentLine
                                -- Remove red markers temporarily using safe method
                                set tempLine to my safeRemoveMarker(tempLine, "**{red}", "XXXX")
                                set tempLine to my safeRemoveMarker(tempLine, "{/red}**", "YYYY")

                                if tempLine contains "**" then
                                    set startMarkerPos to offset of "**" in tempLine
                                    set tempLineLen to length of tempLine
                                    if startMarkerPos > 0 and (startMarkerPos + 2) <= tempLineLen then
                                        set textBefore to ""
                                        if startMarkerPos > 1 then
                                            set textBefore to text 1 thru (startMarkerPos - 1) of tempLine
                                        end if
                                        -- Clean the before text (remove our placeholders)
                                        set cleanBefore to my safeRemoveMarker(textBefore, "XXXX", "")
                                        set cleanBefore to my safeRemoveMarker(cleanBefore, "YYYY", "")
                                        if cleanBefore is "" then
                                            set startPos to 1
                                        else
                                            set startPos to (length of cleanBefore) + 1
                                        end if

                                        -- Find second **
                                        set afterStartIdx to startMarkerPos + 2
                                        if afterStartIdx <= tempLineLen then
                                            set afterFirst to text afterStartIdx thru tempLineLen of tempLine
                                            set endMarkerPos to offset of "**" in afterFirst
                                            if endMarkerPos > 1 then
                                                set markedText to text 1 thru (endMarkerPos - 1) of afterFirst
                                                -- Clean the marked text
                                                set cleanMarked to my safeRemoveMarker(markedText, "XXXX", "")
                                                set cleanMarked to my safeRemoveMarker(cleanMarked, "YYYY", "")
                                                if cleanMarked is not "" then
                                                    set endPos to startPos + (length of cleanMarked) - 1

                                                    if startPos > 0 and endPos >= startPos and endPos <= (length of cleanText) then
                                                        try
                                                            tell object text
                                                                set font of characters startPos thru endPos to "Montserrat-Bold"
                                                            end tell
                                                        end try
                                                    end if
                                                end if
                                            else if endMarkerPos is 1 then
                                                -- Edge case: closing ** immediately follows opening **, skip
                                            end if
                                        end if
                                    end if
                                end if

                                -- Process UNDERLINE: __...__
                                if currentLine contains "__" then
                                    set startMarkerPos to offset of "__" in currentLine
                                    set currentLineLen to length of currentLine
                                    if startMarkerPos > 0 and (startMarkerPos + 2) <= currentLineLen then
                                        set textBefore to ""
                                        if startMarkerPos > 1 then
                                            set textBefore to text 1 thru (startMarkerPos - 1) of currentLine
                                        end if
                                        set cleanBefore to my getCleanText(textBefore)
                                        if cleanBefore is "" then
                                            set startPos to 1
                                        else
                                            set startPos to (length of cleanBefore) + 1
                                        end if

                                        -- Find second __ - use explicit bounds instead of -1
                                        set afterStartIdx to startMarkerPos + 2
                                        if afterStartIdx <= currentLineLen then
                                            set afterFirst to text afterStartIdx thru currentLineLen of currentLine
                                            set endMarkerPos to offset of "__" in afterFirst
                                            if endMarkerPos > 1 then
                                                set markedText to text 1 thru (endMarkerPos - 1) of afterFirst
                                                set endPos to startPos + (length of markedText) - 1

                                                if startPos > 0 and endPos >= startPos and endPos <= (length of cleanText) then
                                                    try
                                                        -- Use italic as placeholder since Keynote AppleScript doesn't support underline directly
                                                        tell object text
                                                            set font of characters startPos thru endPos to "Montserrat-MediumItalic"
                                                        end tell
                                                    end try
                                                end if
                                            end if
                                        end if
                                    end if
                                end if

                            end tell
                        end tell

                        set slideCount to slideCount + 1
                    end if
                end if
            end repeat

        end tell

        -- Small delay to ensure document is ready
        delay 2
    end tell

    -- Save the presentation to the specified output path
    -- Use do shell script to create an empty placeholder (allows POSIX file coercion to work)
    do shell script "touch " & quoted form of outputFile

    -- Convert POSIX path to file reference outside Keynote's context
    set theFile to POSIX file outputFile

    tell application "Keynote"
        save newDoc in theFile
    end tell

    return "Created and saved presentation with " & (slideCount as text) & " slides to " & outputFile
end run

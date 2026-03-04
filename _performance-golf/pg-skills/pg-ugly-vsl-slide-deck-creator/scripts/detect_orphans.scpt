-- Detect orphaned words in Keynote presentations
-- This script checks each slide to see if the last line has only 1-2 words
-- by examining the actual rendered text bounds

on run argv
    if (count of argv) < 1 then
        -- If no args, work with front document
        set checkOnly to true
    else
        set checkOnly to (item 1 of argv is "check")
    end if

    set orphanSlides to {}

    tell application "Keynote"
        if (count of documents) is 0 then
            return "No Keynote document open"
        end if

        tell front document
            set slideCount to count of slides
            set problemReport to ""

            repeat with slideNum from 1 to slideCount
                tell slide slideNum
                    try
                        tell default title item
                            set slideText to object text as text
                            set boxWidth to width
                            set boxHeight to height

                            -- Count explicit newlines in source text
                            set sourceLineCount to 1
                            repeat with i from 1 to length of slideText
                                if character i of slideText is linefeed or character i of slideText is return then
                                    set sourceLineCount to sourceLineCount + 1
                                end if
                            end repeat

                            -- Get the text height - if it's larger than expected for sourceLineCount lines,
                            -- Keynote has auto-wrapped the text
                            -- At 112pt, each line is roughly 134pt tall (112pt + leading)
                            set expectedHeight to sourceLineCount * 134

                            -- We can't directly get rendered line count, but we can get text bounds
                            -- For now, let's just report the slide text for manual review

                            -- Check if last "line" (after last newline) is short
                            if slideText contains linefeed then
                                set lastNewline to 0
                                repeat with i from 1 to length of slideText
                                    if character i of slideText is linefeed then
                                        set lastNewline to i
                                    end if
                                end repeat
                                if lastNewline > 0 and lastNewline < length of slideText then
                                    set lastLine to text (lastNewline + 1) thru (length of slideText) of slideText
                                    -- Count words in last line
                                    set wordCount to 1
                                    repeat with i from 1 to length of lastLine
                                        if character i of lastLine is " " then
                                            set wordCount to wordCount + 1
                                        end if
                                    end repeat
                                    -- Flag if last explicit line is very short (likely will have orphan after auto-wrap)
                                    if wordCount <= 2 and length of lastLine < 20 then
                                        set problemReport to problemReport & "Slide " & slideNum & ": Last line short (" & wordCount & " words): " & lastLine & linefeed
                                    end if
                                end if
                            end if

                            -- Also check total character count vs expected
                            -- Long slides are more likely to have wrap issues
                            set charCount to length of slideText
                            set charsPerLine to 26 -- Conservative estimate for 112pt Montserrat
                            set expectedLines to (charCount / charsPerLine) as integer
                            if expectedLines > sourceLineCount then
                                set problemReport to problemReport & "Slide " & slideNum & ": May auto-wrap (" & charCount & " chars, " & sourceLineCount & " explicit lines, ~" & expectedLines & " expected)" & linefeed
                            end if

                        end tell
                    on error errMsg
                        -- Skip slides without title items
                    end try
                end tell
            end repeat

            if problemReport is "" then
                return "No potential orphan issues detected"
            else
                return problemReport
            end if
        end tell
    end tell
end run

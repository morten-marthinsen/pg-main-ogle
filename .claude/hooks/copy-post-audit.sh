#!/bin/bash
# Copy Post-Audit — PostToolUse Hook
# Fires AFTER Edit/Write on any copy file across the repo.
# Forces an audit of what was just written before presenting to user.
# Non-copy files exit silently with no error.

exec 2>/dev/null
trap 'exit 0' ERR

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/"file_path"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')

# Only fire for .md or .html files within _performance-golf/ (all copy work)
# Excludes system files
if echo "$FILE_PATH" | grep -qiE '_performance-golf/.*\.(md|html)$' && \
   ! echo "$FILE_PATH" | grep -qiE '(CLAUDE\.md|SESSION-LOG|AGENT\.md|\.hooks/|skills/)'; then

  cat << 'AUDIT'
{"type":"reminder","detector":"copy-post-audit","severity":"critical","message":"COPY EDIT COMPLETE — MANDATORY AUDIT BEFORE PRESENTING TO USER. Re-read what you just wrote and check EACH of these BEFORE responding: (1) Any word a golfer at a bar wouldn't understand? Fix it now. (2) Any sentence where the system is the subject instead of the reader? Rewrite it now. (3) Any jargon from internal docs that the frame claim didn't teach? Translate it now. (4) Any line that plants doubt or introduces failure? Remove it now. (5) Any absolute the reader can argue with? Switch to recognition language now. (6) Any element that's redundant with something already on the page? Kill the weaker one now. If ANY of these checks fail, make another edit to fix it BEFORE responding to the user. The user should NEVER catch a violation of a principle that exists."}
AUDIT
fi

exit 0

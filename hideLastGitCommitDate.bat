@echo off
set "REPO_PATH=%~d0\repo"
set "GIT_AUTHOR_DATE=1970-01-01T08:00:00"
set "GIT_COMMITTER_DATE=%GIT_AUTHOR_DATE%"

git --git-dir="%REPO_PATH%\.git" --work-tree="%REPO_PATH%" commit --amend --no-edit --date="%GIT_AUTHOR_DATE%"

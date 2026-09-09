@echo off
REM Daily Neural Dispatch top-10 AI news run. Invoked by the "Neural Dispatch Daily AI Top 10"
REM Windows scheduled task; run it by hand to test. Logs to logs\daily-dispatch-<date>.log.

set REPO=C:\Projects\APOLLO TECHNOLOGIES US\CHIEF REVENUE OFFICER (CRO)_AGENT\outreach_staging\outreach_staging\neural-dispatch
set CLAUDE=C:\Users\Apollo Technologies\AppData\Roaming\npm\claude.cmd

cd /d "%REPO%" || exit /b 1
if not exist "logs" mkdir "logs"

for /f "tokens=2 delims==" %%d in ('wmic os get localdatetime /value 2^>nul ^| find "="') do set DT=%%d
set STAMP=%DT:~0,8%

echo ==== run started %DATE% %TIME% ==== >> "logs\daily-dispatch-%STAMP%.log"
call "%CLAUDE%" -p "/daily-ai-top10" --permission-mode acceptEdits >> "logs\daily-dispatch-%STAMP%.log" 2>&1
echo ==== run finished %DATE% %TIME% (exit %ERRORLEVEL%) ==== >> "logs\daily-dispatch-%STAMP%.log"

@echo off
echo ==========================================
echo PUSH TO GITHUB - TrucksOnFlex
echo ==========================================
echo.
echo Your code is committed and ready to push!
echo.
echo Option 1: If you have GitHub Desktop installed:
echo    - Open GitHub Desktop
echo    - Click "Push origin" button
echo    - That's it!
echo.
echo Option 2: Using Personal Access Token:
echo.
set /p TOKEN="Paste your GitHub Personal Access Token (or press Enter to skip): "
echo.

if "%TOKEN%"=="" (
    echo No token provided. Trying standard push...
    echo You'll be prompted to log in.
    echo.
    git push origin main
) else (
    echo Pushing with token...
    echo.
    git push https://%TOKEN%@github.com/Unendingmould/driveon-rentals.git main
)

echo.
if %ERRORLEVEL% EQU 0 (
    echo ==========================================
    echo SUCCESS! Code pushed to GitHub! 🎉
    echo ==========================================
    echo.
    echo Next step: Deploy to Netlify
    echo 1. Go to: https://app.netlify.com/
    echo 2. Click "Add new site"
    echo 3. Import from GitHub
    echo 4. Select "driveon-rentals"
    echo 5. Add environment variables
    echo 6. Deploy!
    echo.
    echo See DEPLOYMENT_GUIDE.md for details.
    echo.
) else (
    echo ==========================================
    echo PUSH FAILED - Authentication needed
    echo ==========================================
    echo.
    echo Get Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Check "repo" scope
    echo 4. Copy the token
    echo 5. Run this script again and paste it
    echo.
    echo OR use GitHub Desktop app (easier!)
    echo.
)

pause

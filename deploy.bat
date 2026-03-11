@echo off
REM Laravel Production Deployment Script for Windows
REM Run this script after deploying to production

echo.
echo ======================================
echo   Laravel Production Deployment
echo ======================================
echo.

echo [1/7] Installing composer dependencies...
call composer install --optimize-autoloader --no-dev

echo.
echo [2/7] Installing NPM dependencies...
call npm install

echo.
echo [3/7] Building frontend assets...
call npm run build

echo.
echo [4/7] Caching configuration...
call php artisan config:cache
call php artisan route:cache
call php artisan view:cache
call php artisan event:cache

echo.
echo [5/7] Running database migrations...
call php artisan migrate --force

echo.
echo [6/7] Optimizing application...
call php artisan optimize

echo.
echo [7/7] Cleaning up...
call php artisan cache:clear

echo.
echo ======================================
echo   Deployment Complete!
echo ======================================
echo.
echo IMPORTANT - Manual steps required:
echo   1. Generate APP_KEY: php artisan key:generate
echo   2. Update .env with production database credentials
echo   3. Set APP_ENV=production in .env
echo   4. Set APP_DEBUG=false in .env
echo   5. Configure web server to point to /public
echo.
pause

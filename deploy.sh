#!/bin/bash

# Laravel Production Deployment Script
# Run this script after deploying to production

echo "🚀 Starting Laravel deployment optimization..."

# 1. Install dependencies
echo "📦 Installing composer dependencies..."
composer install --optimize-autoloader --no-dev

# 2. Install NPM dependencies and build assets
echo "🎨 Building frontend assets..."
npm install
npm run build

# 3. Clear and cache configuration
echo "⚙️  Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 4. Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# 5. Optimize application
echo "⚡ Optimizing application..."
php artisan optimize

# 6. Set proper permissions
echo "🔒 Setting file permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

echo "✅ Deployment complete!"
echo ""
echo "📝 Don't forget to:"
echo "   1. Set APP_KEY in .env (php artisan key:generate)"
echo "   2. Configure database credentials in .env"
echo "   3. Set APP_ENV=production and APP_DEBUG=false"
echo "   4. Set up SSL certificate"
echo "   5. Configure web server to point to /public directory"

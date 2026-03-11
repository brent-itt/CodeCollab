# Deployment Guide - CodeCollab

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env` on server
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate new `APP_KEY`: `php artisan key:generate`
- [ ] Configure database credentials

### 2. Database Setup
```bash
# On server - create MySQL database
mysql -u root -p
CREATE DATABASE codecollab;
exit;

# Update .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=codecollab
DB_USERNAME=your_username
DB_PASSWORD=your_secure_password

# Run migrations
php artisan migrate --force
```

### 3. Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

### 4. Optimize for Production
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### 5. Set Permissions
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 6. Web Server Configuration

**Apache (.htaccess already included)**
- Point document root to `public/` folder

**Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/CodeCollab/public;
    
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## Current Status

✅ **Ready for Demo/Testing:**
- Database structure complete
- Basic functionality working
- Can be deployed to test server

⚠️ **NOT Ready for Production:**
- No real authentication system
- API routes are unprotected
- Using SQLite (should use MySQL/PostgreSQL)
- No user management

## What's Missing for Production

1. **Authentication System**
   - Implement Laravel Breeze/Jetstream
   - Add login/registration controllers
   - Protect routes with middleware

2. **Authorization**
   - Add middleware to API routes
   - Implement ownership checks
   - Add role-based permissions

3. **Security Enhancements**
   - Rate limiting on API
   - Input validation
   - XSS protection
   - SQL injection prevention (already handled by Eloquent)

4. **Production Database**
   - Switch from SQLite to MySQL/PostgreSQL
   - Set up database backups
   - Configure connection pooling

## Recommended Hosting Platforms

1. **Laravel Forge** - Easiest for Laravel apps
2. **DigitalOcean** - Good balance of price/performance
3. **AWS/Heroku** - Enterprise solutions
4. **Shared Hosting** - Budget option (cPanel with PHP support)

## Post-Deployment

1. Test all features
2. Monitor error logs: `tail -f storage/logs/laravel.log`
3. Set up SSL certificate (Let's Encrypt)
4. Configure backups
5. Set up monitoring (uptime, performance)

## Quick Deploy Commands

```bash
# On server after git pull
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

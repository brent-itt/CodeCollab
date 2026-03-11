# CodeCollab - Collaborative Code Learning Platform

A modern web-based collaborative coding platform built with Laravel and vanilla JavaScript.

## Features

✅ **User Authentication** - Secure registration and login system  
✅ **Code Editor** - Multi-language code editor with syntax highlighting  
✅ **Collaboration System** - Create and manage coding projects with teams  
✅ **Code Snippets** - Save and share code snippets  
✅ **Tutorials** - Interactive programming tutorials for 15+ languages  
✅ **Real-time Preview** - Live code preview for web development  
✅ **Database Storage** - All data persisted in database

## Quick Start

```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database (SQLite for development)
touch database/database.sqlite
php artisan migrate

# Start server
php artisan serve
```

Visit: `http://localhost:8000`

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Tech Stack

- Laravel 12
- MySQL/SQLite
- CodeMirror
- Session-based Authentication

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [API Documentation](#api-endpoints) - REST API reference

## API Endpoints

**Authentication:**
- `POST /api/register` - Register user
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/user` - Get current user

**Collaborations:**
- `GET /api/collaborations` - List all
- `POST /api/collaborations` - Create
- `GET /api/collaborations/{id}` - View
- `PUT /api/collaborations/{id}` - Update
- `DELETE /api/collaborations/{id}` - Delete

## License

Open-source software.

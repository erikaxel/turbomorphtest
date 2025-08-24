# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Rails 8.0 application named "Turbomorphtest" that demonstrates a basic blog-style application with Users and Posts. The application uses:
- Ruby on Rails 8.0.2+
- SQLite3 database
- Turbo Rails for SPA-like behavior
- Stimulus for modest JavaScript framework
- Importmap for JavaScript dependencies
- Propshaft for modern asset pipeline

## Development Commands

### Server Management
- `bin/rails server` or `bin/rails s` - Start the development server
- `bin/rails console` or `bin/rails c` - Open Rails console

### Database Operations
- `bin/rails db:setup` - Create database, load schema, and seed data
- `bin/rails db:migrate` - Run pending migrations
- `bin/rails db:rollback` - Rollback last migration
- `bin/rails db:reset` - Drop, recreate, and seed database
- `bin/rails db:seed` - Load seed data

### Testing
- `bin/rails test` - Run tests (excluding system tests)
- `bin/rails test:system` - Run system tests
- `bin/rails test:all` - Run all tests including system tests

### Code Quality
- `bundle exec rubocop` - Run RuboCop linter (from rubocop-rails-omakase gem)
- `bundle exec brakeman` - Run security vulnerability scanner

### Asset Management
- `bin/rails assets:precompile` - Precompile assets for production
- `bin/rails assets:clean` - Remove old compiled assets

## Application Architecture

### Models
- `User` - Has many posts, with name and email attributes
- `Post` - Belongs to user, with title and content attributes

### Controllers
- `ApplicationController` - Base controller with common functionality
- `PostsController` - Full CRUD operations for posts (root route)
- `UsersController` - Full CRUD operations for users

### Routes
- Root path: `posts#index` - Main landing page showing all posts
- `/posts` - Standard RESTful routes for posts
- `/users` - Standard RESTful routes for users
- `/up` - Health check endpoint

### Frontend Stack
- **Views**: ERB templates with standard Rails view helpers
- **JavaScript**: Stimulus controllers for enhanced interactivity
- **CSS**: Standard CSS with Rails asset pipeline
- **Turbo**: Enabled for SPA-like navigation and form submissions

### Database
- SQLite3 for development and test environments
- Standard Rails migration pattern
- Foreign key constraints enabled between posts and users

## Key Configuration
- Application module: `Turbomorphtest`
- System tests disabled (`config.generators.system_tests = nil`)
- Rails 8.0 defaults loaded
- Development features like web console and debug gem available
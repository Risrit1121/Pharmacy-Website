# AyurVeda Pharmacy 🌿

A full-stack Ayurvedic pharmacy website with modern features.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (local)

## Quick Start

### 1. Start MongoDB
```bash
brew services start mongodb-community
```

### 2. Start Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### 3. Seed Database (first time only)
```bash
cd backend
npm run seed
```

### 4. Start Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## Admin Access
- URL: http://localhost:5173/admin
- Email: `admin@ayurveda.com`
- Password: `admin123`

## Features
- 🛍️ Product catalog with search, filter, sort & pagination
- 🛒 Shopping cart (localStorage)
- 📦 Order management with status tracking
- 🌿 Ayurvedic treatments showcase
- ⭐ Product reviews & ratings
- 👤 User auth (JWT) with profile management
- ❤️ Wishlist
- 📱 Fully responsive design
- 🔐 Admin panel (products, orders, treatments)
- 📬 Contact form
- 🎨 Modern UI with animations

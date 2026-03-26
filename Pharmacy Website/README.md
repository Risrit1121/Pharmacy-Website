# AyurVeda Pharmacy 🌿

A full-stack Ayurvedic pharmacy website built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (local)

---

## Prerequisites

Install the following before getting started:

### 1. Node.js
- Download from https://nodejs.org (choose the LTS version)
- During installation, check **"Add to PATH"**
- Verify: open Command Prompt and run `node -v` and `npm -v`

### 2. MongoDB Community Server
- Download from https://www.mongodb.com/try/download/community
- Choose **Windows**, **MSI** package
- During installation, select **"Install MongoDB as a Service"** — this makes it start automatically
- Verify: open Command Prompt and run `mongod --version`

### 3. Git (optional, for cloning)
- Download from https://git-scm.com/download/win

---

## Installation & Setup

Open **Command Prompt** or **PowerShell** and follow these steps.

### Step 1 — Get the project

Either clone it:
```
git clone <your-repo-url>
cd "Pharmacy Website"
```
Or extract the ZIP and open a terminal inside the `Pharmacy Website` folder.

---

### Step 2 — Set up the Backend

```
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with this content:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/ayurveda_pharmacy
JWT_SECRET=ayurveda_secret_key_2024
NODE_ENV=development
```

> If a `.env` file already exists, skip this step.

---

### Step 3 — Set up the Frontend

Open a **new** Command Prompt window, navigate back to the project root, then:
```
cd frontend
npm install
```

---

### Step 4 — Start MongoDB

If you installed MongoDB as a service, it's already running. To confirm or start it manually:

```
net start MongoDB
```

---

### Step 5 — Seed the Database (first time only)

In the `backend` terminal:
```
npm run seed
```

---

### Step 6 — Start the Backend

In the `backend` terminal:
```
npm run dev
```
Backend runs at: http://localhost:5001

---

### Step 7 — Start the Frontend

In the `frontend` terminal:
```
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Admin Access

- URL: http://localhost:5173/admin
- Email: `admin@ayurveda.com`
- Password: `admin123`

---

## Features

- 🛍️ Product catalog with search, filter, sort & pagination
- 🛒 Shopping cart (localStorage)
- 📦 Order management with status tracking
- 🌿 Ayurvedic treatments showcase
- ⭐ Product reviews & ratings
- 👤 User authentication (JWT) with profile management
- ❤️ Wishlist
- 📱 Fully responsive design
- 🔐 Admin panel (products, orders, treatments)
- 📬 Contact form
- 🎨 Modern UI with animations

---

## Troubleshooting

**`npm` is not recognized**
→ Reinstall Node.js and make sure "Add to PATH" is checked.

**MongoDB connection error**
→ Run `net start MongoDB` in Command Prompt (as Administrator if needed).

**Port already in use**
→ Change `PORT=5001` in `.env` to another port like `5002`, then restart the backend.

**`npm install` fails**
→ Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again.

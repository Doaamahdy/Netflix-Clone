# 🎬 Netflix Clone

A full-stack Netflix-inspired streaming platform built with **Node.js**, **Express**, **MongoDB**, **React**, and **Tailwind CSS**, using **The Movie Database (TMDB) API** for fetching movies and TV shows data.

---

## 🚀 Features

### 👤 Authentication

- Signup, login, logout functionality
- Auth persistence with JWT and cookies
- Protected routes and auto auth check on page reload

### 🎞️ Movie & TV Show Browsing

- Trending movies and TV shows
- Browse by category (Action, Comedy, etc.)
- Detailed info, trailers, and similar titles

### 🔍 Search

- Search movies, TV shows, and actors
- Track and manage search history

### ⏯️ Watch Page

- Watch specific movie or TV show trailers and details

### 📜 History

- View previously searched/watched items

---

## ⚙️ Tech Stack

### 🔧 Backend

- **Node.js**, **Express.js**, **MongoDB**
- JWT-based authentication with `cookie-parser`
- Modular MVC structure with RESTful API endpoints

### 🎨 Frontend

- **React**, **Tailwind CSS**
- Routing with React Router DOM
- Toast notifications with `react-hot-toast`
- Zustand-based global auth state management

---

## 📂 Folder Structure

```
netflix-clone/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── skeletons/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
└── README.md
```

---

## 📦 Dependencies

### Backend

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs
- cookie-parser
- express-async-handler
- nodemon (dev)
- cross-env (dev)

### Frontend

- react
- react-dom
- react-router-dom
- tailwindcss
- react-hot-toast
- lucide-react

---

## 🔌 API Used

This project uses [TMDB (The Movie Database) API](https://www.themoviedb.org/documentation/api) to fetch:

- Trending movies/TV shows
- Movie/TV details and trailers
- Similar content recommendations
- Category-based listings
- Person details in search

---

## 📡 API Endpoints

### Auth (`/api/auth`)

- `POST /signup`
- `POST /login`
- `POST /logout`
- `GET /authCheck` (protected)

### Movies (`/api/movies`)

- `GET /trending`
- `GET /:id/details`
- `GET /:id/trailers`
- `GET /:id/similar`
- `GET /:category`

### TV Shows (`/api/tv`)

- `GET /trending`
- `GET /:id/details`
- `GET /:id/trailers`
- `GET /:id/similar`
- `GET /:category`

### Search (`/api/search`)

- `GET /person/:query`
- `GET /tv/:query`
- `GET /movie/:query`
- `GET /history`
- `DELETE /history/:id`

---

## 🧪 Running Locally

### Prerequisites

- Node.js, npm
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Setup

```bash
# Clone repository
git clone https://github.com/Doaamahdy/netflix-clone.git
cd netflix-clone

# Setup backend
cd backend
npm install
npm run dev

# Setup frontend
cd ../frontend
npm install
npm run dev
```

---

## 🙌 Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api)

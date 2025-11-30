# Chirrup - Social Media Platform

A full-stack social media platform built with Vue.js and Node.js, featuring real-time interactions, user authentication, and content management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Vue](https://img.shields.io/badge/vue-3.x-green.svg)

## 🚀 Features

- **User Authentication** - Secure registration and login system
- **Social Feed** - View and interact with posts from other users
- **Post Management** - Create, update, and delete your own posts
- **Social Interactions** - Like/unlike posts, follow/unfollow users
- **User Profiles** - View detailed user profiles and activity
- **Search Functionality** - Find users by username
- **Profanity Filter** - Automated content moderation using bad-words library

## 🛠️ Tech Stack

**Frontend:**

- Vue.js 3 with Composition API
- Vue Router for navigation
- Axios for API requests

**Backend:**

- Node.js with Express.js
- SQLite database
- JWT authentication
- Mocha for automated testing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## ⚡ Quick Start

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/OuamboC/Chirrup-Social-Media.git
cd Chirrup-Social-Media
```

2. Install backend dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:3333`

4. (Optional) Run tests:

```bash
npm run test
```

### Frontend Setup

1. Navigate to the Vue project:

```bash
cd vue-project
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit the URL provided (typically `http://localhost:5173`)

## 📁 Project Structure

```
Chirrup-Social-Media/
├── app/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database interactions
│   ├── routes/          # API endpoints
│   └── lib/            # Middleware (authentication)
├── vue-project/
│   ├── src/
│   │   ├── components/  # Reusable Vue components
│   │   ├── views/       # Page components
│   │   ├── services/    # API service layer
│   │   └── router/      # Route definitions
│   └── public/          # Static assets
├── tests/              # Automated test suite
└── database.js         # Database configuration
```

## 🔑 API Endpoints

### Authentication

- `POST /api/register` - Create new account
- `POST /api/login` - User login

### Posts

- `GET /api/feed` - Get all posts
- `POST /api/posts` - Create new post (authenticated)
- `PATCH /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

### Social

- `POST /api/users/:id/follow` - Follow user (authenticated)
- `DELETE /api/users/:id/follow` - Unfollow user (authenticated)
- `POST /api/posts/:id/like` - Like post (authenticated)
- `DELETE /api/posts/:id/like` - Unlike post (authenticated)

### Users

- `GET /api/users` - Search users
- `GET /api/users/:id` - Get user profile

## 🧪 Testing

Run the automated test suite:

```bash
npm run test
```

To reset the database before testing:

```bash
npm run wipe
```

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Canis Ouambo**

- GitHub: [@OuamboC](https://github.com/OuamboC)
- LinkedIn: [canis-ouambo](https://www.linkedin.com/in/canis-breal-ouambo/)

## 🙏 Acknowledgments

Built as part of the Full-Stack Web Development course at Manchester Metropolitan University.

<div align="center">
  <img src="vue-project/public/favicon.ico" alt="Chirrup Logo" width="80" height="80">
  
  # 📬 Chirrup - Social Media Platform

  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://chirrup-social-media.vercel.app)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
  [![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)
  [![Vue](https://img.shields.io/badge/vue-3.x-green.svg?style=for-the-badge&logo=vue.js)](https://vuejs.org)

  ### A modern, full-stack social media platform with real-time interactions, user authentication, and sleek Tailwind CSS design.

  [Live Demo](https://chirrup-social-media.vercel.app) • [Report Bug](https://github.com/OuamboC/Chirrup-Social-Media/issues) • [Request Feature](https://github.com/OuamboC/Chirrup-Social-Media/issues)

</div>

---

**🔗 Live Demo:** [chirrup-social-media.vercel.app](https://chirrup-social-media.vercel.app)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based registration and login
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- 📝 **Post Management** - Create, read, update, and delete posts
- ❤️ **Social Interactions** - Like/unlike posts, follow/unfollow users
- 👤 **User Profiles** - Detailed profiles with follower/following stats
- 🔍 **Search Functionality** - Find users by username
- 🎨 **Modern UI** - Gradient design with smooth animations
- 🛡️ **Content Moderation** - Built-in profanity filter

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Composition API for reactive components
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Lightweight database
- **JWT** - Secure authentication tokens

### DevOps
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **Git/GitHub** - Version control
- **Mocha** - Automated testing

## 🚀 Live Deployment

**Frontend:** https://chirrup-social-media.vercel.app  
**Backend API:** https://chirrup-social-media-production.up.railway.app

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## ⚡ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/OuamboC/Chirrup-Social-Media.git
cd Chirrup-Social-Media
```

### 2️⃣ Backend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on `http://localhost:3333`

**Run tests:**
```bash
npm run test
```

**Reset database:**
```bash
npm run wipe
```

### 3️⃣ Frontend Setup

```bash
# Navigate to Vue project
cd vue-project

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4️⃣ Build for Production

```bash
# In vue-project directory
npm run build
```

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

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Register new account |
| `POST` | `/login` | User login |
| `POST` | `/logout` | User logout |

### 📝 Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/feed` | Get all posts | ❌ |
| `GET` | `/posts/:id` | Get single post | ❌ |
| `POST` | `/posts` | Create post | ✅ |
| `PATCH` | `/posts/:id` | Update post | ✅ |
| `DELETE` | `/posts/:id` | Delete post | ✅ |
| `POST` | `/posts/:id/like` | Like post | ✅ |
| `DELETE` | `/posts/:id/like` | Unlike post | ✅ |

### 👥 Social
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users/:id/follow` | Follow user | ✅ |
| `DELETE` | `/users/:id/follow` | Unfollow user | ✅ |

### 👤 Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users/:id` | Get user profile | ❌ |
| `GET` | `/search?q=query` | Search users | ❌ |

## 🧪 Testing

Comprehensive test suite covering authentication, posts, social features, and more.

```bash
# Run all tests
npm run test

# Reset database
npm run wipe
```

**Test Coverage:**
- ✅ User creation & authentication
- ✅ Post CRUD operations
- ✅ Like/unlike functionality
- ✅ Follow/unfollow system
- ✅ Search functionality
- ✅ Error handling

## 🎯 Key Features Showcase

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Adaptive layouts for all screen sizes

### User Experience
- Smooth animations and transitions
- Real-time updates
- Intuitive interface
- Loading states and error handling

### Security
- JWT token authentication
- Password hashing
- Protected routes
- Session management

## 📸 Screenshots

```bash
# Home Feed
Modern gradient design with post cards

# User Profile
Stats display (followers, following, posts)

# Mobile View
Responsive hamburger menu navigation
```

## 🚀 Deployment

### Vercel (Frontend)
```bash
# Automatic deployment on push to master
vercel.json configured for vue-project subdirectory
```

### Railway (Backend)
```bash
# Connected to GitHub
# Automatic deploys on push
# Port: 3333 (exposed via Railway domain)
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Canis Breal Ouambo**

- 🌐 Portfolio: [Coming Soon]
- 💼 LinkedIn: [canis-breal-ouambo](https://www.linkedin.com/in/canis-breal-ouambo/)
- 🐙 GitHub: [@OuamboC](https://github.com/OuamboC)

## 🙏 Acknowledgments

- Built as part of the Full-Stack Web Development course at **Manchester Metropolitan University**
- Special thanks to the Vue.js and Node.js communities
- Inspired by modern social media platforms

## 📈 Future Enhancements

- [ ] Image upload support
- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Hashtag system
- [ ] Post comments
- [ ] Dark mode toggle
- [ ] Email verification
- [ ] Password reset functionality

---

⭐ **Star this repo if you found it helpful!**

**Live Demo:** [chirrup-social-media.vercel.app](https://chirrup-social-media.vercel.app)

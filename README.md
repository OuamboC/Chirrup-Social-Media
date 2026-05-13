<div align="center">
  <img src="vue-project/public/favicon.ico" alt="Chirrup Logo" width="80" height="80">
  
  # 📬 Chirrup - Social Media Platform

  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://chirrup-social-media.vercel.app)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
  [![Node](https://img.shields.io/badge/node-22.x-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)
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
- **Render** - Backend hosting (see `render.yaml`)
- **Git/GitHub** - Version control
- **Mocha** - Automated testing

## 🚀 Live Deployment

**Frontend:** https://chirrup-social-media.vercel.app  
**Backend API:** Deploy on Render (see below), then set **CHIRRUP_API_URL** on Vercel to your Render service URL (for example `https://chirrup-api.onrender.com`).

## 📋 Prerequisites

- Node.js **22.x** (see `.nvmrc`; `engines` in `package.json` files)
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

`vercel.json` at the repo root tells Vercel to treat the app as **Vite**, install with **`npm ci --prefix vue-project`**, build with **`npm run build --prefix vue-project`**, and publish **`vue-project/dist`**. The Vue **`package.json`** declares **`@rollup/rollup-linux-x64-gnu`** under **`optionalDependencies`** (version aligned with Rollup) so `package-lock.json` records the Linux native package—CI on Linux installs it; on Windows it is skipped. Keep the Vercel project **Root Directory** set to **`.`** (not `vue-project`), so the root `api/` serverless proxy stays included.

```bash
# Automatic deployment on push; see vercel.json
```

### Render (Backend)

1. Push this repo to GitHub, then in [Render](https://render.com): **New** → **Blueprint** (uses root `render.yaml`) **or** **Web Service** (configure manually below).
2. **Manual Web Service:** **Root Directory:** empty (repo root). **Build command:** `npm ci && npm rebuild sqlite3 --build-from-source`. **Start command:** `npm start`.
3. Render injects **`PORT`**; the server binds `0.0.0.0` to that port. No extra environment variables are required for the API itself.
4. Copy the service URL (for example `https://chirrup-api.onrender.com`). In **Vercel** → your project → **Environment Variables**, set **`CHIRRUP_API_URL`** to that URL (no trailing slash), then redeploy the frontend so the `/api` proxy can reach the API.

**Note:** SQLite (`db.sqlite`) lives on the instance disk. On Render’s free web tier the filesystem is **ephemeral**: data can reset when the service restarts or redeploys. For a production app you would use Render PostgreSQL or a persistent disk.

If the service crashes on startup with **`GLIBC_2.xx not found`** on `node_sqlite3.node`, the `sqlite3` package used a **prebuilt binary** for a newer Linux than Render’s. The `render.yaml` **build command** ends with **`npm rebuild sqlite3 --build-from-source`** so the addon is compiled on Render’s image. Use the same in the dashboard if you are not using the Blueprint.

**Render still running `npm install` only or an old commit:** Your logs must show the **same commit as GitHub `master`** (for example **`71e2945`** or newer) and a build command that includes **`npm rebuild sqlite3 --build-from-source`**. In the Render dashboard: **Settings → Build & Deploy → Build Command**, paste `npm ci && npm rebuild sqlite3 --build-from-source`, then **Manual Deploy → Clear build cache & deploy** so an old cached `node_modules` is not reused.

### Vercel proxy (`CHIRRUP_API_URL`)

The Vue production build calls same-origin **`/api/...`**, which is handled by `api/[...slug].js` on Vercel and forwarded to **`CHIRRUP_API_URL`**. You must set that variable to your Render API base URL after each new backend host change.

### Ship checklist

| Where | What to do |
|--------|------------|
| **Render (API)** | Root directory **empty**. Build **`npm ci && npm rebuild sqlite3 --build-from-source`**, start **`npm start`**. (Plain `npm install` can leave a `sqlite3` binary linked to a **too-new glibc**; rebuild fixes `GLIBC_… not found` on Render.) |
| **Vercel (UI)** | Root Directory **empty**. **`npm ci --prefix vue-project`** then **`npm run build --prefix vue-project`** (see `vercel.json`). The Vue app lists **`@rollup/rollup-linux-x64-gnu`** under **`optionalDependencies`** so the lockfile includes the Linux Rollup binary (Windows-only lockfiles used to omit it). Set **`CHIRRUP_API_URL`**. |
| **Local full stack** | From repo root: `npm ci` then `npm run dev` (API on **3333**). In another terminal: `cd vue-project && npm ci && npm run dev` (UI on **5173**). |
| **Git** | `node_modules/`, `db.sqlite`, and build output are **gitignored** — always commit **`package-lock.json`** files so `npm ci` works everywhere. |

When you **upgrade Vite / Rollup**, run `npm ls rollup` in `vue-project` and set **`optionalDependencies["@rollup/rollup-linux-x64-gnu"]`** in `vue-project/package.json` to that **exact** Rollup version, then `npm install` and commit the updated lockfile so Vercel keeps the Linux native binary.
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

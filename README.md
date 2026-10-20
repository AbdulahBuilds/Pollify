# Pollify 🗳️

> **Pollify** is a modern, full-stack polling and social opinion platform built with **React 19**, **Node.js / Express**, **MongoDB**, and **Tailwind CSS**. Create diverse poll types, vote in real-time, view dynamic analytics, and engage in community discussions.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://pollify-silk.vercel.app)
[![API Status](https://img.shields.io/badge/API-Render-46e3b7?style=for-the-badge&logo=render)](https://pollify-a6pb.onrender.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live URLs

- **Frontend App:** [https://pollify-silk.vercel.app](https://pollify-silk.vercel.app)
- **Backend API:** [https://pollify-a6pb.onrender.com](https://pollify-a6pb.onrender.com)

---

## ✨ Features

- **5 Interactive Poll Types:**
  - 🔘 **Single Choice:** Standard options with real-time percentage bars.
  - ⚖️ **Yes / No:** Quick sentiment checks.
  - ⭐ **Rating (1–5 Stars):** Customer and product review distributions.
  - 🖼️ **Image Polls:** Visual voting comparisons powered by Cloudinary.
  - 💬 **Open Feedback:** Qualitative community text answers.
- **Engagement & Discussions:**
  - Dynamic voting counts and percentage breakdown.
  - Threaded comments and nested discussion sections on every poll.
  - Bookmark favorite polls to revisit later.
- **Social & Discovery:**
  - User profiles with follower / following system.
  - Filter by Category, Poll Type, or Following Feed.
  - In-depth poll creator analytics view.
- **Authentication & Security:**
  - Secure JWT authentication with HTTP Authorization headers.
  - OTP email verification workflow (with `000000` test bypass).
  - Password recovery and reset via OTP.
- **Modern UI / UX:**
  - Sleek dark aesthetic built with Tailwind CSS.
  - Fast, responsive client-side routing with React Router.
  - Polished loading states and feedback notifications.

---

## 👥 Demo Accounts (Pre-Seeded)

You can explore the live demo or local environment immediately with any of these pre-seeded accounts:

| Name | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Alex Rivera** | `alex@pollify.com` | `password123` | Frontend Architect |
| **Sarah Chen** | `sarah@pollify.com` | `password123` | Product Designer |
| **David Miller** | `david@pollify.com` | `password123` | AI Researcher |
| **Emma Watson** | `emma@pollify.com` | `password123` | Tech Journalist |
| **Liam Vance** | `liam@pollify.com` | `password123` | DevOps & Cloud |
| **Tester** | `tester@pollify.com` | `password123` | Developer Account |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework:** [Express 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Auth:** [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **File Uploads:** [Multer](https://github.com/expressjs/multer) & [Cloudinary](https://cloudinary.com/)
- **Mailing:** [Nodemailer](https://nodemailer.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection URI

---

### 1. Clone the Repository
```bash
git clone https://github.com/AbdulahBuilds/Pollify.git
cd Pollify
```

---

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` folder (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pollify
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173

# Optional: Cloudinary configuration for image polls
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional: SMTP email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

**Seed the Database (Optional but Recommended):**
```bash
node seed.js
```

**Start the Backend Server:**
```bash
npm run dev
# Server will run on http://localhost:5000
```

---

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000
```

**Start the Frontend Dev Server:**
```bash
npm run dev
# Frontend will be live at http://localhost:5173
```

---

## 📁 Project Structure

```text
Pollify/
├── Backend/
│   ├── config/             # DB, Cloudinary & Mailer configs
│   ├── controllers/        # Auth, Poll, Vote, User, Comment logic
│   ├── middleware/         # JWT protection middleware
│   ├── models/             # Mongoose schemas (User, Poll, Comment, Notification)
│   ├── routes/             # Express API routes
│   ├── utils/              # Helper utilities (OTP, count calculation, poll shape)
│   ├── seed.js             # Demo data seeder script
│   └── server.js           # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── assets/         # Icons, images & shared styles
│   │   ├── components/     # UI components (Layout, AuthLayout, OtpStep, etc.)
│   │   ├── context/        # AuthContext state provider
│   │   ├── pages/          # Dashboard, Login, Signup, CreatePoll, SinglePoll, etc.
│   │   ├── api.js          # Axios API instance with interceptor
│   │   ├── App.jsx         # App router configuration
│   │   └── main.jsx        # React root entry
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/AbdulahBuilds/Pollify/issues).

---

## 📝 License

This project is licensed under the [ISC License](LICENSE).

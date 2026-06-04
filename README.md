<div align="center">

<img src="public/favicon.svg" alt="dsaflow.app logo" width="90" height="90" />

# dsaflow.app

### 🚀 Master Data Structures & Algorithms — The Smart Way

[![Live Demo](https://img.shields.io/badge/🌐_Live_App-dsaflow.app-7c4dff?style=for-the-badge&logoColor=white)](https://dsa-learning-hub-delta.vercel.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

*An elite, full-stack DSA platform built for FAANG placement preparation — featuring a 3D algorithm visualizer, Monaco IDE, AI tutor, curriculum tracker, placement quiz engine, daily challenges, milestone tracking, and full mobile responsiveness.*

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Elite A-Z Roadmap** | 450+ curated problems across 35 DSA modules organized by topic and pattern. |
| 📅 **Problem of the Day (POTD)** | Daily curated DSA challenges to keep your problem-solving skills sharp. |
| 🏆 **Milestones & Streaks** | Track your progress with gamified milestones and continuous learning streaks. |
| 🤖 **AI Tutor (Gemini)** | Personalized DSA interview coaching powered by Google Gemini. Ask questions, debug code, and optimize algorithms. |
| 📱 **Fully Mobile Responsive** | Optimized for all devices. Code on your tablet, review algorithms on your phone with an adaptive mobile layout and drawer navigation. |
| 🧠 **3D Algorithm Visualizer** | Real-time animated visual representations of Sorting, Trees, Graphs, and more. |
| 💻 **Monaco Coding Arena** | VS Code-powered IDE with multi-language support — C++, Python, Java, JavaScript, Go. |
| ⚡ **Live Code Execution** | Run and test code instantly via sandboxed cloud compilation (Wandbox API). |
| 🎯 **Placement Quiz Engine** | Timed quizzes with high-score tracking, mirroring real company assessments. |
| 🌓 **Light & Dark Modes** | Seamless theme switching with high-contrast accessibility optimizations. |
| 🔐 **Firebase Auth** | Secure email/password authentication with 24-hour free trial system. |
| 💳 **Razorpay Payments** | One-click ₹99 lifetime premium upgrade with instant email confirmation. |
| 📧 **Resend Email System** | Welcome, upgrade, and admin broadcast emails via Resend API. |
| 📊 **Admin Dashboard** | Full CRUD user management, support tickets, broadcast emails, and analytics. |
| 📱 **Android Ready** | Capacitor integration for seamless native Android deployment. |

---

## 🖥️ Technology Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, Context API |
| **Styling** | Vanilla CSS, CSS Variables for Theming, Responsive Media Queries |
| **Build Tool** | Vite 8 |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth (Email/Password) |
| **Backend API** | Vercel Serverless Functions (Node.js) |
| **Transactional Email** | Resend API |
| **Payments** | Razorpay (Live) |
| **Code Execution** | Wandbox API (sandboxed) |
| **AI Integration** | Google Gemini API |
| **Mobile** | Capacitor (Android) |
| **Deployment** | Vercel |

</div>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project — [create one here](https://console.firebase.google.com)
- A Resend account — [create one here](https://resend.com) *(free tier available)*

### 1. Clone the repository
```bash
git clone https://github.com/vadagammanikanta/dsaflow.app.git
cd dsaflow.app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
In `modules/auth/auth.js`, replace the `FIREBASE_CONFIG` object with your own Firebase project credentials:
```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Environment Variables
Create a `.env` file in the root directory (for local development) or configure them in Vercel:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `FIREBASE_SERVICE_ACCOUNT` | Full JSON content of your Firebase service account key |
| `ADMIN_SECRET` | Strong secret passphrase to protect admin API endpoints |
| `VITE_RAZORPAY_KEY_ID` | Your Razorpay **public** key (client-side) |
| `VITE_GEMINI_API_KEY` | Google Gemini API key for the AI Tutor |

### 5. Run locally
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

---

## 📁 Project Structure

```
dsaflow.app/
├── api/                          # Vercel Serverless Functions (Email, Code Execution, AI)
├── modules/                      # Core application logic
│   ├── auth/                     # Firebase Auth configuration
│   ├── learning/                 # A-Z DSA curriculum content
│   ├── payment/                  # Razorpay checkout integration
│   ├── visualizers/              # 3D algorithm animations
│   ├── arena/                    # Coding arena logic
│   └── ide/                      # Monaco editor configuration
├── src/                          # React Application
│   ├── components/               # UI Components (Admin, AI, Arena, IDE, Dashboard, Quiz, etc.)
│   ├── context/                  # Context API for Global State Management
│   ├── index.css                 # Global styles, CSS variables, and Mobile Responsiveness
│   ├── App.jsx                   # Main application router
│   └── main.jsx                  # React entry point
├── public/                       # Static assets
└── index.html                    # Root HTML
```

---

## 🔒 Security Highlights

- **Secure API Routes:** All sensitive operations (broadcasting, analytics) are protected via `ADMIN_SECRET`.
- **Environment Variables:** API keys and sensitive tokens are strictly managed via environment variables.
- **Client-Side Safety:** Razorpay integration utilizes only the public `KEY_ID` on the frontend.
- **Isolated Code Execution:** User code submissions run in isolated sandboxed containers via Wandbox API.
- **Data Privacy:** Firestore Security Rules ensure users can only access their own data.

---

## 📄 License

This project is private and proprietary. All rights reserved © 2026 dsaflow.app.

<div align="center">

Built with ❤️ by **V S S S Manikanta** &nbsp;|&nbsp; [Live App](https://dsa-learning-hub-delta.vercel.app) &nbsp;|&nbsp; Support: dsaflow@outlook.com

</div>

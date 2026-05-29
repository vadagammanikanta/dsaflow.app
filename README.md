<div align="center">

<img src="public/favicon.svg" alt="dsa.flow logo" width="80" height="80" />

# dsa.flow (DSA Learning Hub)

### 🚀 Master Data Structures & Algorithms — The Smart Way

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-dsa.flow-7c4dff?style=for-the-badge&logoColor=white)](https://dsa-learning-hub-delta.vercel.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

*An elite, structured DSA platform built for FAANG placement preparation — with a 3D visualizer, Monaco IDE, roadmap tracker, and placement quiz engine.*

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Elite A-Z Roadmap** | 450+ curated problems across 16 learning steps, organized by pattern |
| 🧠 **Interactive 3D Visualizers** | Animated visual representations of Sorting, Trees, Graphs, and more |
| 💻 **Monaco Code Editor** | VS Code-powered IDE with multi-language support (C++, Python, Java, JS, Go…) |
| ⚡ **Live Code Execution** | Run and test code instantly via sandboxed cloud compilation |
| 🎯 **Placement Quiz Engine** | Test your knowledge with timed quizzes and track high scores |
| 📈 **Progress Tracking** | Lessons completed, quiz scores, and learning history synced to cloud |
| 🔐 **Firebase Auth** | Secure email/password authentication with a 24-hour free trial |
| 💳 **Razorpay Payments** | One-click ₹99 lifetime premium upgrade with instant email confirmation |
| 📧 **Automated Emails** | Welcome and upgrade notifications via Gmail SMTP |
| 📊 **Admin Dashboard** | Secure API to view all users, revenue, and trial status |

---

## 🖥️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router, React Syntax Highlighter |
| **Build Tool** | Vite 8 |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth (Email/Password) |
| **Backend API** | Vercel Serverless Functions |
| **Email** | Nodemailer + Gmail SMTP |
| **Payments** | Razorpay (Live) |
| **Code Execution** | Wandbox API (sandboxed) |
| **Deployment** | Vercel |

</div>

---

## 📁 Project Structure

```
dsa-learning-hub/
├── api/                      # Vercel Serverless Functions
│   ├── send-email.js         # Welcome & upgrade email handler
│   ├── send-bulk-emails.js   # Admin bulk email endpoint
│   ├── admin-stats.js        # Admin dashboard data API
│   └── execute.js            # Code compilation proxy (Wandbox)
│
├── modules/                  # Core application modules
│   ├── auth/auth.js          # Firebase Auth + localStorage fallback
│   ├── learning/             # A-Z DSA curriculum content
│   ├── payment/payment.js    # Razorpay checkout integration
│   ├── visualizers/          # 3D algorithm animations
│   ├── arena/                # Coding arena (IDE + execution)
│   └── ide/                  # Monaco editor config
│
├── src/
│   ├── components/           # Reusable React components
│   ├── context/AuthContext.jsx  # Global auth state provider
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # Entry point
│
├── public/                   # Static assets and favicon
├── index.html                # Root HTML with Firebase CDN scripts
└── vite.config.js            # Vite config with dev email simulation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project ([create one here](https://console.firebase.google.com))

### 1. Clone the repository
```bash
git clone https://github.com/vadagammanikanta/DSA-Learning-Hub.git
cd DSA-Learning-Hub
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
  // ...
};
```

### 4. Run locally
```bash
npm run dev
```

The app will start at `http://localhost:5173`.

---

## 🌍 Deployment (Vercel)

### Environment Variables
Add the following environment variables in your [Vercel Project Settings](https://vercel.com/docs/environment-variables):

| Variable | Description |
|---|---|
| `EMAIL_USER` | Gmail address for sending emails (e.g. `noreply.yourapp@gmail.com`) |
| `EMAIL_PASS` | Gmail App Password (16-character code from Google Account) |
| `FIREBASE_SERVICE_ACCOUNT` | Full JSON content of your Firebase service account key |
| `ADMIN_SECRET` | A strong secret key to protect the admin API endpoints |

### Deploy
```bash
# Push to GitHub — Vercel auto-deploys on every push to main
git push origin main
```

---

## 🔒 Security Highlights

- **No secrets in source code** — All API keys and passwords use environment variables
- **`service-account.json` and `scratch/` are gitignored** — Private credentials never reach GitHub
- **Admin endpoints protected** — `/api/admin-stats` and `/api/send-bulk-emails` require a secret key
- **Sandboxed code execution** — User code runs in isolated Wandbox containers, not on your server
- **Firestore Security Rules** — User documents are read/write only by their authenticated owner
- **Razorpay Key ID** — Only the public key is used client-side; the secret key stays server-side

---

## 📬 Email Automation

dsa.flow sends automated emails at key moments:

| Trigger | Recipients | Content |
|---|---|---|
| New user signs up | User + Admin | Welcome email with trial details |
| User upgrades to Premium | User + Admin | Payment confirmation with transaction ID |
| Admin bulk send | All users | Custom announcement / updates |

All emails are sent from `noreply.dsa.flow@gmail.com` with support replies routed to `dsa.flow@outlook.com`.

---

## 📊 Firebase Free Tier Capacity

| Limit | Value | Users Supported |
|---|---|---|
| Firestore Storage | 1 GB | ~2,000,000 users |
| Daily Writes | 20,000/day | 20,000 signups/day |
| Daily Reads | 50,000/day | 50,000 logins/day |
| Firebase Auth | Unlimited | No limit on accounts |

---

## 📄 License

This project is private and proprietary. All rights reserved © dsa.flow.

---

<div align="center">

Built with ❤️ by **V S S S Manikanta** &nbsp;|&nbsp; [Live App](https://dsa-learning-hub-delta.vercel.app) &nbsp;|&nbsp; Support: dsa.flow@outlook.com

</div>

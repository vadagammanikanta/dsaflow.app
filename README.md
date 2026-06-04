<div align="center">

<img src="public/favicon.svg" alt="dsaflow.app logo" width="90" height="90" />

# dsaflow.app

### 🚀 Master Data Structures & Algorithms — The Smart Way

[![Live Demo](https://img.shields.io/badge/🌐_Live_App-dsaflow.app-7c4dff?style=for-the-badge&logoColor=white)](https://dsa-learning-hub-delta.vercel.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=mail&logoColor=white)](https://resend.com)

*An elite, full-stack DSA platform built for FAANG placement preparation — featuring a 3D algorithm visualizer, Monaco IDE, AI tutor, curriculum tracker, placement quiz engine, and a complete admin system with Resend-powered email broadcasting.*

</div>

---

## ✨ Feature Overview

| Feature | Description |
|---|---|
| 🗺️ **Elite A-Z Roadmap** | 450+ curated problems across 35 DSA modules organized by topic and pattern |
| 📚 **Learning Hub** | 35 topic modules with embedded YouTube videos (verified working), theory, and resources |
| 🧠 **3D Algorithm Visualizer** | Real-time animated visual representations of Sorting, Trees, Graphs, and more |
| 💻 **Monaco Coding Arena** | VS Code-powered IDE with multi-language support — C++, Python, Java, JavaScript, Go |
| ⚡ **Live Code Execution** | Run and test code instantly via sandboxed cloud compilation (Wandbox API) |
| 🤖 **AI Tutor (Gemini)** | Personalized DSA interview coaching powered by Google Gemini |
| 🎯 **Placement Quiz Engine** | Timed quizzes with high-score tracking, mirroring real company assessments |
| 📈 **Progress Tracking** | Module completion, quiz scores, and learning streaks synced to Firebase |
| 🔐 **Firebase Auth** | Secure email/password authentication with 24-hour free trial system |
| 💳 **Razorpay Payments** | One-click ₹99 lifetime premium upgrade with instant email confirmation |
| 📧 **Resend Email System** | Welcome, upgrade, and admin broadcast emails via Resend API |
| 📊 **Admin Dashboard** | Full CRUD user management, support tickets, broadcast emails, and analytics |
| 🎫 **Support Ticket System** | Users submit tickets; admin resolves them from the dashboard |
| 📱 **Mobile-Ready** | Capacitor integration for Android deployment |

---

## 🖥️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, React Syntax Highlighter |
| **Build Tool** | Vite 8 |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth (Email/Password) |
| **Backend API** | Vercel Serverless Functions (Node.js) |
| **Transactional Email** | Resend API |
| **Payments** | Razorpay (Live) |
| **Code Execution** | Wandbox API (sandboxed) |
| **AI** | Google Gemini API |
| **Mobile** | Capacitor (Android) |
| **Deployment** | Vercel |

</div>

---

## 📁 Project Structure

```
dsa-learning-hub/
├── api/                          # Vercel Serverless Functions
│   ├── route.js                  # Resend test/reference email route
│   ├── send-email.js             # Welcome & upgrade emails via Resend
│   ├── send-bulk-emails.js       # Admin broadcast with Resend + targeting
│   ├── admin-stats.js            # Admin dashboard data API
│   ├── admin-action.js           # User upgrade & ticket resolution
│   ├── ai-chat.js                # Gemini AI tutor endpoint
│   ├── execute.js                # Code compilation proxy (Wandbox)
│   └── support-ticket.js         # Support ticket submission
│
├── modules/                      # Core application logic
│   ├── auth/auth.js              # Firebase Auth + support ticket helpers
│   ├── learning/                 # A-Z DSA curriculum content & video links
│   ├── payment/payment.js        # Razorpay checkout integration
│   ├── visualizers/              # 3D algorithm animations
│   ├── arena/                    # Coding arena (IDE + execution)
│   └── ide/                      # Monaco editor configuration
│
├── src/
│   ├── components/
│   │   ├── Admin/                # Admin Dashboard (users, tickets, broadcast)
│   │   ├── AI/                   # AI Tutor interface
│   │   ├── Arena/                # Coding Arena UI
│   │   ├── IDE/                  # Monaco editor component
│   │   ├── Learning/             # Learning Hub + resource library
│   │   ├── Quiz/                 # Placement quiz engine
│   │   ├── Support/              # Support ticket UI
│   │   └── Visualizer/           # Algorithm visualizer UI
│   ├── context/AuthContext.jsx   # Global auth state provider
│   ├── App.jsx                   # Main app with routing
│   └── main.jsx                  # Entry point
│
├── public/                       # Static assets & favicon
├── index.html                    # Root HTML
├── vercel.json                   # Vercel routing config
└── vite.config.js                # Vite build config
```

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

### 4. Run locally
```bash
npm run dev
```
The app starts at `http://localhost:5173`.

---

## 🌍 Deployment (Vercel)

### Environment Variables

Add these in your [Vercel Project Settings → Environment Variables](https://vercel.com/docs/environment-variables):

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key — get it from [resend.com/api-keys](https://resend.com/api-keys) |
| `FIREBASE_SERVICE_ACCOUNT` | Full JSON content of your Firebase service account key (minified) |
| `ADMIN_SECRET` | A strong secret passphrase to protect admin API endpoints |
| `VITE_RAZORPAY_KEY_ID` | Your Razorpay **public** key (client-side) |
| `VITE_GEMINI_API_KEY` | Google Gemini API key for the AI Tutor |

### Deploy
```bash
# Vercel auto-deploys on every push to main
git push origin main
```

---

## 📧 Email System (Resend)

All transactional and broadcast emails are powered by **Resend API** — replacing the previous SMTP setup.

| Trigger | Recipient | Email Content |
|---|---|---|
| User signs up | User | Welcome email with account details & trial info |
| User signs up | Admin | New registration notification |
| User upgrades to Premium | User | Payment confirmation with receipt ID & benefits |
| User upgrades to Premium | Admin | New upgrade notification |
| Admin broadcast | All / Premium / Free users | Custom announcement (Update / Promotion / Alert) |

### ⚠️ Resend Domain Requirement
On Resend's free plan, you can **only send to your own email** without a verified domain.  
To broadcast to all users:
1. Add your domain at [resend.com/domains](https://resend.com/domains)
2. Complete DNS verification (~5 minutes)
3. Update `FROM_ADDRESS` in `api/send-bulk-emails.js` to `noreply@yourdomain.com`
4. Redeploy — broadcasting works instantly

> **Tip:** Use the **🧪 Test Send** button in the Admin Dashboard to preview emails to your own inbox without domain verification.

---

## 🎛️ Admin Dashboard

Access at `/admin` after logging in with the admin key.

| Tab | Features |
|---|---|
| 📊 **Overview** | Total users, premium count, revenue, trial expirations, system health |
| 👥 **User Management** | Full user list with premium/free status, manual free upgrade action |
| 🎫 **Support Tickets** | View & resolve all user-submitted support tickets |
| ✉️ **Broadcast Emails** | Compose and send to All / Premium / Free users via Resend with type selector, preview mode, quick templates, and delivery results |
| 🧠 **Intellectual AI** | Admin AI assistant for drafting emails and analyzing stats |

---

## 🔒 Security Highlights

- **No secrets in source code** — All API keys use Vercel environment variables
- **`service-account.json` is gitignored** — Firebase private credentials never reach GitHub
- **Admin endpoints protected** — All `/api/admin-*` routes require `ADMIN_SECRET` key validation
- **Sandboxed code execution** — User code runs in isolated Wandbox containers
- **Firestore Security Rules** — User documents are read/write only by their authenticated owner
- **Razorpay** — Only the public `KEY_ID` is used client-side; no secret key in frontend code

---

## 📊 Firebase Free Tier Capacity

| Limit | Value | Supported Scale |
|---|---|---|
| Firestore Storage | 1 GB | ~2,000,000 user profiles |
| Daily Writes | 20,000/day | 20,000 signups/day |
| Daily Reads | 50,000/day | 50,000 logins/day |
| Firebase Auth | Unlimited | No account limit |

---

## 🎓 DSA Curriculum — 35 Verified Modules

All 35 modules have been validated with working YouTube embeds (June 2026):

> Arrays · Strings · Searching · Linked Lists · Stacks & Queues · Hash Tables · Heaps · Matrices · Trees & BST · Tree Traversal · AVL Trees · Tries · Graphs · Dynamic Programming · Greedy · Recursion & Backtracking · Bit Manipulation · Divide & Conquer · Disjoint Set (Union-Find) · Segment Tree · Fenwick Tree · Dijkstra · Bellman-Ford · Floyd-Warshall · Kruskal MST · Prim MST · LRU Cache · Bitwise Trie · Big-O · Asymptotic Notation · OOP Basics · Recursion Intro · Language Syntax · Control Structures · Functions

---

## 📄 License

This project is private and proprietary. All rights reserved © 2026 dsaflow.app.

---

<div align="center">

Built with ❤️ by **V S S S Manikanta** &nbsp;|&nbsp; [Live App](https://dsa-learning-hub-delta.vercel.app) &nbsp;|&nbsp; Support: dsaflow@outlook.com

</div>

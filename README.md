<div align="center">

<img src="public/favicon.svg" alt="dsaflow.app logo" width="100" height="100" />

# dsaflow.app (SaaS Platform)

### 🚀 Premium FAANG Placement Prep & 3D DSA Visualizer EdTech SaaS

[![SaaS Pricing](https://img.shields.io/badge/Monetization-Premium_₹99_Lifetime-00e676?style=for-the-badge&logoColor=white)](https://dsaflow.app)
[![Live Demo](https://img.shields.io/badge/🌐_Live_SaaS-dsaflow.app-7c4dff?style=for-the-badge&logoColor=white)](https://dsaflow.app)
[![Capcapacitor Android](https://img.shields.io/badge/Mobile-Android_App_Ready-00e5ff?style=for-the-badge&logo=android&logoColor=white)](https://capacitorjs.com)

*dsaflow.app is a high-converting, fully responsive EdTech SaaS platform engineered for FAANG interview preparation. It features a stunning 3D Stack & Heap Pointer Visualizer, VS Code-powered Monaco coding arena, Google Gemini AI-tutor integration, placement assessment quizzes, milestone tracker, and daily coding challenges.*

</div>

---

## 💼 Business & Monetization Model

`dsaflow.app` operates on a highly profitable **Product-Led Growth (PLG)** model designed to capture and convert EdTech traffic:

*   **24-Hour Free Trial:** Secure email-based registration allows prospective students/professionals to explore the entire curriculum, IDE, and visualizers for 24 hours.
*   **One-Click Premium Upgrade:** A seamless, localized paywall powered by **Razorpay** prompts users to unlock lifetime access for **₹99**.
*   **Automatic Email Onboarding:** Integrated transactional emails via the **Resend API** deliver instant payment receipts, welcome materials, and admin broadcasts to keep user retention high.
*   **Mobile App Expansion (Capacitor):** Packaged with Capacitor to deploy directly as a native Android App, opening up mobile app store monetization.

---

## 🛠️ High-Margin Serverless Architecture

The platform's technology stack is designed to keep operational costs close to **$0 at scale**, maximizing the profit margins of each premium conversion:

*   **Zero-Maintenance Frontend:** Hosted on **Vercel** with full CDN acceleration.
*   **Serverless APIs:** Backend functions run in response to demand on Vercel Serverless (Node.js), eliminating the cost of idle servers.
*   **Scalable Database:** **Firebase Firestore** handles real-time user progress, support tickets, and milestone data with high free-tier limits.
*   **AI Tutoring on Demand:** Connects directly with the **Google Gemini API** for on-demand code optimization feedback.
*   **API Sandbox Compile:** Integrates with sandboxed compilation endpoints (Wandbox API) for multi-language runtimes (C++, Java, JS, Python, Go) without running resource-heavy compilers on local infrastructure.

---

## 🌟 SaaS Product Features

| Feature Module | Business Value |
|---|---|
| 🧠 **3D Heap & Stack Visualizer** | Interactive visual debugger mapping code execution in 3D Stack/Heap spaces. High retention hook. |
| 💻 **Monaco Coding Arena** | Embedded VS Code environment with active code compiler and support for 5+ programming languages. |
| 🤖 **AI DSA Coach (Gemini)** | Inline chat assistant to explain complex recursion, optimize time/space complexity, or debug errors. |
| 🗺️ **Premium A-Z Roadmap** | Curated list of 450+ high-frequency interview questions across 35 organized modules. |
| 📅 **Daily Problems (POTD)** | Daily coding challenges with streak tracking to encourage continuous user engagement. |
| 🌓 **Adaptive Theming** | Fully custom Light & Dark modes to maximize accessibility and user experience. |
| 📊 **Admin CRM Dashboard** | Built-in controls for user CRUD, handling support tickets, and sending automated announcements. |

---

## 📁 Technical Project Structure

```
dsaflow.app/
├── api/                          # Serverless Endpoint APIs (AI Tutor, Code Compile, Transactional Email)
├── modules/                      # SaaS Module Logic
│   ├── auth/                     # Firebase User Authentication & Trial management
│   ├── learning/                 # High-frequency A-Z DSA curriculum content database
│   ├── payment/                  # Razorpay merchant gateway integration
│   ├── visualizers/              # Interactive 3D Stack & Heap pointer engine
│   ├── arena/                    # Monaco Editor configuration
│   └── ide/                      # Compiler runner
├── src/                          # React 19 Frontend Web App
│   ├── components/               # UI components (Admin portal, AI tutor sidebar, IDE, Quiz card)
│   ├── context/                  # Global state management (user sessions, settings)
│   └── index.css                 # Theme tokens (Light/Dark), Glassmorphic styling rules
```

---

## 🚀 Deployment & Developer Setup

### Configuration
1. **Database Setup:** Initialize a Firebase project and add your web credentials to `modules/auth/auth.js`.
2. **Environment Keys:** Set up the following environment variables in Vercel/local hosting:
   * `RESEND_API_KEY`: API Key for onboarding/broadcast emails.
   * `FIREBASE_SERVICE_ACCOUNT`: Service account key credentials for administrative Firestore CRUD access.
   * `VITE_RAZORPAY_KEY_ID`: Your merchant API credentials.
   * `VITE_GEMINI_API_KEY`: Google Gemini Key for the tutoring panel.
   * `ADMIN_SECRET`: Safe passphrase protecting admin analytics endpoints.

### Run Local Development
```bash
npm install
npm run dev
```

---

## 🔒 Enterprise & Data Security
*   **Firestore Rules:** Strict database-level rules verify token authorization, ensuring users can only read/write their own progress records.
*   **Compiler Sandboxing:** User code compilation takes place entirely within sandboxed compilation servers, protecting client servers from malicious scripts.
*   **Encrypted Secrets:** All key integrations (Resend, Gemini, Razorpay, Firebase Admin) are kept strictly server-side.

---

## 📄 License & Intellectual Property

This software, database, and design assets are private, proprietary, and commercial property. All rights reserved © 2026 dsaflow.app.

<div align="center">

Built with ❤️ by **V S S S Manikanta** &nbsp;|&nbsp; [Live SaaS](https://dsaflow.app) &nbsp;|&nbsp; Support: dsaflow@outlook.com

</div>

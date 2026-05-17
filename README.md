# CGOS — Civic Operating System

CGOS is a high-performance, production-grade civic governance platform designed to bridge the gap between citizens and government officials. It provides a transparent, AI-powered interface for handling civic priorities, budget tracking, and real-time negotiations.

## 🚀 Key Features

- **Automated Demand Intake**: Citizens submit proposals which are automatically classified, scored, and routed by the CGOS AI Engine.
- **Snap & Send Evidence**: Vision AI analyzes photo evidence of civic issues (road damage, leaks, etc.) and generates structured reports for official review.
- **Budget Matching Engine**: Real-time cross-referencing of citizen demands against fiscal year allocations to determine feasibility.
- **Transactional Ledger**: A secure, transparent record of all civic negotiations and project updates stored on Firestore.
- **Integrity Scoring**: Projects and demands are ranked using a multi-factor AI scoring algorithm (Urgency + Impact + Population + Cost Efficiency).

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Backend Hub**: Express.js (Node.js) custom server
- **Database**: Firebase Firestore (Enterprise Edition)
- **Authentication**: Firebase Auth (Google OAuth)
- **AI Engine**: Google Gemini 1.5 Pro (via @google/genai)
- **Automation**: n8n-compatible Webhook Architecture
- **Infrastructure**: Dockerized Deployment

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / yarn
- Firebase Project
- Gemini API Key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your keys:
   ```bash
   GEMINI_API_KEY=your_key_here
   ```

### Running Locally

To start the full-stack development environment (Backend + Frontend Vite Middleware):

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🐳 Docker Deployment

The system is ready for containerized deployment.

```bash
docker-compose up -d
```

## 🔐 Security

All write operations are protected by **Hardened Firestore Security Rules**. Access is strictly tiered:
- **Citizens**: Create demands, vote, participate in discussions.
- **Admins/Officials**: Update project status, manage fiscal allocations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

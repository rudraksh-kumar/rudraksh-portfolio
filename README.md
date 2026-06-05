# Rudraksh Kumar - Personal Portfolio & AI Career Copilot

An interactive, responsive personal portfolio website featuring a dark-mode glassmorphic bento-grid layout, custom projects showcase, secure contact channels, and a retrieval-augmented generation (RAG) powered AI chatbot acting as a digital representation of Rudraksh.

## 🔗 Live Deployments
- **Frontend URL (Vercel):** [https://rudraksh-portfolio-one.vercel.app](https://rudraksh-portfolio-one.vercel.app)
- **Backend URL (Render):** [https://rudraksh-portfolio-c3vg.onrender.com](https://rudraksh-portfolio-c3vg.onrender.com)
- **GitHub Repository:** [https://github.com/rudraksh-kumar/rudraksh-portfolio](https://github.com/rudraksh-kumar/rudraksh-portfolio)

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, CORS |
| **Database & Cache** | In-Memory Local JS Caching (dictionary-based prompt matching) |
| **AI Integration** | Google Generative AI SDK (`gemini-3.1-flash-lite`) |
| **Email API** | Web3Forms HTTPS API |

---

## 📐 Architecture Alignment

The application employs a decoupled client-server architecture designed to optimize loading times, decouple secure business secrets, and ensure scalability:

```
┌─────────────────────────────────┐                 ┌──────────────────────────────┐
│        Vercel Client            │                 │        Render Server         │
│  (Static React Frontend on CDN) │                 │      (Node/Express API)      │
└────────────────┬────────────────┘                 └──────────────┬───────────────┘
                 │                                                 │
                 │ 1. POST /api/chat (prompt)                      │
                 ├────────────────────────────────────────────────>│
                 │                                                 │ 2. Read Local RAG Context
                 │                                                 │    (portfolio-data.json)
                 │                                                 │
                 │                                                 │ 3. Query Gemini LLM
                 │                                                 │    with Context Guardrails
                 │                                                 │
                 │ 4. HTTP JSON Response (reply)                   │
                 │<────────────────────────────────────────────────┤
                 │                                                 │
                 │ 5. POST /submit (Contact)                       │
                 ├─────────────────────────────────────────┐       │
                 │ (Direct HTTPS Web3Forms bypasses Render)│       │
                 ▼                                         ▼       ▼
        ┌─────────────────────────────────────────────────────────────┐
        │                        External APIs                        │
        │             (Web3Forms / Google AI Studio)                  │
        └─────────────────────────────────────────────────────────────┘
```

1. **Client-Side SPA (Vercel):** The UI compiles to static HTML, CSS, and JS assets distributed globally across Vercel’s Content Delivery Network (CDN) for sub-second page rendering.
2. **Compute Service (Render):** An Express server handles sensitive operations (such as processing chat requests using private Gemini API keys).
3. **Direct Contact Submission:** To prevent serverless timeouts and bypass server port blocks, contact form data is sent directly from the client's browser to the Web3Forms API.

---

## 🧠 AI Copilot & RAG System Design

The AI chatbot acts as a digital representative of Rudraksh, using **Retrieval-Augmented Generation (RAG)**:
- **Data Injection:** The Express server loads [portfolio-data.json](file:///d:/rudraksh-portfolio/server/portfolio-data.json) on boot, storing the structural portfolio context (projects, education, skills, and background) in memory.
- **Context Guardrails:** Inbound user prompts are paired with the stringified portfolio dataset and structured system instructions before being dispatched to the model.
- **Model Selection:** Uses `gemini-3.1-flash-lite` to ensure low-latency (sub-second) response delivery and robust reasoning.
- **Prompt Protection:** The system prompt contains rules to prevent prompt injections, prevent hallucinations (never inventing internships or scores not present in the JSON), and keep answers concise (20-80 words).
- **Latency Optimization:** An in-memory cache normalization dictionary handles exact query matching on the server, serving repeated questions instantly without utilizing API tokens.

---

## 🚀 Setup & Installation (Runnable Local Setup)

Follow these steps to run the frontend and backend servers concurrently on your machine.

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/rudraksh-kumar/rudraksh-portfolio.git
cd rudraksh-portfolio
```

### 2. Configure Environment Variables
Create a `.env` file in the `server/` directory:
```bash
touch server/.env
```
Add the following keys to `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
EMAIL_USER=your_gmail_address_here
EMAIL_PASS=your_gmail_app_password_here
WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
```

### 3. Install Dependencies
Install packages for both root (Vite frontend) and server (Express backend):
```bash
npm install
cd server && npm install
cd ..
```

### 4. Run Locally
Start both the React development server and the Express backend server concurrently:
```bash
npm run dev:all
```
- The frontend will launch at: [http://localhost:5173](http://localhost:5173)
- The backend will listen at: [http://localhost:5000](http://localhost:5000)

---

## ⚠️ Challenges & Resolutions

### Challenge 1: Gemini Free Tier API Rate Limits
- *Problem:* Using `gemini-2.5-flash` hit a hard daily quota block of 20 requests per day quickly.
- *Resolution:* Switched the model to `gemini-3.1-flash-lite`, which increases daily limits to **1,500 requests per day** and reduces latency to under 1.2 seconds. Additionally, implemented an in-memory server cache to return repeated questions instantly.

### Challenge 2: Outbound SMTP Block on Render Free Tier
- *Problem:* Render blocks outgoing traffic on traditional email ports (25, 465, 587) on the free tier to prevent spam, causing Nodemailer connections to time out.
- *Resolution:* Migrated the email submission channel to the HTTP-based Web3Forms API. The frontend posts submissions directly to Web3Forms over port 443 (HTTPS), which bypasses all outbound server port blocks.

---

## 🔮 Future Plans
1. **Persistent History:** Implement user session cookies or SQLite databases to store chat threads across page reloads.
2. **Native Speech Processing:** Use browser Web Speech APIs to perform real-time speech-to-text processing for hands-free chatbot prompts.
3. **Automated CI/CD Tests:** Build GitHub Actions pipelines to run code style checks (`eslint`) and bundle validation automatically on every commit.

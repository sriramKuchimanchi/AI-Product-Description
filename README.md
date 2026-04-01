# Product Copy AI

An AI-powered product description generator built with React, TypeScript, Express, and Groq. Describe any product, pick a tone, and get three SEO-optimised description variants with titles, meta tags, and keywords — instantly.

---

## Features

- **3 Variants per generation** — get three unique descriptions in one click and pick your favourite
- **SEO built in** — every result includes an SEO title (under 60 chars), meta description (under 160 chars), and 5 targeted keywords
- **Platform Formatter** — reformat any description for Amazon, Shopify, or Etsy with the correct structure for each
- **Competitive Analysis** — enter two products and get an AI breakdown of strengths, weaknesses, and which copy would convert better
- **Industry Templates** — pre-filled examples across Fashion, Tech, Food, Fitness, Beauty, Home, Pets, and Stationery
- **Generation History** — all results saved locally, expandable, and re-openable in the app
- **Export** — download any variant as a `.txt` file with all SEO fields included

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v3 |
| Routing | React Router v6 |
| Backend | Node.js, Express, TypeScript |
| AI Model | Groq API — `llama-3.1-8b-instant` |
| Storage | Browser localStorage |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm (comes with Node)
- A free Groq API key (see below)

---

### 1. Get a Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account — no credit card required
3. Navigate to **API Keys** in the left sidebar
4. Click **Create API Key**, give it a name, and click Create
5. Copy the key — it is only shown once

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/ai-product-generator.git
cd ai-product-generator
```

---

### 3. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
GROQ_API_KEY=your_api_key_here
PORT=3000
```

> **Never commit your `.env` file.** It is already excluded by `.gitignore`.

---

### 4. Set Up the Frontend

```bash
cd ../frontend
npm install
```

---

### 5. Run the Project

You need two terminals running simultaneously.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Expected output: `Server running on http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Expected output: `VITE ready on http://localhost:5173`

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
ai-product-generator/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── InputPanel.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PlatformFormatter.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── ResultsPanel.tsx
│   │   │   └── VariantCard.tsx
│   │   ├── pages/
│   │   │   ├── AppPage.tsx
│   │   │   ├── ComparePage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   └── TemplatesPage.tsx
│   │   ├── types/index.ts
│   │   ├── utils/storage.ts
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
└── backend/
    ├── server/
    │   ├── routes/
    │   │   ├── generate.ts
    │   │   ├── format.ts
    │   │   └── analyze.ts
    │   └── types/index.ts
    ├── index.ts
    ├── .env
    └── package.json
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with features, how it works, and CTAs |
| `/app` | Main generation tool — input panel + results panel |
| `/templates` | Industry templates that auto-fill the app form |
| `/history` | All past generations with expand, copy, and export |
| `/compare` | Competitive analysis between two products |

---

## Backend API

All endpoints accept and return JSON.

### `POST /api/generate`

Generates 1 or 3 product description variants.

**Request:**
```json
{
  "productName": "string",
  "productDetails": "string",
  "tone": "professional | casual | luxury | playful | minimalist",
  "keywords": "string (optional)",
  "variants": true
}
```

**Response:**
```json
{
  "variants": [
    {
      "description": "string",
      "seoTitle": "string",
      "metaDescription": "string",
      "suggestedKeywords": ["string"]
    }
  ]
}
```

---

### `POST /api/format`

Reformats a description for a specific e-commerce platform.

**Request:**
```json
{
  "productName": "string",
  "description": "string",
  "platform": "Amazon | Shopify | Etsy"
}
```

**Response:**
```json
{
  "formatted": "string"
}
```

---

### `POST /api/analyze`

Runs competitive copy analysis between two products.

**Request:**
```json
{
  "productAName": "string",
  "productADescription": "string",
  "productBName": "string",
  "productBDescription": "string"
}
```

**Response:**
```json
{
  "productAStrengths": ["string"],
  "productAWeaknesses": ["string"],
  "productBStrengths": ["string"],
  "productBWeaknesses": ["string"],
  "winner": "A | B",
  "winnerReason": "string",
  "actionableTip": "string"
}
```

---

## Troubleshooting

**`Invalid API key` error**
- Make sure `.env` is inside the `backend` folder, not the project root
- The key should start with `gsk_` and have no extra spaces or quotes
- Restart the backend after editing `.env`

**`Cannot find native binding` on Windows ARM64**

Tailwind v4 uses native binaries that may be blocked by institutional security policies. Downgrade to v3:

```bash
cd frontend
npm uninstall tailwindcss @tailwindcss/vite
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Then replace the contents of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Frontend shows a network error**
- Confirm the backend is running on port 3000 before generating
- Open browser DevTools → Network tab to see the actual API response

**History is empty after refresh**
- History is stored in browser `localStorage` — clearing browser data or using incognito mode resets it

---

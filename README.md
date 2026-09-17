# Portfolio Backend

Express API for [Emanuel Vicente](https://www.emanuelvicente.com.ar)’s personal portfolio.

Serves profile data for the website and powers the AI assistant with Gemini, using PostgreSQL (Prisma) as the source of truth.

> **Note:** The assistant runs on Google Gemini’s free tier. Responses may be incorrect, incomplete, rate-limited, or temporarily unavailable depending on free-plan quotas.

For the full project overview (frontend + backend), see the root [`README.md`](../README.md).

## Stack

- Node.js + Express
- TypeScript
- Prisma + PostgreSQL
- Google Gemini (`@google/genai`)

## Getting started

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma generate
npx tsx src/scripts/seed.ts
npm run dev
```

API default URL: [http://localhost:3001](http://localhost:3001).

## Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `PROFILE_ID` | Profile id used by the API |
| `FRONTEND_URL` | Allowed CORS origins (comma-separated) |
| `GEMINI_API_KEY` | Google Gemini API key |
| `PORT` | Optional port (default `3001`) |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npx prisma migrate dev` | Create/apply migrations (local) |
| `npx prisma migrate deploy` | Apply migrations (production) |
| `npx tsx src/scripts/seed.ts` | Seed / replace portfolio content |

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `GET` | `/profile` | Full profile payload |
| `POST` | `/assistant` | Ask the portfolio AI |

### Assistant request body

```json
{
  "question": "Tell me about Emanuel's experience",
  "history": [
    { "role": "assistant", "content": "Hi! Ask me about Emanuel's work." }
  ]
}
```

## Project layout

```text
prisma/              # Schema and migrations
src/
  app.ts             # Express app
  server.ts          # Entry point
  config/            # Env + Prisma
  middleware/        # CORS helpers, validation, rate limit
  modules/
    profile/         # Profile API + knowledge text
    assistant/       # Assistant API + Gemini + Q&A storage
  scripts/seed.ts    # Seed data
```

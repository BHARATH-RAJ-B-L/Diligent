# Diligent E-commerce Monorepo

A small full-stack e-commerce app.

## Structure

- `backend/` - Express API with MongoDB
- `frontend/` - React (Vite) SPA

## Quickstart

1. Backend
   ```bash
   cd backend
   npm install
   cp .env.example .env   # set values
   npm run dev
   # Seed products
   curl -X POST http://localhost:5000/api/seed/products
   ```
2. Frontend
   ```bash
   cd frontend
   npm install
   echo "VITE_API_BASE_URL=http://localhost:5000" > .env
   npm run dev
   ```

## Documentation

- Technical architecture: `TECHNICAL_ARCHITECTURE.md`
- API examples: `api-curl-examples.md` and `postman_collection.json`

## Deployment

- Backend: Render/Heroku/Railway (set env vars from `.env.example`)
- Frontend: Vercel/Netlify (`VITE_API_BASE_URL` set to backend URL)



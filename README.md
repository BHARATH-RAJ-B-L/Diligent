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
   # Seed products (choose one)
   # a) Script (recommended)
   npm run seed
   # b) HTTP route
   curl -X POST http://localhost:5000/api/seed/products
   ```
2. Frontend
   ```bash
   cd frontend
   npm install
   echo "VITE_API_BASE_URL=http://localhost:5000" > .env
   npm run dev
   ```

## Screenshots

Below are example UI states you should see once seeded and running:

- Register: name/email/password form.
<img width="1483" height="361" alt="Screenshot 2025-11-10 190249" src="https://github.com/user-attachments/assets/5614e932-51ca-4f8d-886f-cdf1f65eedbb" />

- Login: email/password form.
<img width="1529" height="336" alt="Screenshot 2025-11-10 190235" src="https://github.com/user-attachments/assets/d4a389e7-3a95-4393-b033-fbba45a2ce13" />

- Home: product grid with search, category filter, and Add to cart.
<img width="1448" height="802" alt="Screenshot 2025-11-10 190129" src="https://github.com/user-attachments/assets/e173da9d-f62f-4845-a6e6-561fd2a6bb85" />

- Cart: list of items with quantity selector and subtotal.
<img width="1427" height="460" alt="Screenshot 2025-11-10 190145" src="https://github.com/user-attachments/assets/6a90c040-e3fe-448b-8fea-42a7f35b48d6" />

- Checkout: form with address fields and summary (items, shipping, tax, total).
<img width="1463" height="554" alt="Screenshot 2025-11-10 190224" src="https://github.com/user-attachments/assets/21f1e4ae-1718-4a04-a555-ba3e0f984440" />

## Documentation

- Technical architecture: `TECHNICAL_ARCHITECTURE.md`
- API examples: `api-curl-examples.md` and `postman_collection.json`

## Deployment

- Backend: Render/Heroku/Railway (set env vars from `.env.example`)
- Frontend: Vercel/Netlify (`VITE_API_BASE_URL` set to backend URL)



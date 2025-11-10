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

- Checkout: form with address fields and summary (items, shipping, tax, total).
- Login: email/password form.
- Register: name/email/password form.
- Cart: list of items with quantity selector and subtotal.
- Home: product grid with search, category filter, and Add to cart.

If you'd like to embed screenshots, place images under `docs/screenshots/` and reference them here, for example:

```md
![Home](docs/screenshots/home.png)
![Cart](docs/screenshots/cart.png)
![Checkout](docs/screenshots/checkout.png)
```

## Documentation

- Technical architecture: `TECHNICAL_ARCHITECTURE.md`
- API examples: `api-curl-examples.md` and `postman_collection.json`

## Deployment

- Backend: Render/Heroku/Railway (set env vars from `.env.example`)
- Frontend: Vercel/Netlify (`VITE_API_BASE_URL` set to backend URL)



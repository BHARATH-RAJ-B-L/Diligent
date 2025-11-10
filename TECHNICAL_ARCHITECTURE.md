## Technical Architecture - Diligent E-commerce

### Overview and Goals
- Build a small, production-ready e-commerce app with a modern SPA frontend and a lightweight REST API backend.
- Goals:
  - Product discovery: list, search, filter by category, pagination.
  - Product detail and add-to-cart.
  - Client-side cart with quantity updates and checkout flow (no payment).
  - Optional user authentication (JWT).
  - Admin seed to populate products.
  - Clean deployment to common PaaS targets and static hosting.

### Component Diagram (Conceptual)
- Frontend (React + Vite)
  - Routes: Home, Product Detail, Cart, Checkout, Login, Register.
  - State: `CartContext` (localStorage persistence).
  - API client: Axios → calls Backend.
- Backend (Node.js + Express)
  - Routes: `/api/products`, `/api/auth`, `/api/orders`, `/api/health`, `/api/seed`.
  - Controllers and middleware (auth, validation, error handler).
  - Uses Mongoose to interact with MongoDB.
- Database (MongoDB Atlas)
  - Collections: `products`, `users`, `orders`.

Data flow: Browser (SPA) → REST API (Express) → MongoDB (Mongoose). JWT in `Authorization: Bearer <token>` for protected routes.

### Data Models
- Product
  - name: string (required)
  - description: string (required)
  - price: number (required, >= 0)
  - category: string (required, indexed)
  - images: string[] (optional)
  - imageUrl: string (derived/primary image convenience)
  - countInStock: number (>= 0)
  - stock: number (>= 0, kept in sync with `countInStock`)
  - brand: string (optional)
  - rating: number (0..5)
  - numReviews: number
  - isActive: boolean
  - timestamps: createdAt, updatedAt
- User
  - name: string (required)
  - email: string (required, unique, lowercase)
  - passwordHash: string (bcrypt)
  - isAdmin: boolean
  - timestamps
- Order
  - user: ObjectId → User
  - items: [{ product, name, imageUrl, price, qty }]
  - shippingAddress: { fullName, addressLine1, addressLine2, city, state, postalCode, country }
  - itemsTotal, shippingFee, tax, grandTotal
  - status: created | paid | shipped | delivered | cancelled
  - timestamps

### API Endpoints (with examples)
Base URL: http://localhost:5000

- Health
  - GET `/api/health`
  - 200: `{ "status": "ok", "env": "development" }`

- Products
  - GET `/api/products?q=&category=&minPrice=&maxPrice=&page=&limit=`
    - 200:
      ```json
      {
        "items": [{ "_id": "…", "name": "Classic Tee", "price": 19.99, "category": "Apparel", "imageUrl": "…" }],
        "pagination": { "total": 20, "page": 1, "pages": 2 }
      }
      ```
  - GET `/api/products/:id`
    - 200: `Product`
    - 400: `{ "message": "Invalid product id" }`
    - 404: `{ "message": "Product not found" }`
  - POST `/api/products` (admin only) — create one OR seed multiple (array)
    - Request (array seed):
      ```json
      [{
        "name": "New",
        "description": "desc",
        "price": 9.99,
        "category": "Misc",
        "stock": 5,
        "images": ["https://..."]
      }]
      ```
    - 201: `{ "message": "Seeded products", "count": 1 }` or created `Product`
    - 401/403 on missing/invalid auth
  - PUT `/api/products/:id` (admin only)
    - Request:
      ```json
      { "price": 12.99, "stock": 8 }
      ```
    - 200: updated `Product`
    - 400/404 for invalid/not found
  - DELETE `/api/products/:id` (admin only)
    - 200: `{ "message": "Deleted" }`
    - 400/404 for invalid/not found

- Auth
  - POST `/api/auth/register`
    - Request:
      ```json
      { "name": "John", "email": "john@example.com", "password": "secret123" }
      ```
    - 201:
      ```json
      {
        "user": { "id": "…", "name": "John", "email": "john@example.com", "isAdmin": false },
        "token": "JWT…"
      }
      ```
    - 400 if validation fails or email in use
  - POST `/api/auth/login`
    - Request:
      ```json
      { "email": "john@example.com", "password": "secret123" }
      ```
    - 200: same response shape as register
    - 401 on invalid credentials

- Orders
  - POST `/api/orders` (Bearer token required)
    - Request:
      ```json
      {
        "items": [{ "productId": "…", "qty": 2 }],
        "shippingAddress": {
          "fullName": "John Doe",
          "addressLine1": "123 Main St",
          "city": "NYC",
          "state": "NY",
          "postalCode": "10001",
          "country": "USA"
        }
      }
      ```
    - 201: `Order`
    - 400 on invalid items or insufficient stock, 401 on auth failure

- Seed
  - POST `/api/seed/products`
    - 201: `{ "message": "Seeded products", "count": 3 }` or existing message

Status codes used: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.

### Authentication Flow (JWT)
1. User registers or logs in to receive a JWT signed with `JWT_SECRET`.
2. Client stores the token (localStorage) and sets `Authorization: Bearer <token>` on protected calls.
3. Backend verifies the token, loads the user, and authorizes access (adminGuard for admin routes).

### Error Handling Approach
- Input validation via `express-validator` for key endpoints.
- Central error middleware returns `{ "message": "…" }` and appropriate status.
- Consistent 400/401/403/404 distinctions for client errors; 500 for unexpected server errors.

### Deployment Plan
- Backend (Render/Heroku/Railway)
  - Set env vars (Render: Dashboard → Environment / Heroku: Config Vars):
    - `PORT=5000`
    - `MONGODB_URI=<your_atlas_uri>`
    - `JWT_SECRET=<your_secret>`
    - `FRONTEND_ORIGIN=<your_frontend_origin>`
  - Start command: `node server.js` (or `node src/server.js` if using that path).
  - Ensure IP allowlist in MongoDB Atlas allows your PaaS egress.
- Frontend (Vercel/Netlify)
  - Set env var:
    - `VITE_API_BASE_URL=https://<your-backend-host>`
  - Build: `npm run build`; publish `dist/` (Netlify) or connect repo (Vercel).
  - Verify CORS settings on backend (`FRONTEND_ORIGIN`).

### Security Considerations
- CORS restricted to known frontend origin (`FRONTEND_ORIGIN`).
- Secrets strictly from environment variables; never committed.
- Passwords hashed with bcrypt and never stored in plain text.
- Helmet enabled for sensible HTTP headers.
- Suggested: add basic rate limiting (e.g., `express-rate-limit`) especially for `/api/auth/*` and product search.
- Validate and sanitize inputs (`express-validator` used).

### Runbook
- Run locally
  - Backend:
    - `cd backend && npm install`
    - Create `.env` with `MONGODB_URI`, `PORT=5000`, `JWT_SECRET`, `FRONTEND_ORIGIN`
    - `npm run dev`
  - Frontend:
    - `cd frontend && npm install`
    - Create `.env` with `VITE_API_BASE_URL=http://localhost:5000`
    - `npm run dev`
- Seed database
  - Script: `node backend/scripts/seed.js`
  - Route (alt): `POST /api/seed/products`
- Tests
  - Backend API tests (Jest + Supertest): `cd backend && npm test`

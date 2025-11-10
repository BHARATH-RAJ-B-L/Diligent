# Diligent E-commerce Backend

Lightweight RESTful API built with Node.js, Express, and MongoDB (Mongoose).

## Scripts

- `npm run dev` - start development server with hot reload
- `npm run start` - start production server
- `npm run test` - run Jest tests

## Environment Variables

Copy `.env.example` to `.env` and set values:

```
PORT=5000
MONGODB_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_jwt_secret>
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=Admin@123
FRONTEND_ORIGIN=http://localhost:5173
```

Minimal required:

- `MONGODB_URI="your_mongodb_connection_string_here"`
- `PORT=5000`
- `JWT_SECRET="your_jwt_secret_here"` (for auth)

## Endpoints (Summary)

- `GET /api/health`
- `GET /api/products` (search, category, price range)
- `GET /api/products/:id`
- `POST /api/products` (admin only; seed/create)
- `PUT /api/products/:id` (admin only)
- `DELETE /api/products/:id` (admin only)
- `POST /api/orders` (protected)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me` (protected, legacy in src)
- `POST /api/seed/products` (admin-only)

See full details in `../TECHNICAL_ARCHITECTURE.md`.

## Development

1. Install dependencies
   ```
   npm install
   ```
2. Run dev server
   ```
   npm run dev
   ```
3. Seed products (requires admin user creation on first call)
   ```
   node scripts/seed.js
   ```

## Deployment

Deploy to Render/Heroku/Railway. Set env vars from `.env.example`. Ensure `FRONTEND_ORIGIN` is set to your frontend domain.

## cURL Examples

- Health
  ```
  curl http://localhost:5000/api/health
  ```
- List products
  ```
  curl "http://localhost:5000/api/products?q=tee&category=Apparel&page=1&limit=12"
  ```
- Product by id
  ```
  curl http://localhost:5000/api/products/<id>
  ```
- Register
  ```
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"name":"John","email":"john@example.com","password":"secret123"}'
  ```
- Login
  ```
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"john@example.com","password":"secret123"}'
  ```
- Create/seed products (admin)
  ```
  curl -X POST http://localhost:5000/api/products \
    -H "Authorization: Bearer <admin_token>" \
    -H "Content-Type: application/json" \
    -d '[{"name":"New","description":"desc","price":9.99,"category":"Misc","stock":5}]'
  ```
- Update product (admin)
  ```
  curl -X PUT http://localhost:5000/api/products/<id> \
    -H "Authorization: Bearer <admin_token>" \
    -H "Content-Type: application/json" \
    -d '{"price": 12.99}'
  ```
- Delete product (admin)
  ```
  curl -X DELETE http://localhost:5000/api/products/<id> \
    -H "Authorization: Bearer <admin_token>"
  ```



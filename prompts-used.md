## Prompts Used

1) Project scaffolding, backend, frontend, docs, examples
- Prompt: "Build a complete small e-commerce web app with React (Vite) frontend, Node.js + Express backend, MongoDB (Mongoose), including product listing, detail, cart, checkout, search, filters, optional auth, seed endpoint. Provide technical architecture, READMEs, Postman or curl, and .env.example placeholders. Use React Router and Tailwind. Include dev and start scripts."

2) Backend core files (server, models, controllers, routes, middleware)
- Prompt: "Generate Express server with JWT auth middleware, product, user, order controllers and routes, Mongo connection util, error handler. Implement product search and filters, user login/register, order creation with totals."

3) Seed script and tests
- Prompt: "Add seed route and script to populate sample products and ensure an admin user exists. Create Jest + Supertest tests for products and users using mongodb-memory-server."

4) Frontend app with Tailwind and React Router
- Prompt: "Create Vite React app with Tailwind, pages (Home, Product, Cart, Checkout, Login, Register), Header, ProductCard, CartContext. Use Axios api client with env base URL."

5) Documentation and examples
- Prompt: "Write TECHNICAL_ARCHITECTURE.md, backend/frontend READMEs, api curl examples, and a Postman collection with placeholders."

6) Backend detailed requirements
- Prompt: "Create the backend for the e-commerce app using Node.js + Express + Mongoose. - Create package.json with scripts: \"start\", \"dev\" (nodemon). - Folder: backend/ ... routes/products.js, routes/auth.js, controllers, middleware, scripts/seed.js, sample tests, env var names MONGODB_URI, JWT_SECRET, PORT. Return all files and a README.md with curl examples."

7) Frontend detailed requirements
- Prompt: "Create the frontend (React with Vite). Structure pages (Home, ProductDetail, Cart, Checkout, Login/Register, NotFound), components (ProductCard, ProductList, Header, Footer, CartItem, Pagination, SearchBar), contexts/CartContext, services/api.js, .env.example with REACT_APP_API_URL or VITE_API_BASE_URL, responsive UI, README."

8) Technical Architecture document request
- Prompt: "Write a Technical Architecture document (MARKDOWN). It should include: Overview and goals, component diagram, data models, API endpoints with request/response examples, status codes, authentication flow (JWT), error handling, deployment plan, security considerations, runbook."

9) API contract alignment
- Prompt: "API endpoints: GET /api/products (q, category, page, limit) → { data, total, page, pages }, GET /api/products/:id → { product }, POST /api/products (protected/admin) { name, description, price, images, category, stock } → created product, PUT/DELETE /api/products/:id (protected), POST /api/auth/register/login → { token, user }, POST /api/orders (optional) → created order."

10) Add root route to server
- Prompt/code: 
  ```
  // server.js
  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const app = express();
  app.use(express.json());
  app.use(cors());
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
  app.get('/', (req, res) => { res.send('E-commerce API running...'); });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  // add this to the code
  ```

11) Provide MongoDB connection string
- Prompt: "mongodb+srv://rajbharathrajbl_db_user:tM5kL1jPWin6w7Bl@cluster0.wchhixx.mongodb.net/?appName=Cluster0 // add this in respected file"

12) Troubleshooting request
- Prompt: "solve the error in the terminal"

13) Run frontend
- Prompt: "run the frontend"

14) White screen report
- Prompt: "i can only see white screen"

15) Console error report
- Prompt: "Uncaught ReferenceError: React is not defined ... at CartProvider ... at ErrorBoundary.render ..."

17) Add products request
- Prompt: "add general items and a few products in the project"



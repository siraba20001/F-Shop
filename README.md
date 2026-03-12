# F-SHOP (Next.js + Express + MongoDB)

Modern teen-focused streetwear e-commerce platform for Mali.

## Stack
- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Auth: JWT admin authentication

## Features
### Public
- Home hero + trending + new arrivals
- Product grid with search and category filters
- Product details with Add to Cart + WhatsApp order
- Cart management (add/remove/quantity)
- Checkout with Cash on delivery / Orange Money / Moov Money

### Admin
- `/admin/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/add-product`
- `/admin/orders`
- CRUD products, pricing, categories, orders listing

## Setup
```bash
npm install
npm install --prefix server
npm install --prefix client
cp server/.env.example server/.env
```

Update `server/.env`:
- `MONGO_URI`
- `JWT_SECRET`

Create admin user:
```bash
node server/src/seed/createAdmin.js admin@fshop.ml admin123
```

Run both apps:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- API: `http://localhost:5000/api`

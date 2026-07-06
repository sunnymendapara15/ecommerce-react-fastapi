# Ecommerce React + FastAPI

## Overview
This repository hosts a minimal two-page ecommerce experience. The React frontend renders a catalog and checkout form while the FastAPI backend serves product data and accepts checkout payloads.

## Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\\Scripts\\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Running Both
1. Start the backend (`uvicorn app.main:app`).
2. Start the frontend (`npm start`).
3. Visit `http://localhost:3000` to browse the catalog and check out a product.

## API Endpoints
- `GET /products` — returns the catalog of products.
- `GET /products/{id}` — returns a single product by ID.
- `POST /checkout` — accepts `{ product_id, quantity, customer_name, email, shipping_address }` and returns an order confirmation.

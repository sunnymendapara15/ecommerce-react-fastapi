from typing import List
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CheckoutPayload, CheckoutResponse, Product
from app.services import calculate_total, get_product_by_id, get_products


app = FastAPI(title="Ecommerce FastAPI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/products", response_model=List[Product])
def list_products() -> List[Product]:
    """Return the catalog of available products."""
    return get_products()


@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int) -> Product:
    """Return the product that matches the provided ID."""
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/checkout", response_model=CheckoutResponse)
def checkout(payload: CheckoutPayload) -> CheckoutResponse:
    """Process a simplified checkout request."""
    product = get_product_by_id(payload.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    total = calculate_total(product, payload.quantity)
    return CheckoutResponse(
        order_id=str(uuid4()),
        total=total,
        message=f"Order received for {payload.quantity} × {product['name']}",
    )

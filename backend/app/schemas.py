from pydantic import BaseModel, EmailStr, Field, constr


class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: str
    category: str


class CheckoutPayload(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0)
    customer_name: constr(min_length=2)
    email: EmailStr
    shipping_address: constr(min_length=5)


class CheckoutResponse(BaseModel):
    order_id: str
    total: float
    message: str

from typing import TypedDict


class ProductDict(TypedDict):
    id: int
    name: str
    description: str
    price: float
    image_url: str
    category: str

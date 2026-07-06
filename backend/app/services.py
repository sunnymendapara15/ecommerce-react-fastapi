from typing import List, Optional

from .models import ProductDict


_PRODUCTS: List[ProductDict] = [
    {
        "id": 1,
        "name": "Modern Wireless Headphones",
        "description": "Over-ear cushions, adaptive noise cancellation, and 30-hour battery for deep listening sessions.",
        "price": 119.0,
        "image_url": "https://images.unsplash.com/photo-1527252006939-0d2ca2e4bf52?auto=format&fit=crop&w=600&q=80",
        "category": "Audio",
    },
    {
        "id": 2,
        "name": "Compact Espresso Machine",
        "description": "Semi-automatic flow for cafe-quality espresso and milk frothing without occupying the entire counter.",
        "price": 259.0,
        "image_url": "https://images.unsplash.com/photo-1509420316987-d5e0b2d1b4c0?auto=format&fit=crop&w=600&q=80",
        "category": "Kitchen",
    },
    {
        "id": 3,
        "name": "Smart Fitness Tracker",
        "description": "Heart-rate, sleep, and VO2 monitoring with a 10-day battery and swim-proof construction.",
        "price": 89.5,
        "image_url": "https://images.unsplash.com/photo-1519861153798-8f81f1d0ece9?auto=format&fit=crop&w=600&q=80",
        "category": "Wearables",
    },
    {
        "id": 4,
        "name": "Minimalist Standing Desk",
        "description": "Height-adjustable desktop capable of handling multiple monitors and delivered ready to assemble.",
        "price": 349.0,
        "image_url": "https://images.unsplash.com/photo-1457771075601-729c07cf0b04?auto=format&fit=crop&w=600&q=80",
        "category": "Furniture",
    },
]


def get_products() -> List[ProductDict]:
    return list(_PRODUCTS)


def get_product_by_id(product_id: int) -> Optional[ProductDict]:
    return next((product for product in _PRODUCTS if product["id"] == product_id), None)


def calculate_total(product: ProductDict, quantity: int) -> float:
    return round(product["price"] * quantity, 2)

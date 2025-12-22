from pydantic import BaseModel, EmailStr
from typing import Optional, List  # <--- ADDED 'List' HERE
from datetime import datetime

# --- Token Schema (Response for Login) ---
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_name: str

# --- User Schemas ---
class UserBase(BaseModel):
    full_name: str
    phone_number: str
    gender: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    national_id: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str = "buyer"

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Farmer Schemas ---
class FarmerBase(BaseModel):
    full_name: str
    phone_number: str
    gender: str
    national_id: str
    location: str

class FarmerCreate(FarmerBase):
    pass 

class FarmerResponse(FarmerBase):
    id: int
    farmer_unique_id: str
    agent_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Product Schemas ---
class ProductBase(BaseModel):
    name: str
    amharic_name: Optional[str] = None
    category: str
    quantity: float
    unit: str
    quality: str
    ask_price: float
    description: str
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    farmer_unique_id: str 

class ProductResponse(ProductBase):
    id: int
    listing_price: Optional[float] = None
    status: str
    farmer_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Order Schemas (Checkout) ---
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: float

class OrderCreate(BaseModel):
    items: List[OrderItemCreate] # <--- This caused the error before
    shipping_name: str
    shipping_phone: str
    shipping_address: str
    shipping_city: str

class OrderItemResponse(BaseModel):
    product_id: int
    quantity: float
    price_at_purchase: float
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    total_price: float
    status: str
    created_at: datetime
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True
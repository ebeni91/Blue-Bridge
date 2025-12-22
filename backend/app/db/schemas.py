from pydantic import BaseModel, EmailStr
from typing import Optional
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
    email: Optional[EmailStr] = None
    national_id: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str = "buyer" # Default role is buyer

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True




# --- Farmer Schemas ---
class FarmerBase(BaseModel):
    full_name: str
    phone_number: str
    gender: str
    national_id: str
    location: str

class FarmerCreate(FarmerBase):
    pass # Agents provide all base info

class FarmerResponse(FarmerBase):
    id: int
    farmer_unique_id: str
    agent_id: int
    created_at: datetime

    class Config:
        from_attributes = True # updated for Pydantic v2 (formerly orm_mode)




# ... (Keep all previous code) ...

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
    farmer_unique_id: str # Agent enters "FRM-8392", not the database ID

class ProductResponse(ProductBase):
    id: int
    listing_price: Optional[float] = None
    status: str
    farmer_id: int
    created_at: datetime

    class Config:
        from_attributes = True
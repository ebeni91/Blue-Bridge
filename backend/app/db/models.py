from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Enum, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime  # <--- THIS IS THE MISSING IMPORT
import enum
from .database import Base

# --- Enums for Roles & Status ---
class UserRole(str, enum.Enum):
    SUPERADMIN = "superadmin"
    ADMIN = "admin"
    AGENT = "agent"
    BUYER = "buyer"

class ProductStatus(str, enum.Enum):
    PENDING = "pending"   # Waiting for Admin approval
    APPROVED = "approved" # Live on Marketplace
    REJECTED = "rejected"
    SOLD = "sold"

# --- 1. USERS TABLE ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100))
    email = Column(String(100), unique=True, index=True, nullable=True)
    phone_number = Column(String(20), unique=True, index=True)
    hashed_password = Column(String(255))
    gender = Column(String(10), nullable=True)
    national_id = Column(String(20), unique=True, nullable=True)
    location = Column(String(255), nullable=True)
    
    role = Column(String(50), default=UserRole.BUYER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    farmers_registered = relationship("Farmer", back_populates="registered_by_agent")
    orders = relationship("Order", back_populates="user")  # Changed back_populates to "user" to match Order model

# --- 2. FARMERS TABLE ---
class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    farmer_unique_id = Column(String(50), unique=True, index=True) 
    
    full_name = Column(String(100))
    gender = Column(String(10))
    phone_number = Column(String(20))
    national_id = Column(String(20), unique=True)
    location = Column(String(255))
    
    agent_id = Column(Integer, ForeignKey("users.id"))
    registered_by_agent = relationship("User", back_populates="farmers_registered")
    
    products = relationship("Product", back_populates="owner")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# --- 3. PRODUCTS TABLE ---
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    amharic_name = Column(String(255), nullable=True)
    category = Column(String(100))
    
    quantity = Column(Float)
    unit = Column(String(20))
    quality = Column(String(50))
    
    ask_price = Column(Float)
    listing_price = Column(Float)
    
    description = Column(Text)
    image_url = Column(String(500), nullable=True)
    status = Column(String(50), default=ProductStatus.PENDING)
    
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    owner = relationship("Farmer", back_populates="products")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# --- 4. ORDER MODELS ---
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # Who bought it?
    total_price = Column(Float)
    status = Column(String(50), default="pending") # pending, shipped, delivered
    
    # Shipping Info
    shipping_name = Column(String(100))
    shipping_phone = Column(String(20))
    shipping_address = Column(String(255))
    shipping_city = Column(String(100))
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    farmer_id = Column(Integer, ForeignKey("farmers.id")) # To track who sold it
    
    quantity = Column(Float)
    price_at_purchase = Column(Float) 

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
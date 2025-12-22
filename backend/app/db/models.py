from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Enum, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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

# --- 1. USERS TABLE (Logins for Admins, Agents, Buyers) ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=True) # Agents might not have email, using phone?
    hashed_password = Column(String(255))
    
    # Common fields
    full_name = Column(String(100))
    phone_number = Column(String(20), unique=True, index=True)
    gender = Column(String(10))
    national_id = Column(String(20), unique=True) # "Fayda" ID
    location = Column(String(255))
    
    role = Column(String(50), default=UserRole.BUYER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    farmers_registered = relationship("Farmer", back_populates="registered_by_agent")
    orders = relationship("Order", back_populates="buyer")

# --- 2. FARMERS TABLE (Offline Entities) ---
class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    # The Unique ID (e.g., "FRM-2024-001") can be generated in logic, or we use this DB ID
    farmer_unique_id = Column(String(50), unique=True, index=True) 
    
    full_name = Column(String(100))
    gender = Column(String(10))
    phone_number = Column(String(20))
    national_id = Column(String(20), unique=True) # 12 digit Fayda
    location = Column(String(255))
    
    # Link to the Agent who manages them
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
    unit = Column(String(20)) # kg, quintal, pieces
    quality = Column(String(50)) # Grade A, B
    
    ask_price = Column(Float) # The price farmer wants
    listing_price = Column(Float) # Final price (if adjusted by admin)
    
    description = Column(Text)
    image_url = Column(String(500), nullable=True)
    
    # Approval Workflow
    status = Column(String(50), default=ProductStatus.PENDING)
    
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    owner = relationship("Farmer", back_populates="products")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# --- 4. ORDERS TABLE ---
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String(50), default="pending") # pending, paid, shipped
    
    buyer = relationship("User", back_populates="orders")
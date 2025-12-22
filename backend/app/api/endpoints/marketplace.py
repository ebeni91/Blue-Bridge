from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

# 1. Public: Get Approved Products (The Main Marketplace)
@router.get("/", response_model=List[schemas.ProductResponse])
def get_products(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100
):
    return db.query(models.Product).filter(models.Product.status == "approved").offset(skip).limit(limit).all()

# 2. Agent: Create a Product (Starts as Pending)
@router.post("/", response_model=schemas.ProductResponse)
def create_product(
    product_data: schemas.ProductCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["agent", "admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Only Agents can list products")

    farmer = db.query(models.Farmer).filter(models.Farmer.farmer_unique_id == product_data.farmer_unique_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer ID not found.")
    
    if farmer.agent_id != current_user.id and current_user.role not in ["admin", "superadmin"]:
         raise HTTPException(status_code=403, detail="You can only add products for your own farmers.")

    new_product = models.Product(
        name=product_data.name,
        amharic_name=product_data.amharic_name,
        category=product_data.category,
        quantity=product_data.quantity,
        unit=product_data.unit,
        quality=product_data.quality,
        ask_price=product_data.ask_price,
        description=product_data.description,
        image_url=product_data.image_url,
        status="pending",
        farmer_id=farmer.id
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# 3. Agent: Get My Listings
@router.get("/my-listings", response_model=List[schemas.ProductResponse])
def get_my_listings(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    return db.query(models.Product).join(models.Farmer).filter(models.Farmer.agent_id == current_user.id).all()

# --- NEW ADMIN ENDPOINTS ---

# 4. Admin: Get ALL Pending Products
@router.get("/pending", response_model=List[schemas.ProductResponse])
def get_pending_products(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return db.query(models.Product).filter(models.Product.status == "pending").all()

# 5. Admin: Approve or Reject Product
@router.put("/{product_id}/status", response_model=schemas.ProductResponse)
def update_product_status(
    product_id: int,
    status: str, # "approved" or "rejected"
    listing_price: float = None, # Admin can set the final price
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    if status not in ["approved", "rejected", "pending"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    product.status = status
    if listing_price and status == "approved":
        product.listing_price = listing_price # Set final price
        
    db.commit()
    db.refresh(product)
    return product
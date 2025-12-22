from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

# 1. CREATE LISTING (Agent Only)
@router.post("/list", response_model=schemas.ProductResponse)
def create_listing(
    product: schemas.ProductCreate, 
    db: Session = Depends(deps.get_db),
    current_agent: models.User = Depends(deps.get_current_active_agent)
):
    # 1. Find the Farmer by the Unique ID provided (e.g., FRM-1234)
    farmer = db.query(models.Farmer).filter(models.Farmer.farmer_unique_id == product.farmer_unique_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer ID not found")
    
    # 2. Create the Product (Status = PENDING by default)
    new_product = models.Product(
        name=product.name,
        amharic_name=product.amharic_name,
        category=product.category,
        quantity=product.quantity,
        unit=product.unit,
        quality=product.quality,
        ask_price=product.ask_price,
        listing_price=product.ask_price, # Initially same as ask price
        description=product.description,
        image_url=product.image_url,
        status=models.ProductStatus.PENDING,
        farmer_id=farmer.id
    )
    
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# 2. GET PUBLIC PRODUCTS (For the Website - APPROVED only)
@router.get("/", response_model=List[schemas.ProductResponse])
def get_public_products(
    category: str = None,
    db: Session = Depends(deps.get_db)
):
    query = db.query(models.Product).filter(models.Product.status == models.ProductStatus.APPROVED)
    if category and category != "All":
        query = query.filter(models.Product.category == category)
    return query.all()

# 3. GET PENDING PRODUCTS (Admin Only)
@router.get("/pending", response_model=List[schemas.ProductResponse])
def get_pending_products(
    db: Session = Depends(deps.get_db),
    current_admin: models.User = Depends(deps.get_current_active_superadmin) # Or normal admin
):
    return db.query(models.Product).filter(models.Product.status == models.ProductStatus.PENDING).all()

# 4. APPROVE/REJECT PRODUCT (Admin Only)
@router.put("/{product_id}/status", response_model=schemas.ProductResponse)
def update_product_status(
    product_id: int,
    status: str, # "approved" or "rejected"
    db: Session = Depends(deps.get_db),
    current_admin: models.User = Depends(deps.get_current_active_superadmin)
):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Validate status
    if status not in [models.ProductStatus.APPROVED, models.ProductStatus.REJECTED]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    product.status = status
    db.commit()
    db.refresh(product)
    return product
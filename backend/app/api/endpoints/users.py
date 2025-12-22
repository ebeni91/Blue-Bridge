from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps
from app.core import security

router = APIRouter()

# 1. LIST ALL USERS (Superadmin Only)
@router.get("/", response_model=List[schemas.UserResponse])
def read_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superadmin) # <--- Protected
):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# 2. CREATE NEW AGENT/ADMIN (Superadmin Only)
@router.post("/", response_model=schemas.UserResponse)
def create_staff_user(
    user: schemas.UserCreate, 
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superadmin) # <--- Protected
):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.phone_number == user.phone_number).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    hashed_password = security.get_password_hash(user.password)
    
    new_user = models.User(
        full_name=user.full_name,
        phone_number=user.phone_number,
        email=user.email,
        gender=user.gender,
        national_id=user.national_id,
        location=user.location,
        hashed_password=hashed_password,
        role=user.role, # Superadmin specifies the role (e.g., 'agent')
        is_active=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
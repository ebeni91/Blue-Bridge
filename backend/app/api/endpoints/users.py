from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

# 1. Get Current User (Profile)
@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(deps.get_current_active_user)):
    return current_user

# 2. Get All Users (SUPERADMIN ONLY)
@router.get("/", response_model=List[schemas.UserResponse])
def read_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superadmin) # <--- Strict Check
):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# 3. Update User Role (SUPERADMIN ONLY)
@router.put("/{user_id}/role", response_model=schemas.UserResponse)
def update_user_role(
    user_id: int,
    role: str, # "admin", "agent", "buyer"
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superadmin)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validation: Don't allow changing role to Superadmin via API for safety
    if role not in ["admin", "agent", "buyer"]:
         raise HTTPException(status_code=400, detail="Invalid role")
         
    user.role = role
    db.commit()
    db.refresh(user)
    return user
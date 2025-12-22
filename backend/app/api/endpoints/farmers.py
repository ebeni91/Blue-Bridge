import random
import string
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

# Helper to generate ID (e.g., FRM-8392)
def generate_farmer_id():
    suffix = ''.join(random.choices(string.digits, k=4))
    return f"FRM-{suffix}"

# 1. REGISTER A NEW FARMER (Agents Only)
@router.post("/", response_model=schemas.FarmerResponse)
def register_farmer(
    farmer: schemas.FarmerCreate, 
    db: Session = Depends(deps.get_db),
    current_agent: models.User = Depends(deps.get_current_active_agent)
):
    # Check if National ID already exists
    if db.query(models.Farmer).filter(models.Farmer.national_id == farmer.national_id).first():
        raise HTTPException(status_code=400, detail="Farmer with this National ID already registered")

    # Create Unique ID loop (ensure uniqueness)
    unique_id = generate_farmer_id()
    while db.query(models.Farmer).filter(models.Farmer.farmer_unique_id == unique_id).first():
        unique_id = generate_farmer_id()

    new_farmer = models.Farmer(
        **farmer.dict(),
        farmer_unique_id=unique_id,
        agent_id=current_agent.id # Link to the Agent logging in
    )
    
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)
    return new_farmer

# 2. LIST MY FARMERS (Agents see theirs, Admins see all)
@router.get("/", response_model=List[schemas.FarmerResponse])
def read_farmers(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    # If Superadmin, return ALL farmers
    if current_user.role == models.UserRole.SUPERADMIN:
        return db.query(models.Farmer).all()
    
    # If Agent, return ONLY farmers they registered
    if current_user.role == models.UserRole.AGENT:
        return db.query(models.Farmer).filter(models.Farmer.agent_id == current_user.id).all()
        
    return []
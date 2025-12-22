from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

# 1. Register a new Farmer (Agents Only)
@router.post("/", response_model=schemas.FarmerResponse)
def register_farmer(
    farmer_data: schemas.FarmerCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["agent", "superadmin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to register farmers")

    if db.query(models.Farmer).filter(models.Farmer.national_id == farmer_data.national_id).first():
        raise HTTPException(status_code=400, detail="Farmer with this National ID already exists")

    # Generate ID: FRM-2024-0001
    count = db.query(models.Farmer).count() + 1
    unique_id = f"FRM-{2024}-{count:04d}"

    new_farmer = models.Farmer(
        **farmer_data.dict(),
        farmer_unique_id=unique_id,
        agent_id=current_user.id
    )
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)
    return new_farmer

# 2. Get Farmers managed by the logged-in Agent
@router.get("/my-farmers", response_model=List[schemas.FarmerResponse])
def get_my_farmers(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    return db.query(models.Farmer).filter(models.Farmer.agent_id == current_user.id).all()
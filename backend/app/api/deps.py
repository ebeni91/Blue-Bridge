from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.core import config, security
from app.db import database, models, schemas

# This tells FastAPI that the user sends the token in the "Authorization: Bearer ..." header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the token
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        phone_number: str = payload.get("sub")
        if phone_number is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Get user from DB
    user = db.query(models.User).filter(models.User.phone_number == phone_number).first()
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_superadmin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != models.UserRole.SUPERADMIN:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges (Superadmin required)"
        )
    return current_user

async def get_current_active_agent(current_user: models.User = Depends(get_current_user)):
    if current_user.role != models.UserRole.AGENT and current_user.role != models.UserRole.SUPERADMIN:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges (Agent required)"
        )
    return current_user
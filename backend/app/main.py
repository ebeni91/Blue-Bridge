from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import models, database
from app.api.endpoints import auth, users ,farmers, marketplace
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Blue Bridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["User Management"]) # <--- Add this line
app.include_router(farmers.router, prefix="/api/farmers", tags=["Farmer Management"])
app.include_router(marketplace.router, prefix="/api/marketplace", tags=["Marketplace"])
@app.get("/")
def read_root():
    return {"message": "Blue Bridge Backend is Running"}
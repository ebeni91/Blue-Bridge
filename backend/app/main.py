from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import models, database

# 1. Create the Database Tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Blue Bridge API")

# 2. CORS (Allow Frontend to talk to Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Your React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Blue Bridge Backend is Running",
        "status": "Database Connected & Tables Created"
    }
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter()

# Schema for the Chat Request
class ChatRequest(BaseModel):
    message: str
    language: str = "en" # "en" or "am" (Amharic)

class ChatResponse(BaseModel):
    response: str
    suggested_products: Optional[List[str]] = []

# Simple Knowledge Base (Mock AI)
KNOWLEDGE_BASE = {
    "teff": {
        "price": "Current market price for Teff is around 5,000 ETB per quintal.",
        "tips": "Teff grows best in well-drained soil. Planting season is usually July."
    },
    "coffee": {
        "price": "Export quality coffee is trading at 350 ETB per kg.",
        "tips": "Shade-grown coffee retains moisture better during dry seasons."
    },
    "onion": {
        "price": "Red onions are 40 ETB per kg.",
        "tips": "Ensure regular watering but avoid waterlogging to prevent bulb rot."
    }
}

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(request: ChatRequest):
    msg = request.message.lower()
    
    # 1. Price Inquiry Logic
    if "price" in msg or "cost" in msg:
        for crop, info in KNOWLEDGE_BASE.items():
            if crop in msg:
                return {"response": info['price'], "suggested_products": [crop]}
        return {"response": "I can check prices for Teff, Coffee, and Onions. Which one are you interested in?"}

    # 2. Farming Advice Logic
    if "grow" in msg or "plant" in msg or "tip" in msg:
        for crop, info in KNOWLEDGE_BASE.items():
            if crop in msg:
                return {"response": info['tips'], "suggested_products": [crop]}
        return {"response": "I can give farming tips for Teff, Coffee, and Onions."}
        
    # 3. Greetings / Default
    greetings = ["Hello! I am the Blue Bridge AI assistant.", "Selam! How can I help you today?"]
    return {"response": random.choice(greetings)}
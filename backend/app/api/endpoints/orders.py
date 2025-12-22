from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.OrderResponse)
def place_order(
    order_data: schemas.OrderCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    # 1. Calculate Total Price & Validate Items
    total_price = 0
    valid_items = []

    for item in order_data.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product ID {item.product_id} not found")
        
        # Check stock (Optional: You can deduct stock here later)
        if product.quantity < item.quantity:
             raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")

        # Use the price from the database, NOT the frontend
        price = product.listing_price if product.listing_price else product.ask_price
        item_total = price * item.quantity
        total_price += item_total
        
        valid_items.append({
            "product": product,
            "quantity": item.quantity,
            "price": price,
            "farmer_id": product.farmer_id
        })

    # 2. Create the Order
    new_order = models.Order(
        user_id=current_user.id,
        total_price=total_price,
        status="pending",
        shipping_name=order_data.shipping_name,
        shipping_phone=order_data.shipping_phone,
        shipping_address=order_data.shipping_address,
        shipping_city=order_data.shipping_city
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # 3. Create Order Items
    for item in valid_items:
        order_item = models.OrderItem(
            order_id=new_order.id,
            product_id=item["product"].id,
            farmer_id=item["farmer_id"],
            quantity=item["quantity"],
            price_at_purchase=item["price"]
        )
        db.add(order_item)
        
        # Deduct Stock
        item["product"].quantity -= item["quantity"]
    
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/my-orders", response_model=List[schemas.OrderResponse])
def get_my_orders(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user)
):
    return db.query(models.Order).filter(models.Order.user_id == current_user.id).all()
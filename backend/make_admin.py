from app.db.database import SessionLocal
from app.db.models import User

db = SessionLocal()

print("--- Make a User an Admin ---")
phone = input("Enter the phone number of the user: ")

user = db.query(User).filter(User.phone_number == phone).first()

if user:
    user.role = "admin" # Update role
    db.commit()
    print(f"SUCCESS: {user.full_name} is now an ADMIN!")
    print("Please Log Out and Log In again on the frontend.")
else:
    print("User not found.")

db.close()
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, File, UploadFile, Form,  HTTPException
from sqlalchemy.orm import Session
import logging
import curd, models, schemas
from database import SessionLocal, engine
from utils import upload_image_to_azure
from datetime import datetime
from auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from datetime import timedelta
from typing import List, Optional
from dotenv import load_dotenv
import os

load_dotenv()


AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
AZURE_CONTAINER_NAME = os.getenv("AZURE_CONTAINER_NAME")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/user-register/", response_model=schemas.UserGet)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Attempting to register user with email: {user.user_email}")
    db_user = curd.get_user_by_email(db, email=user.user_email)
    if db_user:
        logger.warning(f"Email already registered: {user.user_email}")
        raise HTTPException(status_code=400, detail="Email already registered")
    result = curd.create_user(db=db, user=user)
    logger.info(f"User registered successfully: {user.user_email}")
    return result

@app.post("/user-login/", response_model=schemas.Token)
def login_user(user_login: schemas.UserLogin, db: Session = Depends(get_db)):
    user = curd.verify_user_credentials(db, email=user_login.user_email, password=user_login.user_password)
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.user_email}, expires_delta=access_token_expires
    )
    
    vendor_id = None
    if user.user_role == "vendor":
        vendor_id = curd.get_vendor_id_by_user_id(db, user.user_id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.user_id,
        "vendor_id": vendor_id
    }


@app.post("/user-register-vendor/", response_model=schemas.VendorGet)
def create_vendor(vendor: schemas.VendorCreate, db: Session = Depends(get_db)):
    logger.info(f"Creating vendor profile with data: {vendor}")
    return curd.create_vendor(db=db, vendor=vendor)

@app.post("/vendor-item/", response_model=schemas.ItemGet)
async def create_item(
    item_category: str = Form(...),
    item_name: str = Form(...),
    item_price: Optional[int] = Form(None),
    item_quantity: Optional[int] = Form(None),
    item_quantity_available: Optional[int] = Form(None),
    item_expiry_date: Optional[datetime] = Form(None),
    item_available_date: Optional[datetime] = Form(None),
    vendor_id: int = Form(...),
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Upload image to Azure Storage
    item_image_url = upload_image_to_azure(file, AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME)

    if not item_image_url:
        raise HTTPException(status_code=500, detail="Failed to upload image to Azure Storage")

    # Create item data
    item_data = schemas.ItemCreate(
        item_category=item_category,
        item_name=item_name,
        item_price=item_price,
        item_quantity=item_quantity,
        item_quantity_available=item_quantity_available,
        item_image_url=item_image_url,
        item_expiry_date=item_expiry_date,
        item_available_date=item_available_date,
        vendor_id=vendor_id,
        user_id=user_id
    )

    # Save item to the database
    db_item = curd.create_item(db=db, item=item_data, item_image_url=item_image_url)

    return db_item

@app.get("/vendor-items-list/", response_model=List[schemas.ItemGet])
def get_items(vendor_id: int, db: Session = Depends(get_db)):
    return curd.get_items_by_vendor(db, vendor_id=vendor_id)

@app.get("/vendor-item-details/", response_model=schemas.ItemGet)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = curd.get_item_by_id(db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# @app.put("/vendor-item-update/", response_model=schemas.ItemGet)
# def update_item(item_id: int, item_update: schemas.ItemUpdate, db: Session = Depends(get_db)):
#     item = curd.update_item(db, item_id=item_id, item_update=item_update)
#     if not item:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return item

@app.put("/vendor-item-update/", response_model=schemas.ItemGet)
async def update_item(
    item_id: int,
    item_category: Optional[str] = Form(None),
    item_name: Optional[str] = Form(None),
    item_price: Optional[int] = Form(None),
    item_quantity: Optional[int] = Form(None),
    item_quantity_available: Optional[int] = Form(None),
    item_expiry_date: Optional[datetime] = Form(None),
    item_available_date: Optional[datetime] = Form(None),
    vendor_id: Optional[int] = Form(None),
    user_id: Optional[int] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # If file is provided, upload it to Azure Storage
    item_image_url = None
    if file:
        item_image_url = upload_image_to_azure(file, AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME)
        if not item_image_url:
            raise HTTPException(status_code=500, detail="Failed to upload image to Azure Storage")

    # Create item update data
    item_update_data = schemas.ItemUpdate(
        item_category=item_category,
        item_name=item_name,
        item_price=item_price,
        item_quantity=item_quantity,
        item_quantity_available=item_quantity_available,
        item_expiry_date=item_expiry_date,
        item_available_date=item_available_date,
        vendor_id=vendor_id,
        user_id=user_id,
        item_image_url=item_image_url if item_image_url else None  # Only update if new image URL is provided
    )

    # Update item in the database
    item = curd.update_item(db=db, item_id=item_id, item_update=item_update_data, item_image_url=item_image_url)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.delete("/vendor-item-delete/", response_model=schemas.ItemGet)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = curd.delete_item(db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.get("/user-item-feed/", response_model=List[schemas.ItemGet])
def get_feed_items(user_id: int, db: Session = Depends(get_db)):
    return curd.get_feed_items(db=db, user_id=user_id)

@app.post("/user-place-order/", response_model=schemas.OrderGet)
def place_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return curd.create_order(db=db, order=order)

@app.get("/vendor-orders/", response_model=List[schemas.OrderGet])
def get_vendor_orders(user_id: int, order_status: Optional[str] = None, db: Session = Depends(get_db)):
    # Get the vendor_id related to the user_id
    vendor = curd.get_vendor_by_user_id(db, user_id=user_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found for the given user")
    
    # Get the orders for items listed by this vendor with optional order status
    orders = curd.get_orders_by_vendor_id(db, vendor_id=vendor.vendor_id, order_status=order_status)
    return orders

@app.get("/user-orders/", response_model=List[schemas.OrderGet])
def get_user_orders(user_id: int, db: Session = Depends(get_db), ):
    # Get the orders placed by this user
    orders = curd.get_orders_by_user_id(db, user_id=user_id)
    return orders

@app.put("/vendor-update-order-status/", response_model=schemas.OrderGet)
def update_order_status(order_id: int, vendor_id: int, order_status_update: schemas.OrderStatusUpdate, db: Session = Depends(get_db)):
    # Ensure the order exists and belongs to the vendor
    db_order = db.query(models.Order).join(models.Item).filter(
        models.Order.order_id == order_id,
        models.Item.vendor_id == vendor_id
    ).first()

    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found or you do not have permission to update this order")

    updated_order = curd.update_order_status(db, order_id=order_id, order_status=order_status_update.order_status)
    return updated_order

@app.post("/user-raise-dispute/", response_model=schemas.DisputeCreate)
def raise_dispute(dispute: schemas.DisputeCreate, db: Session = Depends(get_db)):
    # Ensure the order exists and belongs to the user
    db_order = db.query(models.Order).filter(
        models.Order.order_id == dispute.order_id,
        models.Order.user_id == dispute.user_id
    ).first()

    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found or you do not have permission to dispute this order")

    db_dispute = curd.create_dispute(db=db, dispute=dispute)
    return db_dispute

@app.put("/vendor-update-dispute-status/", response_model=schemas.DisputeCreate)
def update_dispute_status(dispute_id: int, vendor_id: int, dispute_status_update: schemas.DisputeStatusUpdate, db: Session = Depends(get_db)):
    # Ensure the dispute exists and the vendor has the right to update it
    db_dispute = db.query(models.Dispute).join(models.Order).join(models.Item).filter(
        models.Dispute.dispute_id == dispute_id,
        models.Item.vendor_id == vendor_id
    ).first()

    if not db_dispute:
        raise HTTPException(status_code=404, detail="Dispute not found or you do not have permission to update this dispute")

    updated_dispute = curd.update_dispute_status(db, dispute_id=dispute_id, dispute_status=dispute_status_update.dispute_status)
    return updated_dispute

@app.get("/user-disputes/", response_model=List[schemas.DisputeCreate])
def get_user_disputes(user_id: int, dispute_status: Optional[str] = None, db: Session = Depends(get_db)):
    disputes = curd.get_disputes_by_user_id(db, user_id=user_id, dispute_status=dispute_status)
    if not disputes:
        raise HTTPException(status_code=404, detail="No disputes found for the given user")
    return disputes

@app.get("/vendor-disputes/", response_model=List[schemas.DisputeCreate])
def get_vendor_disputes(vendor_id: int, dispute_status: Optional[str] = None, db: Session = Depends(get_db)):
    disputes = curd.get_disputes_by_vendor_id(db, vendor_id=vendor_id, dispute_status=dispute_status)
    if not disputes:
        raise HTTPException(status_code=404, detail="No disputes found for the given vendor")
    return disputes

@app.delete("/delete-dispute/", response_model=schemas.DisputeCreate)
def delete_dispute(dispute_id: int, user_id: int, db: Session = Depends(get_db)):
    db_dispute = curd.delete_dispute(db, dispute_id=dispute_id, user_id=user_id)
    if not db_dispute:
        raise HTTPException(status_code=404, detail="Dispute not found or you do not have permission to delete this dispute")
    return db_dispute



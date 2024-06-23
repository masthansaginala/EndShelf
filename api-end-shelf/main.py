from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import logging
import curd, models, schemas
from database import SessionLocal, engine
from auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from datetime import timedelta
from typing import List


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

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
    logger.info(f"Attempting to log in user with email: {user_login.user_email}")
    user = curd.verify_user_credentials(db, email=user_login.user_email, password=user_login.user_password)
    if user is None:
        logger.warning(f"Invalid login attempt for email: {user_login.user_email}")
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.user_email}, expires_delta=access_token_expires
    )
    
    logger.info(f"User logged in successfully: {user.user_email}")
    return {"access_token": access_token, "token_type": "bearer", "user_id": user.user_id}

@app.post("/user-register-vendor/", response_model=schemas.VendorGet)
def create_vendor(vendor: schemas.VendorCreate, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    logger.info(f"Creating vendor profile with data: {token}")
    logger.info(f"Creating vendor profile with data: {vendor}")
    return curd.create_vendor(db=db, vendor=vendor, user_id=vendor.user_id)

@app.post("/vendor-item/", response_model=schemas.ItemGet)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db), token: models.User = Depends(get_current_user)):
    logger.info(f"Creating Item: {token}")
    return curd.create_item(db=db, item=item)

@app.get("/vendor-items-list/", response_model=List[schemas.ItemGet])
def get_items(vendor_id: int, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    return curd.get_items_by_vendor(db, vendor_id=vendor_id)

@app.get("/vendor-item-details/", response_model=schemas.ItemGet)
def get_item(item_id: int, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    item = curd.get_item_by_id(db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.put("/vendor-item-update/", response_model=schemas.ItemGet)
def update_item(item_id: int, item_update: schemas.ItemUpdate, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    item = curd.update_item(db, item_id=item_id, item_update=item_update)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.delete("/vendor-item-delete/", response_model=schemas.ItemGet)
def delete_item(item_id: int, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    logger.info(f"vendor item data : {token}")
    item = curd.delete_item(db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.get("/user-item-feed/", response_model=List[schemas.ItemGet])
def get_feed_items(user_id: int, db: Session = Depends(get_db), token: str = Depends(get_current_user)):
    return curd.get_feed_items(db=db, user_id=user_id)



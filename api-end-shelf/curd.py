from sqlalchemy.orm import Session
from datetime import datetime, timezone
import bcrypt
import models
import schemas

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.user_email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.user_password.encode('utf-8'), bcrypt.gensalt())  # Hash the password
    db_user = models.User(
        user_full_name=user.user_full_name,
        user_dob=user.user_dob,
        user_gender=user.user_gender,
        user_phone_number=user.user_phone_number,
        user_email=user.user_email,
        user_address=user.user_address,
        user_city=user.user_city,
        user_country=user.user_country,
        user_zipcode=user.user_zipcode,
        user_password=hashed_password.decode('utf-8'),  # Store the hashed password
        user_status=user.user_status,
        user_organisation=user.user_organisation,
        user_orgainsation_type=user.user_orgainsation_type,
        user_role=user.user_role,
        user_created_at=datetime.now(timezone.utc)  # Use timezone-aware datetime
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



def verify_user_credentials(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt.checkpw(password.encode('utf-8'), user.user_password.encode('utf-8')):
        return user
    return None


def create_vendor(db: Session, vendor: schemas.VendorCreate):
    db_vendor = models.Vendor(
        vendor_shop_name=vendor.vendor_shop_name,
        vendor_shop_license_number=vendor.vendor_shop_license_number,
        vendor_shop_email=vendor.vendor_shop_email,
        vendor_shop_phone_number=vendor.vendor_shop_phone_number,
        vendor_shop_address=vendor.vendor_shop_address,
        vendor_shop_city=vendor.vendor_shop_city,
        vendor_shop_country=vendor.vendor_shop_country,
        vendor_shop_zipcode=vendor.vendor_shop_zipcode,
        vendor_delivery=vendor.vendor_delivery,
        user_id=vendor.user_id,
        vendor_created_at=datetime.now(timezone.utc)
    )
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(
        item_category=item.item_category,
        item_name=item.item_name,
        item_price=item.item_price,
        item_quantity=item.item_quantity,
        item_quantity_available=item.item_quantity_available,
        item_expiry_date=item.item_expiry_date,
        item_available_date=item.item_available_date,
        vendor_id=item.vendor_id,
        user_id=item.user_id,
        item_created_at=datetime.now(timezone.utc)
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items_by_vendor(db: Session, vendor_id: int):
    return db.query(models.Item).filter(models.Item.vendor_id == vendor_id, models.Item.item_delete_at == None).all()

def get_item_by_id(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.item_id == item_id).first()

def update_item(db: Session, item_id: int, item_update: schemas.ItemUpdate):
    db_item = db.query(models.Item).filter(models.Item.item_id == item_id).first()
    if db_item:
        if item_update.item_price is not None:
            db_item.item_price = item_update.item_price
        if item_update.item_quantity is not None:
            db_item.item_quantity = item_update.item_quantity
        if item_update.item_quantity_available is not None:
            db_item.item_quantity_available = item_update.item_quantity_available
        if item_update.item_expiry_date is not None:
            db_item.item_expiry_date = item_update.item_expiry_date
        if item_update.item_available_date is not None:
            db_item.item_available_date = item_update.item_available_date
        db_item.item_updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).filter(models.Item.item_id == item_id).first()
    if db_item:
        db_item.item_delete_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_item)
    return db_item

def get_feed_items(db: Session, user_id: int):
    return db.query(models.Item).filter(
        models.Item.user_id != user_id,
        models.Item.item_delete_at == None
    ).all()


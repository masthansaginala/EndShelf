from sqlalchemy.orm import Session
from datetime import datetime, timezone
import bcrypt
import models
import schemas
from typing import Optional
import logging



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.user_email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.user_password.encode('utf-8'), bcrypt.gensalt())  # Hash the password
    logger.info(user.user_organisation_type)
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
        user_organisation_type=user.user_organisation_type,
        user_role="user",
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
    # Create the vendor entry
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
    
    db_user = db.query(models.User).filter(models.User.user_id == vendor.user_id).first()
    if db_user:
        db_user.user_role = "vendor"
        db.commit()
        db.refresh(db_user)
    
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def create_item(db: Session, item: schemas.ItemCreate, item_image_url: str):
    db_item = models.Item(
        item_category=item.item_category,
        item_name=item.item_name,
        item_price=item.item_price,
        item_quantity=item.item_quantity,
        item_quantity_available=item.item_quantity_available,
        item_image_url=item_image_url,
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

def update_item(db: Session, item_id: int, item_update: schemas.ItemUpdate, item_image_url: Optional[str] = None):
    db_item = db.query(models.Item).filter(models.Item.item_id == item_id).first()
    if db_item:
        if item_update.item_category is not None:
            db_item.item_category = item_update.item_category
        if item_update.item_name is not None:
            db_item.item_name = item_update.item_name
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
        if item_image_url is not None:
            db_item.item_image_url = item_image_url
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
        models.Item.item_delete_at == None,
        models.Item.item_quantity_available > 0
    ).all()

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        item_id=order.item_id,
        user_id=order.user_id,
        purchased_quantity=order.purchased_quantity,
        order_price=order.order_price,
        order_status=order.order_status,
        order_created_at=datetime.now(timezone.utc)
    )
    db.add(db_order)
    
    # Update the item's available quantity
    db_item = db.query(models.Item).filter(models.Item.item_id == order.item_id).first()
    if db_item:
        db_item.item_quantity_available -= order.purchased_quantity
        db.commit()
        db.refresh(db_item)
    logger.info(f"db_item", {db_item}, {db_item.item_quantity_available-order.purchased_quantity})
    
    db.commit()
    db.refresh(db_order)
    return db_order

def get_vendor_by_user_id(db: Session, user_id: int):
    return db.query(models.Vendor).filter(models.Vendor.user_id == user_id).first()

def get_orders_by_vendor_id(db: Session, vendor_id: int, order_status: Optional[str] = None):
    query = db.query(models.Order).join(models.Item).filter(
        models.Item.vendor_id == vendor_id,
        models.Order.item_id == models.Item.item_id
    )
    if order_status:
        query = query.filter(models.Order.order_status == order_status)
    
    return query.all()

def get_orders_by_user_id(db: Session, user_id: int):
    orders = db.query(models.Order).filter(models.Order.user_id == user_id).all()
    for order in orders:
        dispute = db.query(models.Dispute).filter(
            models.Dispute.order_id == order.order_id,
            models.Dispute.dispute_delete_at == None
        ).first()
        order.dispute_id = dispute.dispute_id if dispute else None
    return orders

def update_order_status(db: Session, order_id: int, order_status: str):
    db_order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if db_order:
        db_order.order_status = order_status
        db_order.order_updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_order)
    return db_order

# def create_dispute(db: Session, dispute: schemas.DisputeCreate):
#     db_dispute = models.Dispute(
#         order_id=dispute.order_id,
#         dispute_category=dispute.dispute_category,
#         dispute_title=dispute.dispute_title,
#         dispute_description=dispute.dispute_description,
#         dispute_remarks=dispute.dispute_remarks,
#         dispute_status=dispute.dispute_status,
#         dispute_created_at=datetime.now(timezone.utc)
#     )
#     db.add(db_dispute)
#     db.commit()
#     db.refresh(db_dispute)
#     return db_dispute

def create_dispute(db: Session, dispute: schemas.DisputeCreate):
    db_dispute = models.Dispute(
        order_id=dispute.order_id,
        user_id=dispute.user_id,  # Handle user_id
        dispute_category=dispute.dispute_category,
        dispute_title=dispute.dispute_title,
        dispute_description=dispute.dispute_description,
        dispute_remarks=dispute.dispute_remarks,
        dispute_status=dispute.dispute_status,
        dispute_created_at=datetime.now(timezone.utc)
    )
    db.add(db_dispute)
    db.commit()
    db.refresh(db_dispute)
    return db_dispute



def update_dispute_status(db: Session, dispute_id: int, dispute_status: str, dispute_remarks: Optional[str] = None):
    db_dispute = db.query(models.Dispute).filter(models.Dispute.dispute_id == dispute_id).first()
    if db_dispute:
        db_dispute.dispute_status = dispute_status
        db_dispute.dispute_remarks = dispute_remarks
        db_dispute.dispute_updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_dispute)
    return db_dispute

def get_disputes_by_user_id(db: Session, user_id: int, dispute_status: Optional[str] = None):
    query = db.query(models.Dispute).filter(
        models.Dispute.user_id == user_id,
        models.Dispute.dispute_delete_at == None
    )
    if dispute_status:
        query = query.filter(models.Dispute.dispute_status == dispute_status)
    
    return query.all()


def get_disputes_by_vendor_id(db: Session, vendor_id: int, dispute_status: Optional[str] = None, dispute_category: Optional[str] = None):
    query = db.query(models.Dispute).join(models.Order).join(models.Item).filter(
        models.Item.vendor_id == vendor_id,
        models.Dispute.dispute_delete_at == None,
        models.Dispute.order_id == models.Order.order_id,
        models.Order.item_id == models.Item.item_id
    )
    if dispute_status:
        query = query.filter(models.Dispute.dispute_status == dispute_status)

    if dispute_category:
        query = query.filter(models.Dispute.dispute_category == dispute_category)

    return query.all()



def delete_dispute(db: Session, dispute_id: int, user_id: int):
    db_dispute = db.query(models.Dispute).join(models.Order).filter(
        models.Dispute.dispute_id == dispute_id,
        models.Order.user_id == user_id,
        models.Dispute.order_id == models.Order.order_id
    ).first()
    
    if db_dispute:
        db_dispute.dispute_status = "Closed"
        db_dispute.dispute_delete_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_dispute)
    return db_dispute

def get_vendor_id_by_user_id(db: Session, user_id: int):
    vendor = db.query(models.Vendor).filter(models.Vendor.user_id == user_id).first()
    return vendor.vendor_id if vendor else None

def get_all_users(db: Session):
    return db.query(models.User).all()

def get_all_vendors(db: Session):
    return db.query(models.Vendor).all()

def get_all_items(db: Session):
    return db.query(models.Item).all()

def get_all_orders(db: Session):
    return db.query(models.Order).all()

def get_all_disputes(db: Session):
    return db.query(models.Dispute).all()

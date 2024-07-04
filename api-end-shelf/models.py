from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    user_full_name = Column(String, nullable=False)
    user_dob = Column(String, nullable=False)
    user_gender = Column(String, nullable=False)
    user_phone_number = Column(String, nullable=False)
    user_email = Column(String, nullable=False, unique=True)
    user_address = Column(String, nullable=False)
    user_city = Column(String, nullable=False)
    user_country = Column(String, nullable=False)
    user_zipcode = Column(String, nullable=False)
    user_password = Column(String, nullable=False)
    user_status = Column(String, nullable=True)
    user_organisation = Column(String, nullable=True)
    user_organisation_type = Column(String, nullable=True)
    user_role = Column(String, nullable=True)
    user_created_at = Column(DateTime, nullable=False)
    user_updated_at = Column(DateTime, nullable=True)
    user_delete_at = Column(DateTime, nullable=True)

    vendors = relationship("Vendor", back_populates="user")

class Vendor(Base):
    __tablename__ = "vendors"

    vendor_id = Column(Integer, primary_key=True, index=True)
    vendor_shop_name = Column(String, nullable=False)
    vendor_shop_license_number = Column(String, nullable=False)
    vendor_shop_email = Column(String, nullable=False)
    vendor_shop_phone_number = Column(String, nullable=False)
    vendor_shop_address = Column(String, nullable=False)
    vendor_shop_city = Column(String, nullable=False)
    vendor_shop_country = Column(String, nullable=False)
    vendor_shop_zipcode = Column(String, nullable=False)
    vendor_delivery = Column(String, nullable=False)
    vendor_status = Column(String, nullable=True)
    vendor_admin_remarks = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    vendor_created_at = Column(DateTime, nullable=False)
    vendor_updated_at = Column(DateTime, nullable=True)
    vendor_delete_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="vendors")

class Item(Base):
    __tablename__ = "items"

    item_id = Column(Integer, primary_key=True, index=True)
    item_category = Column(String, nullable=False)
    item_name = Column(String, nullable=False)
    item_price = Column(Integer, nullable=True)
    item_quantity = Column(Integer, nullable=True)
    item_quantity_available = Column(Integer, nullable=True)
    item_image_url = Column(String, nullable=True)
    item_expiry_date = Column(DateTime, nullable=True)
    item_available_date = Column(DateTime, nullable=True)
    vendor_id = Column(Integer, ForeignKey("vendors.vendor_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    item_created_at = Column(DateTime, nullable=False)
    item_updated_at = Column(DateTime, nullable=True)
    item_delete_at = Column(DateTime, nullable=True)

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.item_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    purchased_quantity = Column(Integer, nullable=False)
    order_price = Column(Integer, nullable=False)
    order_status = Column(String, nullable=True)
    order_created_at = Column(DateTime, nullable=False)
    order_updated_at = Column(DateTime, nullable=True)
    order_delete_at = Column(DateTime, nullable=True)

class Dispute(Base):
    __tablename__ = "disputes"

    dispute_id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)  # Add this field
    dispute_category = Column(String, nullable=True)
    dispute_title = Column(String, nullable=False)
    dispute_description = Column(String, nullable=False)
    dispute_remarks = Column(String, nullable=True)
    dispute_status = Column(String, nullable=True)
    dispute_created_at = Column(DateTime, nullable=False)
    dispute_updated_at = Column(DateTime, nullable=True)
    dispute_delete_at = Column(DateTime, nullable=True)


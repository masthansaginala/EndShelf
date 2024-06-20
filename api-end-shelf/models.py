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
    user_orgainsation_type = Column(String, nullable=True)
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
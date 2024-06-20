from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# UserCreate schema
class UserCreate(BaseModel):
    user_full_name: str
    user_dob: str
    user_gender: str
    user_phone_number: str
    user_email: str
    user_address: str
    user_city: str
    user_country: str
    user_zipcode: str
    user_password: str
    user_status: Optional[str] = None
    user_organisation: Optional[str] = None
    user_orgainsation_type: Optional[str] = None
    user_role: Optional[str] = None

# UserGet schema
class UserGet(BaseModel):
    user_id: int
    user_full_name: str
    user_dob: str
    user_gender: str
    user_phone_number: str
    user_email: str
    user_address: str
    user_city: str
    user_country: str
    user_zipcode: str
    user_status: Optional[str] = None
    user_organisation: Optional[str] = None
    user_orgainsation_type: Optional[str] = None
    user_role: Optional[str] = None
    user_created_at: datetime
    user_updated_at: Optional[datetime] = None
    user_delete_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# UserUpdate schema
class UserUpdate(BaseModel):
    user_full_name: Optional[str] = None
    user_dob: Optional[str] = None
    user_gender: Optional[str] = None
    user_phone_number: Optional[str] = None
    user_email: Optional[str] = None
    user_address: Optional[str] = None
    user_city: Optional[str] = None
    user_country: Optional[str] = None
    user_zipcode: Optional[str] = None
    user_password: Optional[str] = None
    user_status: Optional[str] = None
    user_organisation: Optional[str] = None
    user_orgainsation_type: Optional[str] = None
    user_role: Optional[str] = None
    user_updated_at: Optional[datetime] = None
    user_delete_at: Optional[datetime] = None


# VendorCreate schema
class VendorCreate(BaseModel):
    vendor_shop_name: str
    vendor_shop_license_number: str
    vendor_shop_email: str
    vendor_shop_phone_number: str
    vendor_shop_address: str
    vendor_shop_city: str
    vendor_shop_country: str
    vendor_shop_zipcode: str
    vendor_delivery: str
    vendor_status: Optional[str] = None
    vendor_admin_remarks: Optional[str] = None
    user_id: int

# VendorGet schema
class VendorGet(BaseModel):
    vendor_id: int
    vendor_shop_name: str
    vendor_shop_license_number: str
    vendor_shop_email: str
    vendor_shop_phone_number: str
    vendor_shop_address: str
    vendor_shop_city: str
    vendor_shop_country: str
    vendor_shop_zipcode: str
    vendor_delivery: str
    vendor_status: Optional[str] = None
    vendor_admin_remarks: Optional[str] = None
    user_id: int
    vendor_created_at: datetime
    vendor_updated_at: Optional[datetime] = None
    vendor_delete_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# VendorUpdate schema
class VendorUpdate(BaseModel):
    vendor_shop_name: Optional[str] = None
    vendor_shop_license_number: Optional[str] = None
    vendor_shop_email: Optional[str] = None
    vendor_shop_phone_number: Optional[str] = None
    vendor_shop_address: Optional[str] = None
    vendor_shop_city: Optional[str] = None
    vendor_shop_country: Optional[str] = None
    vendor_shop_zipcode: Optional[str] = None
    vendor_delivery: Optional[str] = None
    vendor_status: Optional[str] = None
    vendor_admin_remarks: Optional[str] = None
    user_id: Optional[int] = None
    vendor_updated_at: Optional[datetime] = None
    vendor_delete_at: Optional[datetime] = None

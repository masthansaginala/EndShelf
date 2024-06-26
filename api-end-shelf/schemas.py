from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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
    user_id: int
    vendor_status: Optional[str] = None
    vendor_admin_remarks: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    vendor_id: Optional[int] = None

class UserLogin(BaseModel):
    user_email: str
    user_password: str

class ItemCreate(BaseModel):
    item_category: str
    item_name: str
    item_price: Optional[int] = None
    item_quantity: Optional[int] = None
    item_quantity_available: Optional[int] = None
    item_image_url: Optional[str] = None
    item_expiry_date: Optional[datetime] = None
    item_available_date: Optional[datetime] = None
    vendor_id: int
    user_id: int

class ItemGet(BaseModel):
    item_id: int
    item_category: str
    item_name: str
    item_price: Optional[int] = None
    item_quantity: Optional[int] = None
    item_quantity_available: Optional[int] = None
    item_image_url: Optional[str] = None
    item_expiry_date: Optional[datetime] = None
    item_available_date: Optional[datetime] = None
    vendor_id: int
    user_id: int
    item_created_at: datetime
    item_updated_at: Optional[datetime] = None
    item_delete_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ItemUpdate(BaseModel):
    item_category: Optional[str] = None
    item_name: Optional[str] = None
    item_price: Optional[int] = None
    item_quantity: Optional[int] = None
    item_quantity_available: Optional[int] = None
    item_image_url: Optional[str] = None
    item_expiry_date: Optional[datetime] = None
    item_available_date: Optional[datetime] = None
    vendor_id: Optional[int] = None
    user_id: Optional[int] = None

class OrderCreate(BaseModel):
    item_id: int
    user_id: int
    purchased_quantity: int
    order_price: int
    order_status: Optional[str] = None

class OrderGet(BaseModel):
    order_id: int
    item_id: int
    user_id: int
    purchased_quantity: int
    order_price: int
    order_status: Optional[str] = None
    order_created_at: datetime
    order_updated_at: Optional[datetime] = None
    order_delete_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class OrderStatusUpdate(BaseModel):
    order_status: str

class DisputeCreate(BaseModel):
    order_id: int
    dispute_category: Optional[str] = None
    dispute_title: str
    dispute_description: str
    dispute_remarks: Optional[str] = None
    dispute_status: Optional[str] = None

class DisputeStatusUpdate(BaseModel):
    dispute_status: str

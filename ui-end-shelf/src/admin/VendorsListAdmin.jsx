import React, { useEffect, useState } from "react";
import { getVendorsForAdmin } from "../api/admin";
import { toast } from "react-toastify";

export default function VendorsListAdmin() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const data = await getVendorsForAdmin();
      setVendors(data);
    } catch (error) {
      toast.error("Error fetching vendors");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Vendors List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Shop Name</th>
                <th className="py-2 px-4 border-b">License Number</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Zipcode</th>
                <th className="py-2 px-4 border-b">Delivery</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Admin Remarks</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <tr key={vendor.vendor_id}>
                    <td className="py-2 px-4 border-b">{vendor.vendor_id}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_name}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_license_number}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_email}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_phone_number}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_address}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_city}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_country}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_shop_zipcode}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_delivery}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_status || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_admin_remarks || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_created_at}</td>
                    <td className="py-2 px-4 border-b">{vendor.vendor_updated_at || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="py-4 text-center">
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

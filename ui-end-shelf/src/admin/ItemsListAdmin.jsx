import React, { useEffect, useState } from "react";
import { getItemsForAdmin } from "../api/admin";
import { toast } from "react-toastify";

export default function ItemsListAdmin() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await getItemsForAdmin();
      setItems(data);
    } catch (error) {
      toast.error("Error fetching items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Items List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Quantity Available</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Expiry Date</th>
                <th className="py-2 px-4 border-b">Available Date</th>
                <th className="py-2 px-4 border-b">Vendor ID</th>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                <th className="py-2 px-4 border-b">Deleted At</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.item_id}>
                    <td className="py-2 px-4 border-b">{item.item_id}</td>
                    <td className="py-2 px-4 border-b">{item.item_category}</td>
                    <td className="py-2 px-4 border-b">{item.item_name}</td>
                    <td className="py-2 px-4 border-b">{item.item_price}</td>
                    <td className="py-2 px-4 border-b">{item.item_quantity}</td>
                    <td className="py-2 px-4 border-b">{item.item_quantity_available}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={item.item_image_url} alt={item.item_name} className="h-10 w-10 object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b">{new Date(item.item_expiry_date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(item.item_available_date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{item.vendor_id}</td>
                    <td className="py-2 px-4 border-b">{item.user_id}</td>
                    <td className="py-2 px-4 border-b">{new Date(item.item_created_at).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{item.item_updated_at ? new Date(item.item_updated_at).toLocaleDateString() : "N/A"}</td>
                    <td className="py-2 px-4 border-b">{item.item_delete_at ? new Date(item.item_delete_at).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="py-4 text-center">
                    No items found
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

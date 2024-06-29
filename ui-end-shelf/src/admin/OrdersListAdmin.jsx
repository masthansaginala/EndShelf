import React, { useEffect, useState } from "react";
import { getOrdersForAdmin } from "../api/admin";
import { toast } from "react-toastify";

export default function OrdersListAdmin() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersForAdmin();
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Orders List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Item ID</th>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Purchased Quantity</th>
                <th className="py-2 px-4 border-b">Order Price</th>
                <th className="py-2 px-4 border-b">Order Status</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                <th className="py-2 px-4 border-b">Deleted At</th>
                <th className="py-2 px-4 border-b">Dispute ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="py-2 px-4 border-b">{order.order_id}</td>
                    <td className="py-2 px-4 border-b">{order.item_id}</td>
                    <td className="py-2 px-4 border-b">{order.user_id}</td>
                    <td className="py-2 px-4 border-b">{order.purchased_quantity}</td>
                    <td className="py-2 px-4 border-b">{order.order_price}</td>
                    <td className="py-2 px-4 border-b">{order.order_status}</td>
                    <td className="py-2 px-4 border-b">{new Date(order.order_created_at).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{order.order_updated_at ? new Date(order.order_updated_at).toLocaleDateString() : "N/A"}</td>
                    <td className="py-2 px-4 border-b">{order.order_delete_at ? new Date(order.order_delete_at).toLocaleDateString() : "N/A"}</td>
                    <td className="py-2 px-4 border-b">{order.dispute_id || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center">
                    No orders found
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

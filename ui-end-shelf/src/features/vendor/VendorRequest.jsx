import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getVendorOrders, vendorOrderStatusUpdate } from "../../api/loginapi";
import { toast } from "react-toastify";

const orderStatuses = ["Ordered", "Packed", "Shipped", "Delivered"];

export default function VendorRequest() {
  const [orders, setOrders] = useState([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [updateOrderStatusForm, setUpdateOrderStatusForm] = useState({
    order_id: 0,
    order_status: "",
  });

  const fetchVendorOrders = async (status) => {
    const user_id = localStorage.getItem("user_id");
    const vendor_id = localStorage.getItem("vendor_id");
    try {
      const data = await getVendorOrders(user_id, status);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setUpdateOrderStatusForm({ ...updateOrderStatusForm, [name]: value });
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const vendor_id = localStorage.getItem("vendor_id");
    const order_id = updateOrderStatusForm.order_id;
    try {
      await vendorOrderStatusUpdate(order_id, vendor_id, updateOrderStatusForm);
      toast.success("Order status updated successfully");
      setIsOpen(false);
      fetchVendorOrders(orderStatusFilter);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchVendorOrders(orderStatusFilter);
  }, [orderStatusFilter]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Orders</h2>
        <div className="mb-4">
          <label
            htmlFor="order_status_filter"
            className="block text-gray-700 font-medium mb-2"
          >
            Filter by Order Status
          </label>
          <select
            id="order_status_filter"
            name="order_status_filter"
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {orders?.length ? (
            orders.map((order) => (
              <div
                key={order.order_id}
                className="group relative bg-gray-100 p-4 rounded-lg shadow"
              >
                <h3 className="text-sm font-medium text-gray-700">
                  Order ID: {order.order_id}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Status: {order.order_status}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Price: ${order.order_price}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Quantity: {order.purchased_quantity}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setUpdateOrderStatusForm({
                      order_id: order.order_id,
                      order_status: order.order_status,
                    });
                  }}
                  disabled={order.order_status === "Delivered"}
                  className={`mt-2 px-4 py-2 text-sm font-medium text-white ${
                    order.order_status === "Delivered"
                      ? "bg-gray-400"
                      : "bg-custom-orange hover:bg-custom-orange"
                  } rounded-lg`}
                >
                  Update Order
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        {!orders?.length ? (
          <div className="d-flex justify-content-center">
            There are no current vendor requests. Please check the product page
            to place an order.
          </div>
        ) : (
          <></>
        )}
      </div>

      {isOpen && (
        <Dialog
          className="relative z-10"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <h2 className="text-2xl font-bold mb-6">Update Order Status</h2>
                <form onSubmit={handleUpdateStatusSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="order_status"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Order Status
                    </label>
                    <select
                      id="order_status"
                      name="order_status"
                      value={updateOrderStatusForm.order_status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent custom-orange px-8 py-3 text-base font-medium text-white hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2"
                  >
                    Update Status
                  </button>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

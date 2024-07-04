import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  getUserOrders,
  userRaiseDisputeApi,
  userDeleteDisputeApi,
} from "../../api/loginapi";
import { toast } from "react-toastify";

const disputeCategories = [
  "Product_Not_Received",
  "Product_Damaged",
  "Product_Not_as_Described",
  "Wrong_Product_Received",
  "Order_Canceled",
  "Duplicate_Order",
  "Refund_Not_Received",
  "Unauthorized_Charge",
  "Late_Delivery",
  "Missing_Products",
  "Quality_Issues",
  "Customer_Changed_Mind",
  "Payment_Issues",
];

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [disputeFormData, setDisputeFormData] = useState({
    order_id: 0,
    dispute_category: "",
    dispute_title: "",
    dispute_description: "",
    dispute_status: "Open",
  });

  const [deleteDisputeData, setDeleteDisputeData] = useState({
    user_id: 0,
    dispute_id: 0,
  });

  const fetchUserOrders = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const data = await getUserOrders(user_id);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDisputeChange = (e) => {
    const { name, value } = e.target;
    setDisputeFormData({ ...disputeFormData, [name]: value });
  };

  const handleDisputeSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    disputeFormData.user_id = user_id;
    try {
      await userRaiseDisputeApi(disputeFormData);
      toast.success("Dispute raised successfully");
      setIsOpen(false);
      fetchUserOrders();
    } catch (error) {
      console.error("Error raising dispute:", error);
      toast.error("Failed to raise dispute");
    }
  };

  const handleDeleteDispute = async (dispute_id) => {
    console.log(dispute_id, "d");
    const user_id = localStorage.getItem("user_id");
    console.log(user_id, "u");
    try {
      await userDeleteDisputeApi(dispute_id, user_id);
      toast.success("Dispute deleted successfully");
      fetchUserOrders();
    } catch (error) {
      console.error("Error deleting dispute:", error);
      toast.error("Failed to delete dispute");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {orders?.length ? (
            orders.map((order) => (
              <div
                key={order.order_id}
                className="group relative bg-custom-card p-4 rounded-lg shadow"
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
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      setDisputeFormData({
                        ...disputeFormData,
                        order_id: order.order_id,
                      });
                    }}
                    disabled={order.dispute_id !== null}
                    className={`mt-2 px-4 py-2 text-sm font-medium text-white ${
                      order.dispute_id !== 0
                        ? "bg-gray-400"
                        : "bg-custom-orange hover:bg-custom-orange"
                    } rounded-lg`}
                  >
                    Raise Dispute
                  </button>
                  {order.dispute_id !== null && (
                    <button
                      type="button"
                      onClick={() => handleDeleteDispute(order.dispute_id)}
                      className="mt-2 ml-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                      Delete Dispute
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
            </>
          )}
        </div>
        {orders?.length ? (
            <></>
          ) : (
            <>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    No Orders
                  </p>
                  <p className="text-gray-500">
                    OOPS..! Seems Not Ordered Anything . Visit Prodcuts Page.
                  </p>
                </div>
              </div>
            </>
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
                <h2 className="text-2xl font-bold mb-6">Raise a Dispute</h2>
                <form onSubmit={handleDisputeSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="dispute_category"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Dispute Category
                    </label>
                    <select
                      id="dispute_category"
                      name="dispute_category"
                      value={disputeFormData.dispute_category}
                      onChange={handleDisputeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      {disputeCategories.map((category) => (
                        <option key={category} value={category}>
                          {category.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dispute_title"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Dispute Title
                    </label>
                    <input
                      type="text"
                      id="dispute_title"
                      name="dispute_title"
                      value={disputeFormData.dispute_title}
                      onChange={handleDisputeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dispute_description"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Dispute Description
                    </label>
                    <textarea
                      id="dispute_description"
                      name="dispute_description"
                      value={disputeFormData.dispute_description}
                      onChange={handleDisputeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows="4"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-custom-orange px-8 py-3 text-base font-medium text-white hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2"
                  >
                    Submit Dispute
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

import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getVendorDisputes, vendorDisputeStatusUpdate } from "../../api/loginapi";
import { toast } from "react-toastify";

const disputeStatuses = ["Open", "In Progress", "Closed"];
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

export default function VendorDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [disputeStatusFilter, setDisputeStatusFilter] = useState("");
  const [disputeCategoryFilter, setDisputeCategoryFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [updateDisputeStatusForm, setUpdateDisputeStatusForm] = useState({
    dispute_status: "",
    dispute_remarks: "",
    order_id:0
  });
  const [currentDisputeId, setCurrentDisputeId] = useState(null);

  const fetchVendorDisputes = async (status, category) => {
    const vendor_id = localStorage.getItem("vendor_id");
    try {
      const data = await getVendorDisputes(vendor_id, status, category);
      setDisputes(data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    }
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setUpdateDisputeStatusForm({ ...updateDisputeStatusForm, [name]: value });
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    const vendor_id = localStorage.getItem("vendor_id");
    try {
      await vendorDisputeStatusUpdate(currentDisputeId, vendor_id, updateDisputeStatusForm);
      toast.success("Dispute status updated successfully");
      setIsOpen(false);
      fetchVendorDisputes(disputeStatusFilter, disputeCategoryFilter);
    } catch (error) {
      console.error("Error updating dispute status:", error);
      toast.error("Failed to update dispute status");
    }
  };

  useEffect(() => {
    fetchVendorDisputes(disputeStatusFilter, disputeCategoryFilter);
  }, [disputeStatusFilter, disputeCategoryFilter]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Disputes</h2>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dispute_status_filter" className="block text-gray-700 font-medium mb-2">
              Filter by Dispute Status
            </label>
            <select
              id="dispute_status_filter"
              name="dispute_status_filter"
              value={disputeStatusFilter}
              onChange={(e) => setDisputeStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All</option>
              {disputeStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dispute_category_filter" className="block text-gray-700 font-medium mb-2">
              Filter by Dispute Category
            </label>
            <select
              id="dispute_category_filter"
              name="dispute_category_filter"
              value={disputeCategoryFilter}
              onChange={(e) => setDisputeCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All</option>
              {disputeCategories.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {disputes.map((dispute) => (
            <div key={dispute.order_id} className="group relative bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-700">Order ID: {dispute.order_id}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">Category: {dispute.dispute_category}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">Title: {dispute.dispute_title}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">Status: {dispute.dispute_status}</p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setCurrentDisputeId(dispute.dispute_id);
                  setUpdateDisputeStatusForm({ dispute_status: dispute.dispute_status, dispute_remarks: dispute.dispute_remarks });
                }}
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-custom-orange hover:bg-custom-orange rounded-lg"
              >
                Update Dispute Status
              </button>
            </div>
          ))}
        </div>
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
                <h2 className="text-2xl font-bold mb-6">Update Dispute Status</h2>
                <form onSubmit={handleUpdateStatusSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="dispute_status"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Dispute Status
                    </label>
                    <select
                      id="dispute_status"
                      name="dispute_status"
                      value={updateDisputeStatusForm.dispute_status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select</option>
                      {disputeStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dispute_remarks"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Dispute Remarks
                    </label>
                    <textarea
                      id="dispute_remarks"
                      name="dispute_remarks"
                      value={updateDisputeStatusForm.dispute_remarks}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows="4"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-custom-orange px-8 py-3 text-base font-medium text-white hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2"
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

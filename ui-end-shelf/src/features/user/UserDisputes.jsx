import React, { useState, useEffect } from "react";
import { getUserDisputes } from "../../api/loginapi";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

export default function UserDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [disputeStatusFilter, setDisputeStatusFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);

  const fetchUserDisputes = async (status) => {
    const user_id = localStorage.getItem("user_id");
    try {
      const data = await getUserDisputes(user_id, status);
      setDisputes(data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    }
  };

  useEffect(() => {
    fetchUserDisputes(disputeStatusFilter);
  }, [disputeStatusFilter]);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-6">My Disputes</h2>
        <div className="mb-4">
          <label
            htmlFor="dispute_status_filter"
            className="block text-gray-700 font-medium mb-2"
          >
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {disputes?.length ? (
            disputes.map((dispute) => (
              <div
                key={dispute.dispute_id}
                className="group relative bg-gray-100 p-4 rounded-lg shadow"
              >
                <h3 className="text-sm font-medium text-gray-700">
                  Order ID: {dispute.order_id}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Category: {dispute.dispute_category}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Title: {dispute.dispute_title}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Status: {dispute.dispute_status}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedDispute(dispute);
                  }}
                  className="mt-2 px-4 py-2 text-sm font-medium text-white bg-custom-orange hover:bg-custom-orange rounded-lg"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        {!disputes?.length && (
          <div className="nodata-wrapper d-flex justify-content-center px-5">
            <p className="px-8 py-2">No Disputes Found</p>
          </div>
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
                <h2 className="text-2xl font-bold mb-6">Dispute Details</h2>
                {selectedDispute && (
                  <>
                    <p>
                      <strong>Order ID:</strong> {selectedDispute.order_id}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedDispute.dispute_category}
                    </p>
                    <p>
                      <strong>Title:</strong> {selectedDispute.dispute_title}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedDispute.dispute_description}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedDispute.dispute_status}
                    </p>
                    {selectedDispute.dispute_remarks && (
                      <p>
                        <strong>Remarks:</strong>{" "}
                        {selectedDispute.dispute_remarks}
                      </p>
                    )}
                  </>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

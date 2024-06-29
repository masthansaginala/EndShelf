import React, { useEffect, useState } from "react";
import { getDisputesForAdmin } from "../api/admin";
import { toast } from "react-toastify";

export default function DisputesListAdmin() {
  const [disputes, setDisputes] = useState([]);

  const fetchDisputes = async () => {
    try {
      const data = await getDisputesForAdmin();
      setDisputes(data);
    } catch (error) {
      toast.error("Error fetching disputes");
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Disputes List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Dispute ID</th>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Remarks</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                <th className="py-2 px-4 border-b">Deleted At</th>
              </tr>
            </thead>
            <tbody>
              {disputes.length > 0 ? (
                disputes.map((dispute) => (
                  <tr key={dispute.dispute_id}>
                    <td className="py-2 px-4 border-b">{dispute.dispute_id}</td>
                    <td className="py-2 px-4 border-b">{dispute.order_id}</td>
                    <td className="py-2 px-4 border-b">{dispute.user_id}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_category}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_title}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_description}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_remarks || "N/A"}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_status}</td>
                    <td className="py-2 px-4 border-b">{new Date(dispute.dispute_created_at).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_updated_at ? new Date(dispute.dispute_updated_at).toLocaleDateString() : "N/A"}</td>
                    <td className="py-2 px-4 border-b">{dispute.dispute_delete_at ? new Date(dispute.dispute_delete_at).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="py-4 text-center">
                    No disputes found
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

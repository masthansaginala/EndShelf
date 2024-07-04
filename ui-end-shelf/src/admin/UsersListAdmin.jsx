import React, { useEffect, useState } from "react";
import { getUsersForAdmin } from "../api/admin";
import { toast } from "react-toastify";

export default function UsersListAdmin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsersForAdmin();
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-custom-focyell">
          Users List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border table-wrapper">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">DOB</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Zipcode</th>
                <th className="py-2 px-4 border-b">Organisation</th>
                <th className="py-2 px-4 border-b">Organisation Type</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.user_id}>
                    <td className="py-2 px-4 border-b">{user.user_id}</td>
                    <td className="py-2 px-4 border-b">
                      {user.user_full_name}
                    </td>
                    <td className="py-2 px-4 border-b">{user.user_dob}</td>
                    <td className="py-2 px-4 border-b">{user.user_gender}</td>
                    <td className="py-2 px-4 border-b">
                      {user.user_phone_number}
                    </td>
                    <td className="py-2 px-4 border-b">{user.user_email}</td>
                    <td className="py-2 px-4 border-b">{user.user_address}</td>
                    <td className="py-2 px-4 border-b">{user.user_city}</td>
                    <td className="py-2 px-4 border-b">{user.user_country}</td>
                    <td className="py-2 px-4 border-b">{user.user_zipcode}</td>
                    <td className="py-2 px-4 border-b">
                      {user.user_organisation}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.user_orgainsation_type}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="16" className="py-4 text-center">
                    No users found
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

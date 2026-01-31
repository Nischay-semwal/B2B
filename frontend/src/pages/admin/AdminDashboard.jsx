import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/orders")
      ]);

      setUsers(usersRes.data.users);
      setOrders(ordersRes.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyWholesaler = async (id) => {
    await api.patch(`/admin/wholesaler/${id}/approve`);
    fetchData();
  };

  const blockUser = async (id) => {
    await api.put(`/admin/users/${id}/block`);
    fetchData();
  };

  if (loading) return <p className="p-6">Loading admin data...</p>;

  return (
    <>
      <AdminNavbar />

      <div className="p-6 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">
                      {u.isBlocked ? "Blocked" : u.verificationStatus || "Active"}
                    </td>
                    <td className="p-2 space-x-2">
                      {u.role === "WHOLESALER" &&
                        u.verificationStatus !== "VERIFIED" && (
                          <button
                            onClick={() => verifyWholesaler(u._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded"
                          >
                            Verify
                          </button>
                        )}

                      {!u.isBlocked && (
                        <button
                          onClick={() => blockUser(u._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">All Orders</h2>

          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded p-4 shadow-sm"
              >
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Retailer:</b> {order.retailer?.name}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Total:</b> ₹{order.totalAmount}</p>
                <p><b>Items:</b></p>

                <ul className="list-disc ml-6">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} — {item.quantity} × ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;

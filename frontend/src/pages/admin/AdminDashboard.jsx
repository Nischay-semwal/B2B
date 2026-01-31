import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 p-8 space-y-8">
      <div className="h-8 w-48 bg-zinc-800 animate-pulse rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-40 bg-zinc-900 rounded-2xl border border-white/5 animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30">

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              User Directory
            </h2>
            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs text-zinc-400">
              {users.length} Total Users
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-bold text-zinc-400 tracking-tighter">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.isBlocked ? (
                        <span className="text-red-400 flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-red-400" /> Blocked
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-emerald-400" /> 
                          {u.verificationStatus || "Active"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {u.role === "WHOLESALER" && u.verificationStatus !== "VERIFIED" && (
                        <button
                          onClick={() => verifyWholesaler(u._id)}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Verify Account
                        </button>
                      )}
                      {!u.isBlocked && (
                        <button
                          onClick={() => blockUser(u._id)}
                          className="px-4 py-1.5 bg-zinc-800 hover:bg-red-900/40 hover:text-red-400 text-zinc-300 text-xs font-bold rounded-lg transition-all"
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
          <h2 className="text-xl font-semibold tracking-tight text-white mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            Recent Activity
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group relative border border-white/5 bg-zinc-900/40 p-5 rounded-2xl transition-all hover:border-white/10 hover:bg-zinc-900/60"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Order ID</span>
                    <p className="text-sm font-mono text-indigo-400 truncate max-w-[150px]">{order._id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Amount</span>
                    <p className="text-lg font-bold text-white">₹{order.totalAmount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold">
                    {order.retailer?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Retailer</p>
                    <p className="text-sm font-medium text-white">{order.retailer?.name}</p>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Order Manifest</p>
                  <ul className="space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-xs py-1 border-b border-white/[0.02] last:border-0">
                        <span className="text-zinc-300">{item.name} <span className="text-zinc-500">x{item.quantity}</span></span>
                        <span className="font-medium text-white">₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
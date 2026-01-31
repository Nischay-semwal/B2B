import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyDeliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    try {
      const res = await api.get("/orders/agent");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const markOutForDelivery = async (id) => {
    await api.post(`/orders/${id}/out-for-delivery`);
    fetchMyOrders();
  };

  const markDelivered = async (id) => {
    await api.post(`/orders/${id}/delivered`);
    fetchMyOrders();
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-32 bg-white/5 rounded-2xl" /></div>;

  return (
    <section className="space-y-6">
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-sm text-zinc-500 font-medium">No deliveries currently assigned to you.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm p-5 transition-all"
            >
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${order.status === 'DELIVERED' ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 italic">#{order._id.slice(-6)}</span>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Destination</p>
                <h3 className="text-md font-semibold text-white tracking-tight">{order.retailer.name}</h3>
              </div>

              <div className="mb-6 rounded-xl bg-black/20 p-3">
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">{item.name}</span>
                      <span className="font-mono text-indigo-400 font-bold">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                {order.status === "AGENT_ASSIGNED" && (
                  <button
                    onClick={() => markOutForDelivery(order._id)}
                    className="group flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-indigo-500 active:scale-[0.97]"
                  >
                    Start Delivery
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                )}

                {order.status === "OUT_FOR_DELIVERY" && (
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-500 active:scale-[0.97] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    Complete Drop-off
                  </button>
                )}

                {order.status === "DELIVERED" && (
                  <div className="flex items-center justify-center gap-2 py-2 text-emerald-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Transaction Finalized</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyDeliveries;
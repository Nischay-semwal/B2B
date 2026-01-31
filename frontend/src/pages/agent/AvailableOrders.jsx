import { useEffect, useState } from "react";
import api from "../../api/axios";

const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/available");
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    await api.post(`/orders/${orderId}/accept`);
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 w-full animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <section className="p-4">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-zinc-500">Scanning for nearby logistics...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/30 hover:bg-zinc-800/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">Priority Route</span>
                  <h3 className="text-sm font-bold text-white mt-1">{order.retailer.name}</h3>
                  <p className="text-[10px] font-mono text-zinc-500 truncate w-32">ID: {order._id.slice(-8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-white leading-none">₹{order.totalAmount}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Payout</p>
                </div>
              </div>

              {/* Minimalist Item List */}
              <div className="mb-5 flex flex-wrap gap-2">
                {order.items.map((item, idx) => (
                  <span 
                    key={idx}
                    className="flex items-center gap-1.5 rounded-md bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-zinc-300 border border-white/5"
                  >
                    <span className="h-1 w-1 rounded-full bg-zinc-500" />
                    {item.quantity} × {item.name}
                  </span>
                ))}
              </div>

              <button
                onClick={() => acceptOrder(order._id)}
                className="w-full relative overflow-hidden rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Accept Delivery Opportunity
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableOrders;
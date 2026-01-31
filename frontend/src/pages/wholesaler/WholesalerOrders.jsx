import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const WholesalerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/wholesaler");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 w-full animate-pulse rounded-2xl bg-white/[0.03]" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Inventory Requests
        </h2>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="py-10 text-center rounded-2xl border border-dashed border-white/5 bg-zinc-900/10">
            <p className="text-xs text-zinc-600 font-medium">No active outgoing stock requests</p>
          </div>
        ) : (
          orders.map((order) => {
            const myItems = order.items.filter((item) => {
              const wholesalerId =
                typeof item.wholesaler === "object"
                  ? item.wholesaler._id
                  : item.wholesaler;

              return wholesalerId === user._id;
            });

            if (myItems.length === 0) return null;

            return (
              <div 
                key={order._id} 
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-5 transition-all hover:bg-zinc-900/60 hover:border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    order.status === 'DELIVERED' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {order.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Requesting Retailer</p>
                  <h3 className="text-sm font-semibold text-zinc-200">{order.retailer?.name || "Unknown Entity"}</h3>
                </div>

                <div className="space-y-2 border-t border-white/[0.03] pt-4">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Stock Out</p>
                  <div className="flex flex-wrap gap-2">
                    {myItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1.5 border border-white/5"
                      >
                        <span className="text-xs font-medium text-zinc-300">{item.name}</span>
                        <div className="h-3 w-[1px] bg-white/10" />
                        <span className="text-xs font-bold text-indigo-400">{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute left-0 top-0 h-full w-[2px] bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default WholesalerOrders;
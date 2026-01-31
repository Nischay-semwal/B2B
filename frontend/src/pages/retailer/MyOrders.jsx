import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/retailer");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="space-y-6 p-6">
      {[1, 2].map(i => <div key={i} className="h-48 bg-zinc-900/50 animate-pulse rounded-3xl" />)}
    </div>
  );

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Purchase History</h2>
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1">Track your active and past restocks</p>
        </div>
        <div className="h-10 w-10 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center">
          <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/5 bg-zinc-900/20">
            <p className="text-zinc-500 font-medium">No orders found in your history.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div 
              key={order._id} 
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all hover:bg-zinc-900/50"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      order.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 animate-pulse'
                    }`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200">{item.name}</span>
                        <span className="text-xs text-zinc-500">{item.quantity} Units</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:text-right flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">Total Paid</p>
                    <p className="text-2xl font-black text-white leading-none">₹{order.totalAmount}</p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-1">
                    {[1, 2, 3].map((step) => {
                      const isActive = (order.status === 'DELIVERED') || 
                                     (order.status === 'OUT_FOR_DELIVERY' && step <= 2) || 
                                     (order.status === 'AGENT_ASSIGNED' && step <= 1);
                      return (
                        <div 
                          key={step} 
                          className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                            isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-zinc-800'
                          }`} 
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyOrders;
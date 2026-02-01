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
      {[1, 2, 3].map(i => (
        <div key={i} className="h-44 bg-zinc-900/40 animate-pulse rounded-[2rem] border border-white/5" />
      ))}
    </div>
  );

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-white">Logistics <span className="text-zinc-700">Vault</span></h2>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" />
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Transaction & Fulfillment History</p>
          </div>
        </div>
        <div className="hidden sm:flex h-12 w-12 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-help">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border border-dashed border-white/5 bg-zinc-900/10">
            <div className="h-12 w-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 text-zinc-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest">Archive Empty</p>
          </div>
        ) : (
          orders.map((order) => (
            <div 
              key={order._id} 
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-sm p-8 transition-all hover:bg-zinc-900/40 hover:border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/10">
                      ID: {order._id.slice(-8).toUpperCase()}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                      order.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-10 gap-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-zinc-800/50 flex items-center justify-center text-[10px] font-black text-zinc-500 border border-white/5">
                          {item.quantity}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white tracking-tight">{item.name}</span>
                          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">SKU-Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-6 sm:gap-20 lg:gap-4 lg:text-right border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Settlement Amount</p>
                    <p className="text-3xl font-black text-white tracking-tighter">
                      <span className="text-zinc-600 mr-1 text-xl">₹</span>
                      {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-full border border-white/5 w-fit">
                    {[1, 2, 3].map((step) => {
                      const isActive = (order.status === 'DELIVERED') || 
                                     (order.status === 'OUT_FOR_DELIVERY' && step <= 2) || 
                                     (order.status === 'AGENT_ASSIGNED' && step <= 1);
                      return (
                        <div 
                          key={step} 
                          className={`h-2 w-8 rounded-full transition-all duration-700 ease-out ${
                            isActive 
                            ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' 
                            : 'bg-zinc-800'
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
import PlaceOrder from "./PlaceOrder";
import MyOrders from "./MyOrders";

const RetailerDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="relative mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[1px] w-8 bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                Supply Chain Management
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white md:text-6xl">
              Retailer <span className="text-zinc-600">Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Inventory Status</p>
              <p className="text-sm font-semibold text-emerald-400">Synchronized</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-[120px]" />
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-indigo-500/20 to-transparent opacity-50 blur-xl" />
              <div className="relative">
                <PlaceOrder />
              </div>
            </div>
            
            <div className="mt-8 rounded-3xl border border-white/5 bg-zinc-900/20 p-6 text-center">
              <p className="text-xs leading-relaxed text-zinc-500">
                Need bulk support? <span className="text-indigo-400 underline underline-offset-4 cursor-pointer">Contact Wholesaler Direct</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between px-2">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                Active Requisitions
              </h2>
              <div className="h-[1px] flex-1 mx-4 bg-white/5" />
            </div>
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
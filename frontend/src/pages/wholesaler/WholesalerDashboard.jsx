import StockManager from "./StockManager";
import WholesalerOrders from "./WholesalerOrders";

const WholesalerDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -left-[5%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            </span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Operational Logistics Interface
            </p>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">
            Wholesaler <span className="text-zinc-700">Executive</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          {/* Main Stock Inventory Section */}
          <div className="xl:col-span-8 group">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-[1px] bg-indigo-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">
                  Inventory Asset Management
                </h2>
              </div>
              <div className="h-[1px] flex-1 mx-6 bg-white/5" />
            </div>
            <StockManager />
          </div>

          {/* Sidebar Orders Section */}
          <div className="xl:col-span-4 space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-[1px] bg-emerald-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                  Recent Requisitions
                </h2>
              </div>
              <div className="h-[1px] flex-1 ml-4 bg-white/5" />
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-2 rounded-[2.5rem] bg-emerald-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative rounded-[2.5rem] border border-white/5 bg-zinc-900/40 p-2 backdrop-blur-sm shadow-2xl">
                <WholesalerOrders />
              </div>
            </div>

            {/* Logistics Card */}
            <div className="rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 shadow-xl">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Logistics Quickview</h3>
              <div className="space-y-4 font-medium">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Active Shipments</span>
                  <span className="text-white bg-zinc-800 px-2 py-0.5 rounded">12</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Pending Pickup</span>
                  <span className="text-amber-500">04 Orders</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WholesalerDashboard;
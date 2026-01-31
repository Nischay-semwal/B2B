import StockManager from "./StockManager";
import WholesalerOrders from "./WholesalerOrders";

const WholesalerDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -left-[5%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Enterprise Resource Planning
              </p>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Wholesaler <span className="text-zinc-700">Executive</span>
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Stock Health</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-indigo-500 to-emerald-500" />
                </div>
                <span className="text-xs font-bold text-white tracking-tight">88% Optimal</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          <div className="xl:col-span-8 group">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">
                Inventory & Stock Control
              </h2>
              <div className="h-[1px] flex-1 mx-6 bg-white/5" />
            </div>
            <div className="rounded-[2.5rem] bg-zinc-900/20 border border-white/5 p-2 transition-all hover:bg-zinc-900/30">
              <StockManager />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                Incoming Requisitions
              </h2>
              <div className="h-[1px] flex-1 ml-4 bg-white/5" />
            </div>
            
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-emerald-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-3xl border border-white/5 bg-zinc-900/40 p-4 shadow-2xl backdrop-blur-sm">
                <WholesalerOrders />
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6 shadow-xl">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Logistics Quickview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Active Shipments</span>
                  <span className="text-xs font-bold text-white">12</span>
                </div>
                <div className="h-[1px] bg-white/5 w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Pending Pickup</span>
                  <span className="text-xs font-bold text-amber-500 underline underline-offset-4">4 Orders</span>
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
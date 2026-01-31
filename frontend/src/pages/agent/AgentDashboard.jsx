import AvailableOrders from "./AvailableOrders";
import MyDeliveries from "./MyDeliveries";

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <header className="border-b border-white/5 bg-zinc-900/20 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Operational Status: Active
            </p>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            Agent <span className="text-zinc-500">Dashboard</span>
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                Available Logistics
              </h2>
              <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 border border-white/5 rounded-md bg-white/[0.02]">
                Real-time Updates
              </span>
            </div>
            
            <div className="rounded-2xl bg-zinc-900/40 p-1 border border-white/5 backdrop-blur-sm shadow-2xl">
              <AvailableOrders />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                Your Deliveries
              </h2>
              <div className="flex gap-1">
                <div className="h-1 w-4 rounded-full bg-indigo-500/40" />
                <div className="h-1 w-1 rounded-full bg-indigo-500/40" />
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.02] p-6">
              <MyDeliveries />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 p-6 shadow-xl">
              <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3">Performance Tip</h3>
              <p className="text-sm text-zinc-500 leading-relaxed italic">
                "Fastest delivery times are recorded between 10 AM and 2 PM. Ensure signatures are captured for all wholesale orders."
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
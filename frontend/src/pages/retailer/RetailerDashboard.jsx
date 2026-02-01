import MyOrders from "./MyOrders";
import RetailerProductList from "./RetailerProductList";
import { Link } from "react-router-dom";

const RetailerDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="relative mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[1px] w-8 bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                Supply Chain Intelligence
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white md:text-6xl">
              Retailer <span className="text-zinc-600">Hub</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/retailer/cart"
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-zinc-950 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Cart
            </Link>
          </div>
          
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-[120px]" />
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-b from-indigo-500/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm">
                <h2 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Market Explorer</h2>
                <div className="mb-8">
                  <RetailerProductList />
                </div>
                <Link 
                  to='/retailer/products'
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white hover:bg-white/10 transition-all group/link"
                >
                  Browse Full Catalog
                  <svg className="h-5 w-5 text-indigo-400 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-8 text-center transition-colors hover:bg-zinc-900/40">
              <p className="text-xs leading-relaxed text-zinc-500 mb-4">
                Operating within the <span className="text-white font-bold tracking-tight">Enterprise Tier</span>. Need bulk support?
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 border-b border-indigo-500/30 pb-1 hover:text-indigo-300 transition-colors">
                Contact Wholesaler Direct
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Active Requisitions
                </h2>
              </div>
              <div className="h-[1px] flex-1 mx-6 bg-white/5" />
            </div>
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.1)] border border-red-500/20">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Access <span className="text-red-500">Denied</span>
          </h1>
          
          <div className="mx-auto h-[1px] w-12 bg-zinc-800" />
          
          <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
            You do not have the security clearance required to view this terminal.
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-zinc-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/5 transition-all hover:bg-zinc-800 hover:border-white/10 active:scale-95"
          >
            <svg className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Portal
          </button>
        </div>

        <div className="mt-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">
            Error Code: 403_RESTRICTED_AUTH
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
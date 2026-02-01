import FloatingCartBar from "../../components/FloatingCartBar";
import ProductList from "../../components/ProductList";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <nav className="mb-10">
          <Link 
            to="/retailer/dashboard" 
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Dashboard
          </Link>
        </nav>

        <div className="rounded-[3rem] border border-white/5 bg-zinc-900/10 p-8 shadow-2xl backdrop-blur-sm">
           <ProductList />
        </div>

        <FloatingCartBar/>
      </div>
    </div>
  );
};

export default ProductListPage;
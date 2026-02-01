import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/stock/available");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="aspect-[4/5] bg-zinc-900/50 animate-pulse rounded-[2rem] border border-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-white">
            Market <span className="text-zinc-700">Stock</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Available Requisitions
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div
            key={p._id}
            className="group relative flex flex-col rounded-[2.5rem] border border-white/5 bg-zinc-900/30 p-3 transition-all duration-500 hover:bg-zinc-900/60 hover:border-white/10 hover:-translate-y-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-zinc-800">
              <img
                src={
                  p.image
                    ? p.image.startsWith('/uploads')
                      ? `http://localhost:5000${p.image}`
                      : `http://localhost:5000/uploads/${p.image}`
                    : "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80"
                }
                alt={p.productName}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-black text-white">
                  <span className="text-xs text-zinc-400 mr-0.5">₹</span>
                  {p.pricePerUnit}
                </p>
              </div>
            </div>

            <div className="mt-4 px-2 pb-2 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-white truncate pr-2">
                  {p.productName}
                </h3>
                <span
                  className={`text-[9px] font-black uppercase ${p.quantity > 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {p.quantity > 0 ? "Instock" : "Out"}
                </span>
              </div>

              <button
                disabled={p.quantity <= 0}
                onClick={() => addToCart(p)}
                className={`mt-auto rounded-2xl py-3 text-xs font-black uppercase tracking-widest transition-all ${p.quantity > 0
                    ? "bg-white text-zinc-950 hover:bg-indigo-500 hover:text-white"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import { useEffect, useState } from "react";
import api from "../../api/axios";

const RetailerProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/stock/available");
      setProducts(res.data.data?.slice(0, 2) || []);
    } catch (err) {
      setError("Unable to sync market data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="grid grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="aspect-square bg-white/5 rounded-3xl" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((item) => (
        <div
          key={item._id}
          className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/40 p-2 transition-all hover:bg-zinc-900/80"
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-zinc-800">
            <img
              src={item.image ? (item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : `http://localhost:5000/uploads/${item.image}`) : "https://via.placeholder.com/300"}
              alt={item.productName}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=300&q=80" }}
            />
          </div>

          {/* Minimal Info - No Buttons */}
          <div className="mt-3 px-2 pb-1 text-center md:text-left">
            <h3 className="text-[10px] font-bold text-white tracking-tight truncate uppercase opacity-80 group-hover:opacity-100 transition-opacity">
              {item.productName}
            </h3>
            <p className="text-xs font-black text-indigo-400 mt-0.5">
              ₹{item.pricePerUnit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RetailerProductList;
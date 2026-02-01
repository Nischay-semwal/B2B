import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";

const StockManager = () => {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    pricePerUnit: "",
    quantity: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const fetchStock = async () => {
    try {
      const res = await api.get("/stock");
      setStock(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addStock = async () => {
    if (!form.productName || !form.pricePerUnit || !form.quantity) return;

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("pricePerUnit", form.pricePerUnit);
    formData.append("quantity", form.quantity);
    formData.append("category", "General");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await api.post("/stock", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setForm({ productName: "", pricePerUnit: "", quantity: "" });
      setSelectedFile(null);
      fetchStock();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const updateStock = async (id, updates) => {
    await api.put(`/stock/${id}`, updates);
    fetchStock();
  };

  const deleteStock = async (id) => {
    await api.delete(`/stock/${id}`);
    fetchStock();
  };

  if (loading) return <div className="p-10 animate-pulse text-zinc-500">Accessing Vault...</div>;

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-zinc-900/40 p-8 backdrop-blur-xl shadow-2xl">
        <header className="mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Inventory Initialization</h3>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Register new assets to the centralized ledger</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            className="bg-zinc-800/50 px-5 py-4 text-sm text-white outline-none rounded-2xl border border-white/5 focus:border-indigo-500/50 transition-all placeholder:text-zinc-700"
            placeholder="Product Designation"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
          <input
            className="bg-zinc-800/50 px-5 py-4 text-sm text-white outline-none rounded-2xl border border-white/5 focus:border-indigo-500/50 transition-all placeholder:text-zinc-700 font-mono"
            placeholder="Unit Price (₹)"
            type="number"
            value={form.pricePerUnit}
            onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
          />
          <input
            className="bg-zinc-800/50 px-5 py-4 text-sm text-white outline-none rounded-2xl border border-white/5 focus:border-indigo-500/50 transition-all placeholder:text-zinc-700 font-mono"
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className={`flex-1 flex items-center justify-center gap-2 rounded-2xl border border-dashed transition-all text-[10px] font-black uppercase tracking-widest ${selectedFile
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 bg-zinc-800/30 text-zinc-500 hover:border-indigo-500/50 hover:text-indigo-400'
                }`}
            >
              {selectedFile ? 'Image Ready' : 'Upload Image'}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>

            <button
              onClick={addStock}
              className="flex h-14 w-14 items-center justify-center bg-white text-zinc-950 rounded-2xl transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-xl shadow-white/5"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stock.map((s) => (
          <div key={s._id} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-sm p-2 transition-all hover:bg-zinc-900/40 hover:border-white/10">
            <div className="relative h-48 overflow-hidden rounded-[2rem]">
              <img
                src={
                  s.image
                    ? s.image.startsWith('/uploads')
                      ? `http://localhost:5000${s.image}`
                      : `http://localhost:5000/uploads/${s.image}`
                    : "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80"
                }
                alt={s.productName}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => deleteStock(s._id)}
                  className="h-8 w-8 rounded-xl bg-red-500/10 text-red-500 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{s.productName}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mt-1 font-mono tracking-tighter">₹{s.pricePerUnit}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${s.quantity < 10 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                    {s.quantity} UNITS
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStock(s._id, { quantity: s.quantity + 1 })}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:bg-white/10 hover:text-white transition-all"
                >
                  Increment
                </button>
                <button
                  onClick={() => updateStock(s._id, { quantity: Math.max(0, s.quantity - 1) })}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500 transition-all"
                >
                  Decrement
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockManager;
import { useEffect, useState } from "react";
import api from "../../api/axios";

const StockManager = () => {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    pricePerUnit: "",
    quantity: "",
    category: ""
  });
  const [loading, setLoading] = useState(true);

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

  const addStock = async () => {
    await api.post("/stock", {
      ...form,
      pricePerUnit: Number(form.pricePerUnit),
      quantity: Number(form.quantity)
    });
    setForm({ productName: "", pricePerUnit: "", quantity: "", category: "" });
    fetchStock();
  };

  const updateStock = async (id, updates) => {
    await api.put(`/stock/${id}`, updates);
    fetchStock();
  };

  const deleteStock = async (id) => {
    await api.delete(`/stock/${id}`);
    fetchStock();
  };

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-12 bg-white/5 rounded-2xl w-full" />
      <div className="h-64 bg-white/5 rounded-2xl w-full" />
    </div>
  );

  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/30 p-1 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-center gap-2 p-2">
          <div className="flex flex-1 items-center gap-2 w-full">
            <input
              className="w-full bg-zinc-800/50 px-4 py-3 text-sm text-white outline-none rounded-xl border border-transparent focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Product Name"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />
            <input
              className="w-24 bg-zinc-800/50 px-4 py-3 text-sm text-white outline-none rounded-xl border border-transparent focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Price"
              type="number"
              value={form.pricePerUnit}
              onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
            />
          </div>
          <div className="flex flex-1 items-center gap-2 w-full">
            <input
              className="w-24 bg-zinc-800/50 px-4 py-3 text-sm text-white outline-none rounded-xl border border-transparent focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Qty"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <input
              className="w-full bg-zinc-800/50 px-4 py-3 text-sm text-white outline-none rounded-xl border border-transparent focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <button
              onClick={addStock}
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              <th className="px-6 py-5">Inventory Item</th>
              <th className="px-6 py-5">Unit Price</th>
              <th className="px-6 py-5 text-center">In Stock</th>
              <th className="px-6 py-5 text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {stock.map((s) => (
              <tr key={s._id} className="group transition-colors hover:bg-white/[0.01]">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">{s.productName}</span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-tighter">{s.category || 'General'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-zinc-300">₹{s.pricePerUnit}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    s.quantity < 10 ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {s.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => updateStock(s._id, { quantity: s.quantity + 1 })}
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-indigo-500 transition-all"
                      title="Increment Quantity"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteStock(s._id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all"
                      title="Delete Item"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StockManager;
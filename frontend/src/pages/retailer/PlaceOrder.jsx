import { useState } from "react";
import api from "../../api/axios";

const PlaceOrder = () => {
  const [items, setItems] = useState([{ name: "", quantity: "" }]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        items: items.map(i => ({
          name: i.name,
          quantity: Number(i.quantity)
        }))
      });
      alert("Order placed successfully");
      setItems([{ name: "", quantity: "" }]);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <section className="max-w-3xl mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Create Requisition</h2>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mt-1">Add items to your wholesale order</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all focus-within:border-indigo-500/50 focus-within:bg-white/[0.04]">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1 ml-1">Product Name</label>
              <input
                placeholder="e.g. Premium Basmati"
                className="w-full bg-transparent px-1 py-1 text-sm font-medium text-white outline-none placeholder:text-zinc-700"
                value={item.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
              />
            </div>
            <div className="w-full sm:w-32">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1 ml-1">Quantity</label>
              <input
                placeholder="0"
                type="number"
                className="w-full bg-transparent px-1 py-1 text-sm font-bold text-indigo-400 outline-none placeholder:text-zinc-700"
                value={item.quantity}
                onChange={(e) => updateItem(idx, "quantity", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button 
          onClick={addItem} 
          className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 transition-colors group-hover:border-white">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          Add Another Line
        </button>

        <button
          onClick={placeOrder}
          className="w-full sm:w-auto relative overflow-hidden rounded-2xl bg-white px-10 py-4 text-sm font-bold text-zinc-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
        >
          <span className="relative z-10">Confirm & Place Order</span>
        </button>
      </div>
    </section>
  );
};

export default PlaceOrder;
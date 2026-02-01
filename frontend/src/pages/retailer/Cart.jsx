import { useCart } from "../../context/CartContext";
import api from "../../api/axios";

const Cart = () => {
  const { cart, updateQty, removeItem, clearCart } = useCart();

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        items: cart.map(i => ({
          name: i.name,          
          quantity: i.quantity
        }))
      });

      clearCart();
      alert("Order placed successfully");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-zinc-700 border border-white/5">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-500">Your shopping bag is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Your Requisition</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            {cart.length} Items
          </span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {cart.map(i => (
          <div
            key={i.stockId}
            className="group flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-zinc-200 truncate">{i.name}</p>
              <button
                onClick={() => removeItem(i.stockId)}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors mt-1"
              >
                Remove Item
              </button>
            </div>

            <div className="flex items-center bg-zinc-900 rounded-xl border border-white/5 p-1">
              <button
                onClick={() => updateQty(i.stockId, Math.max(1, i.quantity - 1))}
                className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                −
              </button>
              
              <span className="w-8 text-center text-xs font-black text-white">
                {i.quantity}
              </span>

              <button
                onClick={() => updateQty(i.stockId, i.quantity + 1)}
                className="h-8 w-8 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-white/5 bg-white/[0.02]">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
            <span>Subtotal Estimate</span>
            <span className="text-white text-base font-black">
              ₹{cart.reduce((acc, i) => acc + (i.price || 0) * i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={placeOrder}
            className="relative group w-full overflow-hidden rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Confirm & Place Order
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
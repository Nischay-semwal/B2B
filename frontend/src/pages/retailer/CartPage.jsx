import { useCart } from "../../context/CartContext";
import api from "../../api/axios";
import { useState } from "react";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (cartItems.length === 0) return;
    try {
      setLoading(true);
      await api.post("/orders", {
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity
        }))
      });
      clearCart();
      alert("Order placed successfully");
    } catch (err) {
      alert(err?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter text-white">Review <span className="text-zinc-600">Cart</span></h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">Finalize your requisition items</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="rounded-[2.5rem] border border-dashed border-white/5 bg-zinc-900/10 py-20 text-center">
            <p className="text-zinc-500 font-medium italic">Your inventory selection is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.stockId}
                  className="group flex justify-between items-center bg-zinc-900/40 border border-white/5 p-6 rounded-3xl transition-all hover:bg-zinc-900/60 hover:border-white/10"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/20">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">
                        Unit Price: ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="text-sm font-black text-zinc-300 italic">₹{item.quantity * item.price}</p>
                    <button
                      onClick={() => removeFromCart(item.stockId)}
                      className="p-2 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 sticky top-8">
              <div className="rounded-[2.5rem] bg-zinc-900 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-16 -mt-16" />
                
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 border-b border-white/5 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-500 uppercase">Items Total</span>
                    <span className="text-zinc-300">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-500 uppercase">Tax & Surcharge</span>
                    <span className="text-emerald-500">₹0.00</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Grand Total</span>
                    <span className="text-2xl font-black text-indigo-400">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full relative overflow-hidden rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {loading ? "Authorizing..." : "Submit Order"}
                  </span>
                </button>
                
                <p className="text-center text-[9px] font-bold text-zinc-600 mt-6 uppercase tracking-widest">
                  Secure Business-to-Business Transaction
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
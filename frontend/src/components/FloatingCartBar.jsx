import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FloatingCartBar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-bottom-10 duration-500">
      <div 
        onClick={() => navigate("/retailer/cart")}
        className="flex items-center justify-between bg-indigo-600 p-4 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] cursor-pointer hover:bg-indigo-500 transition-all active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 h-10 w-10 rounded-xl flex items-center justify-center text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">View Shopping Bag</p>
            <p className="text-sm font-bold text-white">{totalItems} Items Selected</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-black text-white italic">₹{totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingCartBar;
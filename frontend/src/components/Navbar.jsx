import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-8 py-4 text-zinc-100 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        <span className="text-sm font-medium tracking-widest uppercase text-zinc-400">
          {user.role} <span className="text-zinc-100">Portal</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center overflow-hidden rounded-full bg-zinc-100 px-6 py-1.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-red-500 hover:text-white active:scale-95"
        >
          <span className="relative z-10">Logout</span>
          <div className="absolute inset-0 z-0 translate-y-full bg-red-600 transition-transform duration-300 group-hover:translate-y-0" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
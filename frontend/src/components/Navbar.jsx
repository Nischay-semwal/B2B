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
    <nav className="flex items-center justify-between bg-gray-900 px-6 py-3 text-white">
      <span className="font-semibold">
        {user.role} Dashboard
      </span>

      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-1.5 hover:bg-red-500"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

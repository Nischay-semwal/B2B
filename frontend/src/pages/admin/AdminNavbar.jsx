import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;

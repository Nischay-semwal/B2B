import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/UnauthorizedPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import WholesalerDashboard from "./pages/wholesaler/WholesalerDashboard";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";

import Navbar from "./components/Navbar";

import CartPage from "./pages/retailer/CartPage";
import ProductListPage from "./pages/retailer/ProductListPage"; 

function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["WHOLESALER"]} />}>
          <Route path="/wholesaler/dashboard" element={<WholesalerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["RETAILER"]} />}>
          <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
          <Route path="/retailer/cart" element={<CartPage />} />
          <Route path="/retailer/products" element={<ProductListPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
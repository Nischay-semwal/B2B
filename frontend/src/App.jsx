import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import WholesalerDashboard from "./pages/wholesaler/WholesalerDashboard";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";
import Unauthorized from "./pages/UnauthorizedPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Navigate to ='/login' replace/>}/>
      

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["WHOLESALER"]} />}>
        <Route path="/wholesaler/dashboard" element={<WholesalerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["RETAILER"]} />}>
        <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
}

export default App;

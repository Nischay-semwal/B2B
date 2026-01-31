import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "RETAILER",
    shopName: "",
    phone: "",
    latitude: null,
    longitude: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => reject("Location permission is required to register")
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const location = await getLocation();

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone,
        latitude: location.latitude,
        longitude: location.longitude
      };

      // ✅ only retailer has shopName
      if (form.role === "RETAILER") {
        payload.shopName = form.shopName;
      }

      await api.post("/auth/register", payload);
      navigate("/login");
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 mb-3"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-2 mb-3"
          value={form.role}
          onChange={handleChange}
        >
          <option value="RETAILER">Retailer</option>
          <option value="WHOLESALER">Wholesaler</option>
          <option value="AGENT">Delivery Agent</option>
        </select>

        {form.role === "RETAILER" && (
          <input
            name="shopName"
            placeholder="Shop Name"
            className="w-full border p-2 mb-3"
            value={form.shopName}
            onChange={handleChange}
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;

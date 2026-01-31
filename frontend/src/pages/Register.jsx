import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-xl">
        <div className="rounded-[2.5rem] border border-white/5 bg-zinc-900/40 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              Already have a portal access?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
                Sign in here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold uppercase tracking-widest text-red-400 animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Full Name</label>
                <input
                  name="name"
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="group">
                <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Phone</label>
                <input
                  name="phone"
                  placeholder="+91 ..."
                  className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="group">
              <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="office@business.com"
                className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Security Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Account Role</label>
                <select
                  name="role"
                  className="w-full appearance-none rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all cursor-pointer"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="RETAILER">Retailer</option>
                  <option value="WHOLESALER">Wholesaler</option>
                  <option value="AGENT">Delivery Agent</option>
                </select>
              </div>

              {form.role === "RETAILER" && (
                <div className="group animate-in slide-in-from-right-4 duration-300">
                  <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Shop Name</label>
                  <input
                    name="shopName"
                    placeholder="Global Traders"
                    className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-all"
                    value={form.shopName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-2xl bg-white py-4 text-sm font-bold text-zinc-950 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-950" />
                  Requesting Access...
                </span>
              ) : (
                "Initialize Registration"
              )}
            </button>
            
            <p className="text-center text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
              Location verification required for activation
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
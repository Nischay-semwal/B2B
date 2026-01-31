import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case "ADMIN":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "WHOLESALER":
          navigate("/wholesaler/dashboard", { replace: true });
          break;
        case "RETAILER":
          navigate("/retailer/dashboard", { replace: true });
          break;
        case "AGENT":
          navigate("/agent/dashboard", { replace: true });
          break;
        default:
          navigate("/unauthorized", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-indigo-400/30 animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-[2.5rem] border border-white/5 bg-zinc-900/40 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              New here?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
                Request an account
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="animate-shake rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold uppercase tracking-widest text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="group relative">
                <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none ring-indigo-500/20 transition-all focus:border-indigo-500/50 focus:ring-4 placeholder:text-zinc-700"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="group relative">
                <label className="mb-1 ml-1 block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                  Secure Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border border-white/5 bg-zinc-800/50 p-4 text-sm text-white outline-none ring-indigo-500/20 transition-all focus:border-indigo-500/50 focus:ring-4 placeholder:text-zinc-700"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full overflow-hidden rounded-2xl bg-white py-4 text-sm font-bold text-zinc-950 transition-all active:scale-[0.98] ${
                isSubmitting ? "opacity-70 cursor-wait" : "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              }`}
            >
              <span className="relative z-10">
                {isSubmitting ? "Verifying Credentials..." : "Sign in to Portal"}
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-zinc-100 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Protected by Enterprise Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
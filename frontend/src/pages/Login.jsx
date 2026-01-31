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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Login to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border p-2"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border p-2"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md bg-blue-600 py-2 text-white ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

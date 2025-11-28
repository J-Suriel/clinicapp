import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { api } from "../../api";

export default function LoginPage({ me, setMe }) {
  const [role, setRole] = useState("user"); // "user" or "staff"
  const isUser = role === "user";
  const isStaff = role === "staff";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 Call backend login
      const user = await api("/api/auth/login", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
          role, // optional
        },
      });

      // 🔹 Update AppRouter's user state
      setMe(user);

      // 🔹 Redirect based on role
      if (user.role === "doctor") {
        navigate("/doctor/dashboard", { replace: true });
      } else {
        navigate("/patient/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-section">
      <div className="login-card">

        {/* Role Toggle */}
        <div className="role-toggle text-center mb-3">
          <button
            type="button"
            className={`role-button ${isUser ? "active" : ""}`}
            onClick={() => setRole("user")}
          >
            User Login
          </button>
          <button
            type="button"
            className={`role-button ${isStaff ? "active" : ""}`}
            onClick={() => setRole("staff")}
          >
            Staff Login
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 style={{ color: "var(--primary-color)" }}>
            {isUser ? "User Login" : "Staff Login"}
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            {isUser
              ? "Log in to manage your clinic appointments."
              : "Staff: log in to manage schedules and patient bookings."}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              {isStaff ? "Staff Email" : "Email Address"}
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder={
                isStaff ? "Enter your staff email" : "Enter your email"
              }
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading
              ? "Logging in..."
              : isUser
              ? "Login as User"
              : "Login as Staff"}
          </button>
        </form>

        {/* Create Account (Users Only) */}
        {isUser && (
          <div className="text-center mt-3">
            <p style={{ color: "var(--text-secondary)" }}>
              Don’t have an account?
            </p>
            <Link to="/create-account" className="btn btn-outline-primary">
              Create Account
            </Link>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-3">
          <Link to="/" style={{ color: "var(--primary-color)" }}>
            ← Back to Welcome Page
          </Link>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";
import { api } from "../../api"; // keep this

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    insuranceCard: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // ✅ pass a plain JS object; api() will JSON.stringify for us
      await api("/api/auth/register", {
        method: "POST",
        body: {
          // backend actually only requires email + password:
          email: form.email,
          password: form.password,

          // extra fields are okay; you can wire them up later in auth.js
          firstName: form.firstName,
          lastName: form.lastName,
          dob: form.dob,
          insuranceCard: form.insuranceCard,
        },
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="text-center mb-4">
          <h2 style={{ color: "var(--primary-color)" }}>Create Account</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Fill out the form below to create your clinic account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="name-row" style={{ display: "flex", gap: "1rem" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter your first name"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3" style={{ flex: 1 }}>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Enter your last name"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              required
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          {/* Insurance Card Number */}
          <div className="mb-3">
            <label className="form-label">Insurance Card Number</label>
            <input
              type="text"
              name="insuranceCard"
              className="form-control"
              placeholder="Enter your insurance card number"
              required
              value={form.insuranceCard}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p style={{ color: "var(--text-secondary)" }}>
            Already have an account?
          </p>
          <Link to="/login" className="btn btn-outline-primary">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

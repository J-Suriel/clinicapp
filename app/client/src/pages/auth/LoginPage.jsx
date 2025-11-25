import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";


export default function LoginPage() {
  const [role, setRole] = useState("user"); // "user" or "staff"

  const isUser = role === "user";
  const isStaff = role === "staff";

  return (
    <section className="login-section">
      <div className="login-card">
        {/* Role toggle buttons */}
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

        {/* Login form */}
        <form>
          <div className="mb-3">
            <label className="form-label">
              {isStaff ? "Staff Email" : "Email Address"}
            </label>
            <input
              type="email"
              className="form-control"
              placeholder={
                isStaff ? "Enter your staff email" : "Enter your email"
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* You could also send the role to backend later */}
          {/* <input type="hidden" value={role} /> */}

          <button type="submit" className="btn btn-primary w-100">
            {isUser ? "Login as User" : "Login as Staff"}
          </button>
        </form>

        {/* Only show Create Account for user login */}
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

        {/* Back to home link (optional) */}
        <div className="text-center mt-3">
          <Link to="/" style={{ color: "var(--primary-color)" }}>
            ← Back to Welcome Page
          </Link>
        </div>
      </div>
    </section>
  );
}

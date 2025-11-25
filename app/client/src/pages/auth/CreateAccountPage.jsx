import React from "react";
import { Link } from "react-router-dom";
import "./CreateAccountPage.css";


export default function CreateAccountPage() {
  return (
    <section className="login-section">
      <div className="login-card">
        <div className="text-center mb-4">
          <h2 style={{ color: "var(--primary-color)" }}>Create Account</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Fill out the form below to create your clinic account.
          </p>
        </div>

        <form>
          {/* First and Last Name */}
          <div className="name-row" style={{ display: "flex", gap: "1rem" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="mb-3" style={{ flex: 1 }}>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              required
            />
          </div>

          {/* Insurance Card Number */}
          <div className="mb-3">
            <label className="form-label">Insurance Card Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your insurance card number"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Account
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

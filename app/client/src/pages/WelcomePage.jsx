import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css"; // <-- add this import

export default function WelcomePage() {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <div className="text-header">
          <h1 className="welcome-title">Clinic Appointment Booking</h1>
          <p className="welcome-subtitle">
            Book your appointments easily, anytime, anywhere. Our clinic is
            dedicated to providing high-quality care in a clean and comfortable
            environment.
          </p>
        </div>

        {/* 3 boxes horizontally */}
        <div className="features-row">
          <div className="feature-card">
            <h3>Available 24/7</h3>
            <p>
              Schedule your appointments at any time — day or night — based on
              your busy schedule.
            </p>
          </div>

          <div className="feature-card">
            <h3>Experienced Doctors</h3>
            <p>
              Our medical team has years of experience and is committed to
              providing quality care.
            </p>
          </div>

          <div className="feature-card">
            <h3>Clean Environment</h3>
            <p>
              We maintain a safe, sanitized, and comfortable clinic for every
              patient visit.
            </p>
          </div>
        </div>

        <div className="welcome-login">
          <Link to="/login" className="welcome-login-btn">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

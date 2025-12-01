import React, { useEffect, useState } from "react";
import { api } from "../../api";
import "../doctor/DoctorDashboard.css"; // reuse the same styles

export default function PatientProfilePage({ me: initialMe }) {
  const [me, setMe] = useState(initialMe || null);
  const [loading, setLoading] = useState(!initialMe);
  const [error, setError] = useState("");

  // If AppRouter didn’t pass me as a prop, fetch it here
  useEffect(() => {
    if (initialMe) return;

    (async () => {
      try {
        const user = await api("/api/auth/me");
        setMe(user);
      } catch (err) {
        console.error(err);
        setError("Unable to load your profile right now.");
      } finally {
        setLoading(false);
      }
    })();
  }, [initialMe]);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading profile…</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  }

  if (!me) {
    return (
      <div style={{ padding: "2rem" }}>
        You are not logged in. Please log in to view your profile.
      </div>
    );
  }

  // Try to pull extra fields if your backend starts sending them
  const fullName =
    me.fullName ||
    me.name ||
    me.patient?.fullName ||
    "Not set yet";

  const dob =
    me.patient?.dob || me.dob || null;

  const insurance =
    me.patient?.insuranceCard ||
    me.insuranceCard ||
    null;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Patient Profile</h1>
          <p className="dashboard-subtitle">
            Your basic account and clinic information.
          </p>
        </div>
        <div className="clinic-chip">Serenity Aesthetic Clinic</div>
      </div>

      {/* Profile card */}
      <div className="grid">
        <div className="card">
          <div className="card-label">Full name</div>
          <div className="card-value" style={{ fontSize: "1.4rem" }}>
            {fullName}
          </div>
          <div className="card-note">Name on your clinic record</div>
        </div>

        <div className="card">
          <div className="card-label">Email</div>
          <div className="card-value" style={{ fontSize: "1.1rem" }}>
            {me.email}
          </div>
          <div className="card-note">Used to log in and receive reminders</div>
        </div>

        <div className="card">
          <div className="card-label">Date of birth</div>
          <div className="card-value" style={{ fontSize: "1.1rem" }}>
            {dob ? dob : "Not provided"}
          </div>
          <div className="card-note">For matching your medical records</div>
        </div>

        <div className="card">
          <div className="card-label">Insurance card</div>
          <div className="card-value" style={{ fontSize: "1.1rem" }}>
            {insurance ? insurance : "Not provided"}
          </div>
          <div className="card-note">Stored for billing and eligibility</div>
        </div>
      </div>
    </div>
  );
}

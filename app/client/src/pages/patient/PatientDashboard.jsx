import React from "react";
import "../doctor/DoctorDashboard.css";

export default function ClientDashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Client Dashboard</h1>
          <p className="dashboard-subtitle">
            View your upcoming appointment details.
          </p>
        </div>

        <div className="clinic-chip">Serenity Aesthetic Clinic</div>
      </div>

      {/* Next appointment card ONLY */}
      <div className="grid">
        <div className="card">
          <div className="card-label">Next appointment</div>
          <div className="card-value">Wed, Nov 20 – 3:00 PM</div>
          <div className="card-note">Hydrafacial – Room 02</div>
        </div>
      </div>

    </div>
  );
}

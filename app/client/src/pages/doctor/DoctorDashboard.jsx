import React from "react";
import "./DoctorDashboard.css"; // keep your CSS

export default function StaffDashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Staff Dashboard</h1>
          <p className="dashboard-subtitle">
            Daily overview for reception and clinic managers.
          </p>
        </div>

        <div className="clinic-chip clinic-chip-staff">
          Today – Front desk view
        </div>
      </div>

      {/* KPIs — only keep the ones you want */}
      <div className="grid">

        <div className="card">
          <div className="card-label">Total bookings</div>
          <div className="card-value">18</div>
          <div className="card-note">Across 3 treatment rooms</div>
        </div>

        {/* You can remove this card or repurpose it */}
        <div className="card">
          <div className="card-label">Clients today</div>
          <div className="card-value">18</div>
          <div className="card-note">Total expected visits</div>
        </div>

        {/* Another optional card */}
        <div className="card">
          <div className="card-label">Available rooms</div>
          <div className="card-value">3</div>
          <div className="card-note">Ready for appointments</div>
        </div>

      </div>

    </div>
  );
}

import React from "react";

export default function StaffDashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Staff dashboard</h1>
          <p className="dashboard-subtitle">
            Daily overview for reception and clinic managers.
          </p>
        </div>

        <div className="clinic-chip clinic-chip-staff">Today – Front desk view</div>
      </div>

      {/* KPIs */}
      <div className="grid">
        <div className="card">
          <div className="card-label">Total bookings</div>
          <div className="card-value">18</div>
          <div className="card-note">Across 3 treatment rooms</div>
        </div>

        <div className="card">
          <div className="card-label">Checked in</div>
          <div className="card-value">7</div>
          <div className="card-note">As of 10:00 AM</div>
        </div>

        <div className="card">
          <div className="card-label">No-show risk</div>
          <div className="card-value">2</div>
          <div className="card-note">Flagged by late-arrival history</div>
        </div>
      </div>

      {/* Booking table */}
      <section className="section">
        <h2 className="section-title">Bookings by time slot</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Client</th>
              <th>Treatment</th>
              <th>Room</th>
              <th>Staff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:00</td>
              <td>Tran M.</td>
              <td>Hydrafacial</td>
              <td>01</td>
              <td>Dr. Nguyen</td>
              <td>Checked in</td>
            </tr>
            <tr>
              <td>09:30</td>
              <td>Pham A.</td>
              <td>Laser hair removal</td>
              <td>02</td>
              <td>Dr. Vo</td>
              <td>In progress</td>
            </tr>
            <tr>
              <td>10:00</td>
              <td>Le T.</td>
              <td>Chemical peel</td>
              <td>03</td>
              <td>Dr. Lee</td>
              <td>Scheduled</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Staff notes */}
      <section className="section">
        <h2 className="section-title">Staff notes</h2>
        <ul className="notes">
          <li>Room 02 needs extra cooling pads before afternoon laser sessions.</li>
          <li>
            Please remind all clients today to avoid sunlight for at least 48 hours
            after treatment.
          </li>
          <li>
            Two new clients ask for membership options – follow up before end of day.
          </li>
        </ul>
      </section>
    </div>
  );
}

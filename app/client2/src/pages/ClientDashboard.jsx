import React from "react";

export default function ClientDashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Client dashboard</h1>
          <p className="dashboard-subtitle">
            Overview of appointments, treatments and payment status.
          </p>
        </div>

        <div className="clinic-chip">Serenity Aesthetic Clinic</div>
      </div>

      {/* Top cards */}
      <div className="grid">
        <div className="card">
          <div className="card-label">Next appointment</div>
          <div className="card-value">Wed, Nov 20 – 3:00 PM</div>
          <div className="card-note">Hydrafacial – Room 02</div>
        </div>

        <div className="card">
          <div className="card-label">Last treatment</div>
          <div className="card-value">Chemical peel</div>
          <div className="card-note">Completed 10 days ago</div>
        </div>

        <div className="card">
          <div className="card-label">Payment status</div>
          <div className="card-value">$120.00</div>
          <div className="card-note">No outstanding balance</div>
        </div>
      </div>

      {/* Upcoming appointments */}
      <section className="section">
        <h2 className="section-title">Upcoming appointments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Room</th>
              <th>Staff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nov 20</td>
              <td>3:00 PM</td>
              <td>Hydrafacial</td>
              <td>02</td>
              <td>Dr. Nguyen</td>
              <td>Confirmed</td>
            </tr>
            <tr>
              <td>Dec 02</td>
              <td>11:00 AM</td>
              <td>Laser rejuvenation</td>
              <td>03</td>
              <td>Dr. Lee</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Treatment history */}
      <section className="section">
        <h2 className="section-title">Recent treatment history</h2>
        <ul className="timeline">
          <li>
            <span className="timeline-date">Nov 05</span>
            <span className="timeline-text">
              Hydrating facial – good tolerance, no complications.
            </span>
          </li>
          <li>
            <span className="timeline-date">Oct 18</span>
            <span className="timeline-text">
              LED light therapy – recommended maintenance every 3 weeks.
            </span>
          </li>
          <li>
            <span className="timeline-date">Sep 28</span>
            <span className="timeline-text">
              Skin consultation – treatment plan created for 3 months.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

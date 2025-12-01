import React, { useState } from "react";
import { api } from "../../api";
import "./DoctorDashboard.css"; // reuse your dashboard styles

export default function DoctorSearch() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    insuranceCard: "",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Only valid if:
  //  - insuranceCard is filled
  //  OR
  //  - firstName, lastName, and dob are all filled
  function isValidSearch() {
    if (form.insuranceCard.trim()) return true;
    if (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.dob.trim()
    ) {
      return true;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    setError("");
    setResults([]);

    if (!isValidSearch()) {
      setError(
        "Please enter either insurance card number OR first name, last name, and date of birth."
      );
      return;
    }

    setLoading(true);
    try {
      // 🔹 Adjust this URL + body keys to match your backend route
      const patients = await api("/api/doctor/search-patient", {
        method: "POST",
        body: {
          firstName: form.firstName || undefined,
          lastName: form.lastName || undefined,
          dob: form.dob || undefined,
          insuranceCard: form.insuranceCard || undefined,
        },
      });

      const list = Array.isArray(patients) ? patients : patients ? [patients] : [];
      setResults(list);

      if (!list.length) {
        setError("No patients found with that information.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Patient Search</h1>
          <p className="dashboard-subtitle">
            Staff can look up client information by name and date of birth or by insurance card number.
          </p>
        </div>
        <div className="clinic-chip clinic-chip-staff">
          Staff – Patient lookup
        </div>
      </div>

      {/* Search form card */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label className="form-label">First name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="e.g. Tran"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Last name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="e.g. Nguyen"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Date of birth</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={form.dob}
                onChange={handleChange}
              />
              <small style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Required when searching by name
              </small>
            </div>

            <div>
              <label className="form-label">Insurance card number</label>
              <input
                type="text"
                name="insuranceCard"
                className="form-control"
                placeholder="e.g. ABC12345"
                value={form.insuranceCard}
                onChange={handleChange}
              />
              <small style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Or search directly by card number
              </small>
            </div>
          </div>

          {touched && !isValidSearch() && !loading && (
            <p style={{ color: "red", marginBottom: "0.5rem" }}>
              Please enter either insurance card number OR first name, last name, and date of birth.
            </p>
          )}

          {error && (
            <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search patient"}
          </button>
        </form>
      </div>

      {/* Results table */}
      {results && results.length > 0 && (
        <section className="section">
          <h2 className="section-title">Search results</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Date of birth</th>
                <th>Insurance card</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.fullName ||
                      [p.firstName, p.lastName].filter(Boolean).join(" ") ||
                      "Unknown"}
                  </td>
                  <td>{p.dob || p.patient?.dob || "—"}</td>
                  <td>{p.insuranceCard || p.patient?.insuranceCard || "—"}</td>
                  <td>{p.email || p.user?.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

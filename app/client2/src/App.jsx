import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientDashboard from "./pages/ClientDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-name">Serenity Aesthetic Clinic</div>
            <div className="brand-tagline">Group 5 – Management Portal</div>
          </div>

          <nav className="top-nav">
            <a href="/client">Client dashboard</a>
            <a href="/staff">Staff dashboard</a>
          </nav>
        </header>

        <main className="page-body">
          <Routes>
            {/* auto redirect từ / sang /client */}
            <Route path="/" element={<Navigate to="/client" replace />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

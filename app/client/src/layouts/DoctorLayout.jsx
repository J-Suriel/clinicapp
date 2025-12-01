import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function DoctorLayout({ me, setMe }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
      setMe(null);          // clear session user
      navigate("/");        // ⬅️ go back to WelcomePage
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #ddd', padding: 16 }}>
        <h3>Staff</h3>
        <p style={{ fontSize: 12, opacity: 0.8 }}>{me?.email}</p>

        <nav style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          <NavLink to="/doctor/dashboard">Dashboard</NavLink>
          <NavLink to="/doctor/appointments">Create Appointment</NavLink>
          <NavLink to="/doctor/search">Patient Search</NavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 24,
            padding: '8px 12px',
            background: '#e63946',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Log out
        </button>

      </aside>

      <section style={{ padding: 24 }}>
        <Outlet />
      </section>
    </div>
  );
}

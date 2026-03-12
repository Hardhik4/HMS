import Sidebar from "../components/Sidebar"

export default function DoctorDashboard() {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">

        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Welcome Doctor 👨‍⚕️</p>
            <h1 className="dashboard-title">Doctor Dashboard</h1>
          </div>
          <span className="dashboard-date">📅 {today}</span>
        </div>

        {/* Doctor Stats */}
        <div className="stats-grid">

          <div className="stat-card blue">
            <div className="stat-card-icon">📅</div>
            <div className="stat-card-value">24</div>
            <div className="stat-card-label">Today's Appointments</div>
          </div>

          <div className="stat-card green">
            <div className="stat-card-icon">👨‍⚕️</div>
            <div className="stat-card-value">120</div>
            <div className="stat-card-label">Total Patients</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-card-icon">💊</div>
            <div className="stat-card-value">18</div>
            <div className="stat-card-label">Prescriptions</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-card-icon">📄</div>
            <div className="stat-card-value">6</div>
            <div className="stat-card-label">Reports Pending</div>
          </div>

        </div>

        {/* Doctor Appointment List */}
        <div className="dashboard-section-card">

          <h3 className="section-card-title">Today's Appointments</h3>

          <div className="appointment-item">
            <div className="appt-avatar">👤</div>
            <div className="appt-info">
              <div className="appt-name">Rahul Sharma</div>
              <div className="appt-time">10:00 AM — General Checkup</div>
            </div>
            <span className="appt-badge pending">Pending</span>
          </div>

          <div className="appointment-item">
            <div className="appt-avatar">👤</div>
            <div className="appt-info">
              <div className="appt-name">Sneha Kapoor</div>
              <div className="appt-time">11:30 AM — Consultation</div>
            </div>
            <span className="appt-badge completed">Completed</span>
          </div>

        </div>

      </main>
    </div>
  )
}
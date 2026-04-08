import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  // values shown in cards
  const [todayAppointments, setTodayAppointments] = useState("--");
  const [patients, setPatients] = useState("--");
  const [prescriptions, setPrescriptions] = useState("--");
  const [pendingReports, setPendingReports] = useState("--");

  // logged-in doctor name
  const [username, setUsername] = useState("");

  // runs when page loads
  useEffect(() => {
    const token = Cookies.get("token");

    // if user not logged in
    if (!token) {
      navigate("/loginselector");
      return;
    }

    // check user + load dashboard data
    validateUser(token);
    getStats(token);
  }, []);

  // verify doctor
  function validateUser(token) {
    fetch("http://localhost:3000/api/whoami", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.role !== "doctor") {
          navigate("/loginselector");
        } else {
          setUsername(res.username);
        }
      })
      .catch(() => navigate("/loginselector"));
  }

  // get stats from backend
  function getStats(token) {
    fetch("http://localhost:3000/api/dashboard/doctor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTodayAppointments(res.todayAppointments);
        setPatients(res.patients);
        setPrescriptions(res.prescriptions);
        setPendingReports(res.pendingReports);
      })
      .catch(() => console.log("error loading stats"));
  }

  // date shown on top
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // temporary appointment list
  const appointments = [
    { name: "Rahul Sharma", time: "10:00 AM — General Checkup", status: "pending" },
    { name: "Sneha Kapoor", time: "11:30 AM — Consultation", status: "completed" },
    { name: "Amit Verma", time: "1:00 PM — Dental", status: "pending" },
  ];

  return (
    <div className="pd-layout">

      {/* sidebar */}
      <Sidebar />

      <div className="pd-main">

        {/* topbar */}
        <div className="pd-topbar">
          <div className="pd-topbar-left">
            <h2>Overview</h2>
            <p>{today} · Hello Dr. {username}</p>
          </div>
        </div>

        <div className="pd-content">

          {/* stats cards */}
          <div className="pd-stats-grid">

            <div className="pd-stat-card">
              <div className="pd-stat-icon" style={{ background: "#e0f2fe" }}></div>
              <div>
                <div className="pd-stat-val">{todayAppointments}</div>
                <div className="pd-stat-lbl">Today's Appointments</div>
              </div>
            </div>

            <div className="pd-stat-card">
              <div className="pd-stat-icon" style={{ background: "#dcfce7" }}></div>
              <div>
                <div className="pd-stat-val">{patients}</div>
                <div className="pd-stat-lbl">Total Patients</div>
              </div>
            </div>

            <div className="pd-stat-card">
              <div className="pd-stat-icon" style={{ background: "#f3e8ff" }}></div>
              <div>
                <div className="pd-stat-val">{prescriptions}</div>
                <div className="pd-stat-lbl">Prescriptions</div>
              </div>
            </div>

            <div className="pd-stat-card">
              <div className="pd-stat-icon" style={{ background: "#fef9c3" }}></div>
              <div>
                <div className="pd-stat-val">{pendingReports}</div>
                <div className="pd-stat-lbl">Reports Pending</div>
              </div>
            </div>

          </div>

          {/* main section */}
          <div className="pd-two-col">

            {/* left side - appointments */}
            <div>
              <div className="pd-section-header">
                <h3>Today's Appointments</h3>
              </div>

              <div className="pd-appt-list">
                {appointments.map((appt, index) => (
                  <div key={index} className="pd-appt-card">

                    {/* initials circle */}
                    <div className="pd-doc-avatar">
                      {appt.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    {/* name + time */}
                    <div className="pd-appt-info">
                      <strong>{appt.name}</strong>
                      <span>{appt.time}</span>
                    </div>

                    {/* status */}
                    <div className="pd-appt-time">
                      <span className={`pd-badge ${appt.status}`}>
                        {appt.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* right side - quick actions */}
            <div className="pd-vitals-card">
              <h3>Quick Actions</h3>

              <div className="quick-action-grid">

                <button
                  className="quick-action-btn"
                  onClick={() => navigate("/doctor-appointments")}
                >
                  <div className="qa-label">View Appointments</div>
                </button>

                <button
                  className="quick-action-btn"
                  onClick={() => navigate("/doctor-patients")}
                >
                  <div className="qa-label">My Patients</div>
                </button>

                <button
                  className="quick-action-btn"
                  onClick={() => navigate("/write-prescription")}
                >
                  <div className="qa-label">Add Prescription</div>
                </button>

                <button
                  className="quick-action-btn"
                  onClick={() => navigate("/doctor-reports")}
                >
                  <div className="qa-label">View Reports</div>
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
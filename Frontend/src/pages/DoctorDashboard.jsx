import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  // stats
  const [todayAppointments, setTodayAppointments] = useState("--");
  const [patients, setPatients] = useState("--");
  const [prescriptions, setPrescriptions] = useState("--");
  const [pendingReports, setPendingReports] = useState("--");

  const [username, setUsername] = useState("");

  // load data on start
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      //navigate("/loginselector");
      return;
    }

    validateUser(token);
    getStats(token);
  }, []);

  // check role
  function validateUser(token) {
    fetch("http://localhost:3000/api/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        if (res.role !== "doctor") {
          //navigate("/loginselector");
        } else {
          setUsername(res.username);
        }
      })
      //.catch(() => navigate("/loginselector"));
  }

  // get dashboard data
  function getStats(token) {
    fetch("http://localhost:3000/api/dashboard/doctor", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        setTodayAppointments(res.todayAppointments);
        setPatients(res.patients);
        setPrescriptions(res.prescriptions);
        setPendingReports(res.pendingReports);
      })
      .catch(() => console.log("error loading stats"));
  }

  // date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // dummy appointments
  const appointments = [
    { name: "Rahul Sharma", time: "10:00 AM — General Checkup", status: "pending" },
    { name: "Sneha Kapoor", time: "11:30 AM — Consultation", status: "completed" },
    { name: "Amit Verma", time: "1:00 PM — Dental", status: "pending" },
  ];

  return (
    <div className="dashboard-layout">

      {/* sidebar */}
      <Sidebar />

      <div className="dashboard-main">

        {/* top bar */}
        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Welcome Dr. {username}</p>
            <h1 className="dashboard-title">Doctor Dashboard</h1>
          </div>
          <span className="dashboard-date">{today}</span>
        </div>

        {/* stats */}
        <div className="stats-grid">

          <div className="stat-card blue">
            <div className="stat-card-value">{todayAppointments}</div>
            <div className="stat-card-label">Today's Appointments</div>
          </div>

          <div className="stat-card green">
            <div className="stat-card-value">{patients}</div>
            <div className="stat-card-label">Total Patients</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-card-value">{prescriptions}</div>
            <div className="stat-card-label">Prescriptions</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-card-value">{pendingReports}</div>
            <div className="stat-card-label">Reports Pending</div>
          </div>

        </div>

        {/* lower section */}
        <div className="dashboard-lower">

          {/* appointments */}
          <div className="dashboard-section-card">
            <h3 className="section-card-title">Today's Appointments</h3>

            {appointments.length === 0 ? (
              <p>No appointments today.</p>
            ) : (
              appointments.map((appt, index) => (
                <div key={index} className="appointment-item">

                  <div className="appt-info">
                    <div className="appt-name">{appt.name}</div>
                    <div className="appt-time">{appt.time}</div>
                  </div>

                  <span className={`appt-badge ${appt.status}`}>
                    {appt.status}
                  </span>

                </div>
              ))
            )}
          </div>

          {/* quick actions */}
          <div className="dashboard-section-card">
            <h3 className="section-card-title">Quick Actions</h3>

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
  );
}
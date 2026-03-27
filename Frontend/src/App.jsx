import { Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import LoginSelector from "./pages/LoginSelector"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import Login from "./pages/Login"
import "./App.css"

function App() {

    return (

        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginselector" element={<LoginSelector />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/login/:userType" element={<Login />} />
        </Routes>

    )

}

export default App
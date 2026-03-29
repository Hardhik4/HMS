import { Routes, Route } from "react-router-dom"

import Appointment from "./components/Appointment"
import Landing from "./pages/Landing"
import LoginSelector from "./pages/LoginSelector"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import Login from "./pages/Login"
import "./App.css"
import Register from "./pages/Register"

function App() {

    return (

        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginselector" element={<LoginSelector />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/register/:userType" element={<Register />} />
            <Route path="/book" element={<Appointment/>}/>
        </Routes>

    )

}

export default App
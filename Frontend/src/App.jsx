import { Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import "./App.css"

function App(){

return(

<Routes>
<Route path="/" element={<Landing/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/dashboard" element={<PatientDashboard/>}/>
<Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
</Routes>

)

}

export default App
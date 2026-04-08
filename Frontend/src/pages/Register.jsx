import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import "../styles/login.css"
import BackButton from "../components/BackButton"

export default function Register() {
    const { userType } = useParams()
    const navigate = useNavigate()

    const role = userType || "patient"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }

    try {
        const response = await fetch("http://localhost:3000/api/patient/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if (!response.ok) {
            // backend sends { message: "User Already Exists" } etc.
            alert(data.message || "Registration failed")
            return
        }

        // Save the token so the app knows you are logged in
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", role)

        // Redirect to dashboard
        navigate(`/${role}-dashboard`)

    } catch (err) {
        alert("Could not connect to server. Is the backend running?")
        console.error(err)
    }
}

    return (
        <div className="login-container">
            <BackButton to="/loginselector"/>
            <h2>Register {role}</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.slice())}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice())}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.slice())}
                    required
                />

                <button type="submit" className="btn">Register</button>
            </form>

            <p>
                Already registered? <Link to={`/login/${role}`}>Go to Login</Link>
            </p>
        </div>
    )
}
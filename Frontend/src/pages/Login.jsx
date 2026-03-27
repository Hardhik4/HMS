import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"

export default function Login() {
    const { userType } = useParams()
    const navigate = useNavigate()
    if (!userType) { userType = "patient" }
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ username, password });
        console.log(userType)
        navigate(`/${userType}-dashboard`)
    }

    return (
        <div className="login-container">
            <h2>Welcome {userType}</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">Login</button>
            </form>

            <p>
                Not registered? <Link to="/register">Go to Register</Link>
            </p>
        </div>
    )
}
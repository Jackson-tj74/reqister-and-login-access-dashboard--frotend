import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/register", { email, password, name });
            setMessage(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                {message && <p className="message">{message}</p>}

           
                <p className="switch-login">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

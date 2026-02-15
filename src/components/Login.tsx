import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      setMessage(res.data.message);

      
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
         <p className="switch-text">
         Don’t have an account? <Link to="/">Register</Link>
       </p>
      </div>
    </div>
  );
};

export default Login;

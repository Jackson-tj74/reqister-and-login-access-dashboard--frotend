
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = async () => {
    await api.get("/logout");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome {user.name} 🎉</h1>
      <p>Email: {user.email}</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

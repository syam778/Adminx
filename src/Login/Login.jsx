/*import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { AdminContext } from "../Context/AdminContext";

const Login = () => {
  const { url } = useContext(AdminContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) return alert("Enter username");

    setLoading(true);
    try {
      // ✅ get admin from DB
      const res = await axios.get(`${url}/api/admin/get`);

      if (res.data.success) {
        const admin = res.data.data;

        // ✅ check username matches
        if (admin.username !== username) {
          alert("❌ Username not matched");
          setLoading(false);
          return;
        }

        // ✅ login success
        localStorage.setItem("adminLogin", "true");
        localStorage.setItem("admin", JSON.stringify(admin));

        alert("✅ Login Success");
        navigate("/admin-dashboard");
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>👑 Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

*/
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AdminContext } from "../Context/AdminContext";

const Login = () => {
  const { url } = useContext(AdminContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) return alert("Enter username ❌");

    setLoading(true);

    try {
      // ✅ Get admin from DB
      const res = await axios.get(`${url}/api/admin/get`);

      if (!res.data.success) {
        alert("❌ " + (res.data.message || "Admin not found"));
        setLoading(false);
        return;
      }

      // ✅ Backend can return object OR array
      let adminData = res.data.data;

      // If array -> take first admin
      if (Array.isArray(adminData)) {
        adminData = adminData[0];
      }

      if (!adminData || !adminData.username) {
        alert("❌ Admin username not found in DB");
        setLoading(false);
        return;
      }

      // ✅ Username match (case-insensitive + trim)
      const dbUsername = adminData.username.toLowerCase().trim();
      const typedUsername = username.toLowerCase().trim();

      if (dbUsername !== typedUsername) {
        alert("❌ Username not matched");
        setLoading(false);
        return;
      }

      // ✅ Login success
      localStorage.setItem("adminToken", "true");
      localStorage.setItem("adminData", JSON.stringify(adminData));

      alert("✅ Login Success");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("❌ Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>👑 Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

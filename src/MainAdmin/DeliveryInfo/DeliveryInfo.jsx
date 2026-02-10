import { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryInfo.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const DeliveryInfo = () => {
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const {url} = useContext(AdminContext);

  const fetchDeliveryInfo = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/assignorder/all`);

      if (res.data.success) {
        setDeliveryInfo(res.data.data || []);
      } else {
        setDeliveryInfo([]);
      }
    } catch (err) {
      console.log(err);
      setDeliveryInfo([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Delivery Info
  const deleteInfo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this delivery info?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${url}/api/assignorder/delete/${id}`
      );

      if (res.data.success) {
        alert("Deleted ✅");
        fetchDeliveryInfo();
      } else {
        alert(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  useEffect(() => {
    fetchDeliveryInfo();
  }, []);

  if (loading) return <p className="center-text">Loading Delivery Info...</p>;

  return (
    <div className="delivery-page">
      <h2 className="delivery-title">🚚 Delivery Assigned Info</h2>

      {deliveryInfo.length === 0 ? (
        <p className="center-text">No delivery info found</p>
      ) : (
        <div className="delivery-grid">
          {deliveryInfo.map((info, index) => (
            <div className="delivery-card" key={info._id}>
              <h3>Delivery #{index + 1}</h3>

              <p>
                <b>ID:</b> {info._id}
              </p>

              <p>
                <b>Order ID:</b> {info.order}
              </p>

              <p>
                <b>DeliveryBoy ID:</b> {info.deliveryBoyId}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span className={`status ${info.status}`}>
                  {info.status}
                </span>
              </p>

              <p>
                <b>Assigned At:</b>{" "}
                {info.assignedAt
                  ? new Date(info.assignedAt).toLocaleString()
                  : "N/A"}
              </p>

              <p>
                <b>Created At:</b>{" "}
                {info.createdAt
                  ? new Date(info.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <button
                className="delete-btn"
                onClick={() => deleteInfo(info._id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;


/**
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


import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  // ✅ Backend URL
  const url = "http://localhost:3000";

  // ✅ Delivery boys list
  const [delBoyList, setDelBoyList] = useState([]);

  // 🔊 Audio files (put inside public folder)
  const doneAudio = new Audio("/Audios/done.mp3");
  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");
  const orderAudio = new Audio("/Audios/order.mp3");

  // ✅ Fetch Delivery Boys
  const fetchDelBoys = async () => {
    try {
      const res = await axios.get(`${url}/api/delboy/get`);

      if (res.data.success) {
        setDelBoyList(res.data.data);
      } else {
        setDelBoyList([]);
      }
    } catch (error) {
      console.log("fetchDelBoys error:", error);
      setDelBoyList([]);
    }
  };

  // auto fetch once
  useEffect(() => {
    fetchDelBoys();
  }, []);

  const contextValue = {
    url,
    delBoyList,
    fetchDelBoys,
    doneAudio,
    errorAudio,
    submitAudio,
    orderAudio,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

 */
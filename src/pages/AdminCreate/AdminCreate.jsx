import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCreate.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const AdminCreate = () => {
  const [formData, setFormData] = useState({
    admincode: "",
    number: "",
    gmail: "",
    username: "",
  });

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);

  //const url = "http://localhost:3000"; // change if needed
 const{url} =useContext(AdminContext);
  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // create admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/admin/create`, formData);

      if (res.data.success) {
        alert("✅ Admin Created Successfully");
        setFormData({
          admincode: "",
          number: "",
          gmail: "",
          username: "",
        });

        fetchAdmin();
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Server Error");
    }
    setLoading(false);
  };

  // get admin data
  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/get`);
      if (res.data.success) {
        setAdminData(res.data.data);
      } else {
        setAdminData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // remove admin
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure remove admin?")) return;

    try {
      const res = await axios.delete(`${url}/api/admin/remove/${id}`);
      if (res.data.success) {
        alert("✅ Admin Removed");
        setAdminData(null);
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Server Error");
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div className="admin-create">
      <h2>👑 Create Admin</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="admincode"
          placeholder="Enter Admin Code"
          value={formData.admincode}
          onChange={handleChange}
        />

        <input
          type="text"
          name="number"
          placeholder="Enter Phone Number"
          value={formData.number}
          onChange={handleChange}
        />

        <input
          type="email"
          name="gmail"
          placeholder="Enter Gmail"
          value={formData.gmail}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Enter Username (env allowed)"
          value={formData.username}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>

      <hr />

      <h2>📌 Admin Data</h2>

      {!adminData ? (
        <p className="no-admin">No Admin Found</p>
      ) : (
        <div className="admin-card">
          <p>
            <b>Admin Code:</b> {adminData.admincode}
          </p>
          <p>
            <b>Phone:</b> {adminData.number}
          </p>
          <p>
            <b>Gmail:</b> {adminData.gmail}
          </p>
          <p>
            <b>Username:</b> {adminData.username}
          </p>

          <button
            className="remove-btn"
            onClick={() => handleRemove(adminData._id)}
          >
            ❌ Remove Admin
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCreate;

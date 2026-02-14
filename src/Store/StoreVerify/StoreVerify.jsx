import { useState } from "react";
import axios from "axios";
import "./StoreVerify.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

//const API_BASE = "http://localhost:3000/api/store";

const StoreVerify = () => {
  const {url} =useContext(AdminContext);
  const [formData, setFormData] = useState({
    username: "",
    storeId: "",
    gmail: "",
    phone: "",
    street: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [storeInfo, setStoreInfo] = useState(null); // store returned from backend

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Verify store
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStoreInfo(null);

    try {
      const res = await axios.post(`${url}/api/store/verify`, formData);

      setStoreInfo(res.data.data); // save returned store info
      setMessage(res.data.success
        ? "Store verified successfully! Welcome to Speed-Del."
        : "Store verification failed! Data not matched."
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Store verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-verify-container">
      <h2>Verify Store</h2>

      <form onSubmit={handleSubmit} className="store-verify-form">
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="storeId" placeholder="Store ID" value={formData.storeId} onChange={handleChange} required />
        <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Store"}
        </button>
      </form>

      {message && <p className={`msg ${storeInfo?.status === "verified" ? "success" : "failed"}`}>{message}</p>}

      {storeInfo && (
        <div className={`store-card ${storeInfo.status === "verified" ? "verified" : "failed"}`}>
          <h3>Store Info</h3>
          <p>Username: {storeInfo.username}</p>
          <p>Store Name: {storeInfo.storeName || "N/A"}</p>
          <p>Store ID: {storeInfo.storeId}</p>
          <p>Email: {storeInfo.gmail}</p>
          <p>Phone: {storeInfo.phone}</p>
          <p>Street: {storeInfo.street}</p>
          <p>Address: {storeInfo.address}</p>
          <p>Pincode: {storeInfo.pincode}</p>
          <p>Status: {storeInfo.status === "verified" ? "Verified ✅" : "Not Verified ❌"}</p>
        </div>
      )}
    </div>
  );
};

export default StoreVerify;

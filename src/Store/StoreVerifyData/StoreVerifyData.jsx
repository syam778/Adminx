import { useEffect, useState } from "react";
import axios from "axios";
import "./StoreVerifyData.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const StoreVerifyData = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const {url} = useContext(AdminContext);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/store/all`);
      setStores(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this store?")) {
      try {
        await axios.delete(`${url}/api/homestore/remove/${id}`);
        fetchStores();
      } catch (err) {
        console.error(err);
        alert("Failed to delete store");
      }
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="store-list-container">
      <h2>All Stores</h2>
      {loading && <p>Loading stores...</p>}
      {!loading && stores.length === 0 && <p>No stores found.</p>}

      <div className="store-cards">
        {stores.map((s) => (
          <div key={s._id} className={`store-card ${s.status === "verified" ? "verified" : "pending"}`}>
            <h3>{s.storeName}</h3>
            <p><strong>Owner:</strong> {s.username}</p>
            <p><strong>Store ID:</strong> {s.storeId}</p>
            <p><strong>Email:</strong> {s.gmail}</p>
            <p><strong>Phone:</strong> {s.phone}</p>
            <p><strong>Age:</strong> {s.age}</p>
            <p><strong>City:</strong> {s.city}</p>
            <p><strong>Street:</strong> {s.street}</p>
            <p><strong>Address:</strong> {s.address}</p>
            <p><strong>Pincode:</strong> {s.pincode}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={s.status === "verified" ? "status-verified" : "status-pending"}>
                {s.status === "verified" ? "Verified ✅" : " Verified ✅ "}
              </span>
            </p>
            <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreVerifyData;

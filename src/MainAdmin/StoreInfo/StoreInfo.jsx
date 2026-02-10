import { useEffect, useState } from "react";
import axios from "axios";
import "./StoreInfo.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const StoreInfo = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const{url}= useContext(AdminContext);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/store/all`);

      if (res.data.success) {
        setStores(res.data.data || []);
      } else {
        setStores([]);
      }
    } catch (err) {
      console.log(err);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE STORE
  const deleteStore = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this StoreInfo?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${url}/api/store/delete/${id}`
      );

      if (res.data.success) {
        alert("Store deleted ✅");
        fetchStores();
      } else {
        alert(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <p className="center-text">Loading store info...</p>;

  return (
    <div className="store-page">
      <h2 className="store-title">🏪 StoreInfo - All Stores</h2>

      {stores.length === 0 ? (
        <p className="center-text">No store info found</p>
      ) : (
        <div className="store-grid">
          {stores.map((store, index) => (
            <div className="store-card" key={store._id}>
              <h3>Store #{index + 1}</h3>

              <p><b>_id:</b> {store._id}</p>
              <p><b>username:</b> {store.username}</p>
              <p><b>storeId:</b> {store.storeId}</p>
              <p><b>gmail:</b> {store.gmail}</p>

              {/* ✅ Click to Call */}
              <p>
                <b>phone:</b>{" "}
                <a className="call-link" href={`tel:${store.phone}`}>
                  {store.phone}
                </a>
              </p>

              <p><b>address:</b> {store.address}</p>
              <p><b>street:</b> {store.street}</p>
              <p><b>pincode:</b> {store.pincode}</p>

              <p>
                <b>status:</b>{" "}
                <span className={`status ${store.status}`}>
                  {store.status}
                </span>
              </p>

              <p><b>storeRef:</b> {store.storeRef}</p>

              <p>
                <b>createdAt:</b>{" "}
                {store.createdAt
                  ? new Date(store.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <p>
                <b>updatedAt:</b>{" "}
                {store.updatedAt
                  ? new Date(store.updatedAt).toLocaleString()
                  : "N/A"}
              </p>

              <p><b>__v:</b> {store.__v}</p>

              <button
                className="delete-btn"
                onClick={() => deleteStore(store._id)}
              >
                ❌ Remove Store
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreInfo;

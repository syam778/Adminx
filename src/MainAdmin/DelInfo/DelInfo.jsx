import { useEffect, useState } from "react";
import axios from "axios";
import "./DelInfo.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const DelInfo = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const {url} = useContext(AdminContext);

  // ✅ Fetch All Delivery Boys
  const fetchDeliveryBoys = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/delboy/all`);

      if (res.data.success) {
        setDeliveryBoys(res.data.data || []);
      } else {
        setDeliveryBoys([]);
      }
    } catch (err) {
      console.log(err);
      setDeliveryBoys([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Delivery Boy
  const deleteDeliveryBoy = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Delivery Boy?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${url}/api/delboy/delete/${id}`
      );

      if (res.data.success) {
        alert("Delivery Boy removed ✅");
        fetchDeliveryBoys();
      } else {
        alert(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  if (loading) return <p className="center-text">Loading delivery boys...</p>;

  return (
    <div className="del-page">
      <h2 className="del-title">🚴 Delivery Boys - All Data</h2>

      {deliveryBoys.length === 0 ? (
        <p className="center-text">No delivery boys found</p>
      ) : (
        <div className="del-grid">
          {deliveryBoys.map((boy, index) => (
            <div className="del-card" key={boy._id}>
              <h3>Delivery Boy #{index + 1}</h3>

              <p><b>_id:</b> {boy._id}</p>
              <p><b>name:</b> {boy.name}</p>

              {/* ✅ Click to Call */}
              <p>
                <b>number:</b>{" "}
                <a className="call-link" href={`tel:${boy.number}`}>
                  {boy.number}
                </a>
              </p>

              <p><b>gmail:</b> {boy.gmail}</p>
              <p><b>userSpecialId:</b> {boy.userSpecialId}</p>
              <p><b>vehicle:</b> {boy.vehicle}</p>

              <p>
                <b>isActive:</b>{" "}
                {boy.isActive ? "✅ Active" : "❌ Inactive"}
              </p>

              <p>
                <b>isOnline:</b>{" "}
                {boy.isOnline ? "🟢 Online" : "🔴 Offline"}
              </p>

              <p><b>lastSeen:</b> {boy.lastSeen ? new Date(boy.lastSeen).toLocaleString() : "N/A"}</p>

              <p><b>currentOrder:</b> {boy.currentOrder || "N/A"}</p>

              <p><b>totalDutyMs:</b> {boy.totalDutyMs}</p>

              <p><b>sessions:</b> {boy.sessions?.length || 0}</p>

              <p>
                <b>createdAt:</b>{" "}
                {boy.createdAt
                  ? new Date(boy.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <p>
                <b>updatedAt:</b>{" "}
                {boy.updatedAt
                  ? new Date(boy.updatedAt).toLocaleString()
                  : "N/A"}
              </p>

              <p><b>__v:</b> {boy.__v}</p>

              <button
                className="delete-btn"
                onClick={() => deleteDeliveryBoy(boy._id)}
              >
                ❌ Remove Delivery Boy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DelInfo;

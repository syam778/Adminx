import { useEffect, useState } from "react";// main code
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



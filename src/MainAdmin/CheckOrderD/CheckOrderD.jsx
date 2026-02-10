/*import React, { useState } from "react";
import axios from "axios";

const CheckOrderD = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFix = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:3000/api/orders/fix-delboyid");
      setResult(res.data);
      alert("✅ delBoyId updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update delBoyId");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fix delBoyId for Orders</h2>
      <button onClick={handleFix} disabled={loading}>
        {loading ? "Updating..." : "Fix delBoyId"}
      </button>

      {result && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CheckOrderD;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CheckOrderD.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const CheckOrderD = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deliveryBoy = JSON.parse(localStorage.getItem("deliveryBoy"));
    const deliveryBoyId = deliveryBoy?._id;
    const {url} = useContext(AdminContext);

    if (!deliveryBoyId) {
      // ⛔ silently wait instead of error
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${url}/api/orders/assigned/${deliveryBoyId}`
        );
        setOrders(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="check-orders">
      <h2>My Assigned Orders</h2>

      {orders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Amount:</b> ₹{order.amount}</p>
            <p><b>Status:</b> {order.status}</p>

            {order.delBoy && (
              <>
                <p><b>Name:</b> {order.delBoy.name}</p>
                <p><b>Email:</b> {order.delBoy.gmail}</p>
                <p><b>Phone:</b> {order.delBoy.number}</p>
                <p><b>Vehicle:</b> {order.delBoy.vehicle}</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CheckOrderD;



import "./Newdata.css";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const Newdata = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="new-order-page">
        <h2>No order found</h2>
        <button onClick={() => navigate("/orders")}>Back</button>
      </div>
    );
  }

  return (
    <div className="new-order-page">
      <h2>🆕 New Order Received</h2>

      <div className="order-item">
        <img src={assets.store} alt="" />

        <div>
          <p className="order-item-food">
            Item Name -{" "}
            {order.items.map((item, i) =>
              i === order.items.length - 1
                ? `${item.name} = ${item.quantity}`
                : `${item.name} = ${item.quantity}, `
            )}
          </p>

          <p className="order-item-name">
            Name - {order.address.firstName} {order.address.lastName}
          </p>

          <div className="order-item-add">
            <p>Email - {order.address.email}</p>
            <p>City - {order.address.city}</p>
            <p>Pincode - {order.address.zipcode}</p>
          </div>

          <div className="phone">
            <p>Phone - {order.address.phone}</p>
            <p>Age - {order.address.age}</p>
            <p>Address - {order.address.address}</p>
          </div>
        </div>

        <p className="len">Items : {order.items.length}</p>
        <p className="amount">₹{order.amount}</p>

        <div className="new-order-actions">
          <button onClick={() => navigate("/orders")}>⬅ Back</button>
        </div>
      </div>
    </div>
  );
};

export default Newdata;

/*
import "./Newdata.css";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Newdata = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();
  const {orderAudio} = useContext(AdminContext);

  const [isOnline, setIsOnline] = useState(null);

  const DELIVERY_BOY_ID = order?.deliveryBoyId; // must come from backend

  // 🔍 Check delivery boy status
  useEffect(() => {
    if (!DELIVERY_BOY_ID) return;

    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/delivery-boy/${DELIVERY_BOY_ID}/status`
        );

        if (res.data.isActive) {
          setIsOnline(true);
          sendOrderToDeliveryBoy();
        } else {
          setIsOnline(false);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    checkStatus();
  }, [DELIVERY_BOY_ID]);

  // 📤 Send order only if online
  const sendOrderToDeliveryBoy = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/orders/send-to-delboy",
        { orderId: order._id, deliveryBoyId: DELIVERY_BOY_ID }
      );
      console.log("✅ Order sent to delivery boy");
    } catch (err) {
      console.error("❌ Failed to send order", err);
    }
  };

  if (!order) {
    return (
      <div className="new-order-page">
        <h2>No order found</h2>
        <button onClick={() => navigate("/orders")}>Back</button>
      </div>
    );
  }

  return (
    <div className="new-order-page">
      <h2>🆕 New Order Received</h2>

      <p>
        Delivery Boy Status :{" "}
        {isOnline === null
          ? "Checking..."
          : isOnline
          ? "🟢 Online"
          : "🔴 Offline (Order Not Sent)"}
      </p>

      <div className="order-item">
        <img src={assets.store} alt="" />

        <div>
          <p className="order-item-food">
            Item Name -{" "}
            {order.items.map((item, i) =>
              i === order.items.length - 1
                ? `${item.name} = ${item.quantity}`
                : `${item.name} = ${item.quantity}, `
            )}
          </p>

          <p className="order-item-name">
            Name - {order.address.firstName} {order.address.lastName}
          </p>

          <div className="order-item-add">
            <p>Email - {order.address.email}</p>
            <p>City - {order.address.city}</p>
            <p>Pincode - {order.address.zipcode}</p>
          </div>

          <div className="phone">
            <p>Phone - {order.address.phone}</p>
            <p>Age - {order.address.age}</p>
            <p>Address - {order.address.address}</p>
          </div>
        </div>

        <p className="len">Items : {order.items.length}</p>
        <p className="amount">₹{order.amount}</p>

        <div className="new-order-actions">
          <button onClick={() => navigate("/orders")}>⬅ Back</button>
        </div>
      </div>
    </div>
  );
};

export default Newdata;
*/
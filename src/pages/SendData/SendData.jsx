import { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
//import "./SendData.css"; // reuse your existing styles
import "./SendData.css"

const SendData = () => {
  const { delBoyList, fetchDelBoys ,url} = useContext(AdminContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ⏰ Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 📦 Fetch delivery boys
  useEffect(() => {
    fetchDelBoys();
  }, []);

  // ✅ Filter only online delivery boys
  const onlineBoys = delBoyList.filter((boy) => boy.isActive);

  return (
    <div className="delivery-list">
      <h2>Online Delivery Boys</h2>

      <div className="live-time">
        📅 {currentTime.toLocaleDateString()} | ⏰{" "}
        {currentTime.toLocaleTimeString()}
      </div>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {onlineBoys.length === 0 ? (
            <tr>
              <td colSpan="6">No delivery boys online</td>
            </tr>
          ) : (
            onlineBoys.map((boy) => (
              <tr key={boy._id}>
                <td>{boy.name}</td>
                <td>{boy.number}</td>
                <td>{boy.gmail}</td>
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td>🟢 Online</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SendData;

/*
import { useEffect, useState } from "react";
import axios from "axios";
import "./SendData.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const SendData = () => {
  const [order, setOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const {orderAudio} = useContext(AdminContext);

  const DELIVERY_BOY_ID = localStorage.getItem("delBoyId"); // login time save

  // 🔔 Check for new assigned order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/orders/assigned/${DELIVERY_BOY_ID}`
        );

        if (res.data) {
          setOrder(res.data);
          setShowPopup(true); // ✅ OPEN POPUP
          orderAudio.play()
        }
      } catch (err) {
        console.log("No new orders");
      }
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 5000); // poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  // ✅ Accept order
  const acceptOrder = async () => {
    await axios.post("http://localhost:3000/api/orders/accept", {
      orderId: order._id,
    });

    setShowPopup(false);
  };

  // ❌ Cancel order
  const cancelOrder = async () => {
    await axios.post("http://localhost:3000/api/orders/cancel", {
      orderId: order._id,
    });

    setShowPopup(false);
  };

  return (
    <>
      {showPopup && order && (
        <div className="order-popup">
          <h2>🆕 New Order</h2>

          <p><b>Name:</b> {order.address.firstName}</p>
          <p><b>Phone:</b> {order.address.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>

          <p>
            <b>Items:</b>{" "}
            {order.items.map((i) => `${i.name} (${i.quantity})`).join(", ")}
          </p>

          <div className="popup-actions">
            <button className="accept" onClick={acceptOrder}>
              ✅ Accept
            </button>
            <button className="cancel" onClick={cancelOrder}>
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SendData;
*/
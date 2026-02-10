import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Home.css";
import { AdminContext } from "../../Context/AdminContext";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [newOrderPopup, setNewOrderPopup] = useState(null);
  const [hiddenOrders, setHiddenOrders] = useState({}); // hide logic

  const { orderAudio, url ,wonAudio} = useContext(AdminContext) || {};

  const orderAudioRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const prevIdsRef = useRef(new Set());
  const firstLoadRef = useRef(true);

  // Unlock audio for mobile
  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;
    orderAudioRef.current?.play().then(() => {
      orderAudioRef.current.pause();
      orderAudioRef.current.currentTime = 0;
    }).catch(() => {});
    audioUnlockedRef.current = true;
  };

  // Fetch orders
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        const newOrders = res.data.data || [];

        // detect new order
        const newIds = new Set(newOrders.map((o) => o._id));
        const prevIds = prevIdsRef.current;

        if (!firstLoadRef.current) {
          const newlyArrived = newOrders.filter((o) => !prevIds.has(o._id));
          if (newlyArrived.length > 0) {
            setNewOrderPopup(newlyArrived[0]);
            if (audioUnlockedRef.current) orderAudioRef.current?.play().catch(() => {});
          }
        }

        firstLoadRef.current = false;
        prevIdsRef.current = newIds;
        setOrders(newOrders);

      }
    } catch (err) {
      console.error("FETCH ERROR 👉", err);
      toast.error("Server error while fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const hideOrder = (id) => setHiddenOrders(prev => ({ ...prev, [id]: true }));

  return (
    <div className="home" onClick={unlockAudio}>
      <audio ref={orderAudioRef} src="/Audios/order.mp3" preload="auto" />

      <h2 className="home-title">📦 Orders</h2>

      {orders.filter(o => !hiddenOrders[o._id]).length === 0 && (
        <p className="center-text">No orders to display</p>
      )}

      <div className="orders-container">
        {orders.filter(o => !hiddenOrders[o._id]).map((order, index) => (
          <div key={order._id} className={`order-card ${order.status}`}>
            <div className="order-header">
              <h3>Order #{index + 1}</h3>
              <span className="status">{order.status.toUpperCase()}</span>
              <span className="amount">₹{order.amount || 0}</span>
            </div>

            <div className="order-body">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Customer:</b> {order.address?.firstName || "N/A"} {order.address?.lastName || ""}</p>
              <p><b>Phone:</b> {order.address?.phone || "N/A"}</p>
              <p><b>Email:</b> {order.address?.email || "N/A"}</p>
              <p><b>City:</b> {order.address?.city || "N/A"}</p>
              <p><b>Pincode:</b> {order.address?.zipcode || "N/A"}</p>
              <p><b>Street:</b> {order.address?.street || "N/A"}</p>
              <p><b>Payment:</b> {order.paymentStatus || "PENDING"}</p>

              <div className="items-list">
                <h4>Items:</h4>
                {(order.items || []).map((item, i) => (
                  <div key={i} className="item-card">
                    <img
                      src={`${url}/images/${encodeURIComponent(item.image || "")}`}
                      alt={item.name}
                      onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                    />
                    <div className="item-info">
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="hide-btn" onClick={() => {wonAudio.play(); hideOrder(order._id)}}>Hide</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {newOrderPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h3>🆕 New Order</h3>
            <p><b>Name:</b> {newOrderPopup.address?.firstName || "N/A"}</p>
            <p><b>Amount:</b> ₹{newOrderPopup.amount || 0}</p>
            <button onClick={() =>{orderAudio.pause(); orderAudio.currentTime = 0; setNewOrderPopup(null)}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

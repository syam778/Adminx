
import React, { useEffect, useRef, useState, useContext } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const oldAudio = new Audio("/Audios/order.mp3");
  const doneAudio = new Audio("/Audios/done.mp3");
  const errorAudio = new Audio("/Audios/error.mp3");
  const [newOrderPopup, setNewOrderPopup] = useState(null);
  
  const [distanceData, setDistanceData] = useState({});//map
  const RATE_PER_KM = 15; //map

  const navigate = useNavigate();
  const { url } = useContext(AdminContext);

  // 🔊 Audio Refs (use only 1 for order sound)
  const orderAudioRef = useRef(null);
  const doneAudioRef = useRef(null);
  const submitAudioRef = useRef(null);
  const errorAudioRef = useRef(null);

  // 🔐 Unlock flag
  const audioUnlockedRef = useRef(false);

  // 🆕 detect new order
  const prevIdsRef = useRef(new Set());
  const firstLoadRef = useRef(true);

  // 🔁 loop control
  const orderLoopingRef = useRef(false);

  // ✅ Unlock audio (required by browser)
  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;

    const refs = [orderAudioRef, doneAudioRef, submitAudioRef, errorAudioRef];

    refs.forEach((ref) => {
      if (!ref.current) return;

      ref.current.volume = 1;
      ref.current
        .play()
        .then(() => {
          ref.current.pause();
          ref.current.currentTime = 0;
        })
        .catch(() => {});
    });

    audioUnlockedRef.current = true;
    toast.success("🔊 Sound enabled");
    doneAudio.play()
  };

  // ✅ Vibrate (Mobile)
  const vibratePhone = () => {
    try {
      if ("vibrate" in navigator) {
        // Zomato style vibration pattern
        navigator.vibrate([500, 200, 500, 200, 800]);
        oldAudio.play()
      }
    } catch (err) {}
  };

  // 🔥 Start new order alarm (loop)
  const startOrderAlarm = () => {
    if (!audioUnlockedRef.current) return;
    if (!orderAudioRef.current) return;

    try {
      orderLoopingRef.current = true;
      orderAudioRef.current.loop = true;
      orderAudioRef.current.currentTime = 0;

      orderAudioRef.current.play().catch(() => {});
      vibratePhone();
    } catch (err) {}
  };

  // 🛑 Stop alarm
  const stopOrderAlarm = () => {
    try {
      orderLoopingRef.current = false;

      if (orderAudioRef.current) {
        orderAudioRef.current.pause();
        orderAudioRef.current.currentTime = 0;
        orderAudioRef.current.loop = false;
      }

      // stop vibration
      if ("vibrate" in navigator) navigator.vibrate(0);
    } catch (err) {}
  };

  // 🔁 Fetch orders
  const fetchAllOrders = async () => {
    /*const extractLatLng = (link) => {
  if (!link) return null;

  const match = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  if (!match) return null;

  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2]),
  };
};

const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return R * c;
};
 try {
    const res = await axios.get(url + "/api/order/list");

    if (res.data.success) {
      const newOrders = res.data.data || [];

      const tempDistanceData = {};

      newOrders.forEach((order) => {
        try {
          const storeLink =
            order?.items?.[0]?.linkdata;

          const userLink =
            order?.address?.linkdata;

          console.log("STORE LINK:", storeLink);
          console.log("USER LINK:", userLink);

          if (!storeLink || !userLink) return;

          const storeLoc =
            extractLatLng(storeLink);

          const userLoc =
            extractLatLng(userLink);

          console.log("STORE LOC:", storeLoc);
          console.log("USER LOC:", userLoc);

          if (!storeLoc || !userLoc) return;

          const km = calculateDistanceKm(
            storeLoc.lat,
            storeLoc.lng,
            userLoc.lat,
            userLoc.lng
          );

          const finalKm = Number(
            km.toFixed(2)
          );

          tempDistanceData[order._id] = {
            distanceKm: finalKm,
            deliveryCharge: Math.ceil(
              finalKm * RATE_PER_KM
            ),
          };
        } catch (err) {
          console.log(err);
        }
      });

      setDistanceData(tempDistanceData);

      // Existing Order Detection Code
      const newIds = new Set(
        newOrders.map((o) => o._id)
      );

      const prevIds = prevIdsRef.current;

      if (!firstLoadRef.current) {
        const newlyArrived = newOrders.filter(
          (o) => !prevIds.has(o._id)
        );

        if (newlyArrived.length > 0) {
          setNewOrderPopup(newlyArrived[0]);
          startOrderAlarm();
        }
      }

      firstLoadRef.current = false;
      prevIdsRef.current = newIds;

      setOrders(newOrders);
    }
  } catch (err) {
    console.error("FETCH ERROR 👉", err);
  }
};*/






    try {
      const res = await axios.get(url + "/api/order/list");

      if (res.data.success) {
        const newOrders = res.data.data || [];
        

        // detect new order
        const newIds = new Set(newOrders.map((o) => o._id));
        const prevIds = prevIdsRef.current;

        if (!firstLoadRef.current) {
          const newlyArrived = newOrders.filter((o) => !prevIds.has(o._id));

          if (newlyArrived.length > 0) {
            // show popup
            setNewOrderPopup(newlyArrived[0]);

            // 🔥 play alarm + vibrate
            startOrderAlarm();
          }
        }

        firstLoadRef.current = false;
        prevIdsRef.current = newIds;
        setOrders(newOrders);
      }
    } catch (err) {
      console.error("FETCH ERROR 👉", err);
      toast.error("Server error while fetching orders");
      errorAudioRef.current?.play().catch(() => {});
    }
  };












  // ✅ Update ORDER status
  const statusHandler = async (status, orderId) => {
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId,
        status,
      });

      if (res.data.success) {
        toast.success("Order status updated ✅");
        doneAudioRef.current?.play().catch(() => {});

        // stop alarm if this is popup order
        if (newOrderPopup?._id === orderId) {
          stopOrderAlarm();
          setNewOrderPopup((prev) => ({ ...prev, status }));
        }

        fetchAllOrders();
      } else {
        toast.error(res.data.message || "Order status update failed ❌");
      }
    } catch (err) {
      console.error("STATUS ERROR 👉", err);
      toast.error("Order status update failed ❌");
      errorAudioRef.current?.play().catch(() => {});
    }
  };





  // ✅ Update PAYMENT status
  const paymentStatusHandler = async (paymentStatus, orderId) => {
    try {
      const res = await axios.post(url + "/api/order/update-payment-status", {
        orderId,
        paymentStatus,
      });

      if (res.data.success) {
        toast.success("Payment status updated ✅");
        doneAudioRef.current?.play().catch(() => {});

        if (newOrderPopup?._id === orderId) {
          setNewOrderPopup((prev) => ({ ...prev, paymentStatus }));
        }

        fetchAllOrders();
      } else {
        toast.error(res.data.message || "Payment status update failed ❌");
      }
    } catch (err) {
      console.error("PAYMENT STATUS ERROR 👉", err);
      toast.error("Payment status update failed ❌");
      errorAudioRef.current?.play().catch(() => {});
    }
  };

  // ❌ Remove order
  const removeOrder = async (id) => {
    try {
      const res = await axios.post(`${url}/api/order/remove`, { id });

      if (res.data.success) {
        toast.success("Order removed ✅");
        doneAudioRef.current?.play().catch(() => {});

        if (newOrderPopup?._id === id) {
          stopOrderAlarm();
          setNewOrderPopup(null);
        }

        fetchAllOrders();
      } else {
        toast.error(res.data.message || "Remove failed ❌");
      }
    } catch (err) {
      console.error("REMOVE ERROR 👉", err);
      toast.error("Server error ❌");
      errorAudioRef.current?.play().catch(() => {});
    }
  };

  // ✅ SEND SINGLE ORDER TO DELIVERY PAGE
  const sendSingleOrder = (order) => {
    if (!order || !order._id) {
      toast.error("Order ID missing ❌");
      return;
    }

    const cleanOrder = {
      _id: order._id,
      address: order.address || {},
      amount: order.amount || 0,
      status: order.status || "pending",
      items: order.items || [],
      paymentStatus: order.paymentStatus || "PENDING",
      paymentScreenshot: order.paymentScreenshot || "",
      paymentMethod: order.paymentMethod || "online",
      assignedTo: order.assignedTo || null,
    };

    localStorage.setItem("selectedOrder", JSON.stringify(cleanOrder));
    doneAudioRef.current?.play().catch(() => {});
    navigate("/delivery/get");
  };
  useEffect(() => {
  if (newOrderPopup) {
    oldAudio.play()
    // 📳 vibration (mobile)
    if ("vibrate" in navigator) {
      navigator.vibrate([300, 150, 300]);
    }
  }
}, [newOrderPopup]);








  // 🔁 Auto refresh
  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  

  // 🛑 Stop alarm when popup closed
  const closePopup = () => {
    stopOrderAlarm();
    setNewOrderPopup(null);
  };





  


  return (
    <div className="order" style={{ background: "#eee" }} onClick={unlockAudio}>
      {/* 🔊 Audios */}
      <audio ref={orderAudioRef} src="/Audios/order.mp3" preload="auto" />
      <audio ref={doneAudioRef} src="/Audios/done.mp3" preload="auto" />
      <audio ref={submitAudioRef} src="/Audios/submit2.mp3" preload="auto" />
      <audio ref={errorAudioRef} src="/Audios/error.mp3" preload="auto" />

      <h3>Order Page</h3>

      {/* Orders list */}
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={order._id}>
            <h4 className="order-number">Order #{index + 1}</h4>

            <p>
              <b>Order Id:</b> {order._id}
            </p>

            <p style={{ marginTop: "10px" }}>
              <b>Payment Method:</b>{" "}
              <span style={{ color: "blue" }}>
                {order.paymentMethod || "online"}
              </span>
            </p>

            {order.status !== "pending" && (
              <p>
                Status: <b>{order.status}</b>
              </p>
            )}

            {/* Items */}
            <div className="items-list">
              <h4>Items</h4>




                     {/*map data 

                <p>
  Distance:
  {" "}
  {distanceData[order._id]?.distanceKm || 0}
  KM
</p>

<p>
  Delivery Charge:
  ₹{distanceData[order._id]?.deliveryCharge || 0}
</p>
*/}

              {(order.items || []).map((item, i) => (
                <div className="item-card" key={i}>
                  {/* 🔥 Food image path 
                  <img
                    src={`${url}/uploads/${encodeURIComponent(item.image || "")}`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />*/}
                  <img src={item.image} alt={item.name} />

               
                  
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p>Item Qty: {item.quantity}</p>
                    <p>Price ₹ {item.price}</p>
                    <p>
                      Total Price : ₹
                      {(item.price || 0) * (item.quantity || 1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="order-item-name">
              Name - {order?.address?.firstName || "N/A"}{" "}
              {order?.address?.lastName || ""}
            </p>

            <div className="order-item-add">
              <p>Gmail - {order?.address?.email || "N/A"}</p>
              <p>City - {order?.address?.city || "N/A"}</p>
              <p>Pincode - {order?.address?.zipcode || "N/A"}</p>
            </div>

            <div className="phone">
              {order?.address?.phone && (
                <a href={`tel:${order.address.phone}`} className="call-btn">
                  📞 Call Customer
                </a>
              )}

              <p>Number - {order?.address?.phone || "N/A"}</p>
              <p>Age - {order?.address?.age || "N/A"}</p>
              <p>Address - {order?.address?.street || "N/A"}</p>
            </div>

            <p>
              {order?.address?.linkdata ? (
                <a href={order.address.linkdata} target="_blank" rel="noreferrer">
                  <img className="marker" src={assets.lmarker} alt="" />
                  View Map
                </a>
              ) : (
                "No Map"
              )}
            </p>

            <p className="len">Items : {(order.items || []).length}</p>
            <p className="amount">₹{order.amount || 0}</p>

            {/* Status select */}
            <select
              onChange={(e) => statusHandler(e.target.value, order._id)}
              value={order.status ? order.status : "pending"}
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="pickup">Pickup</option>
              <option value="out_for_delivery">Out For Delivery</option>
              <option value="delivered">Delivered</option>
            </select>

            {/* Payment status */}
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Payment Status:{" "}
              <span>{order.paymentStatus ? order.paymentStatus : "PENDING"}</span>
            </p>

            <div className="topbtn">
              <button className="remove" onClick={() => removeOrder(order._id)}>
                Remove
              </button>

              <button className="removem" onClick={() => sendSingleOrder(order)}>
                Send
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🆕 New Order Popup */}
      {newOrderPopup &&  (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h3>🆕 New Order</h3>

            <p>
              <b>Name:</b> {newOrderPopup?.address?.firstName || "N/A"}{" "}
              {newOrderPopup?.address?.lastName || ""}
            </p>

            <p>
              <b>Phone:</b> {newOrderPopup?.address?.phone || "N/A"}
            </p>

            <p>
              <b>Amount:</b> ₹{newOrderPopup.amount || 0}
            </p>

            <p>
              <b>Payment Method:</b> {newOrderPopup.paymentMethod || "online"}
            </p>

            {newOrderPopup.paymentScreenshot ? (
              <div style={{ marginTop: "10px" }}>
                <p>
                  <b>Payment Screenshot:</b>
                </p>

                <img
                  src={`${url}/uploads/payments/${encodeURIComponent(
                    newOrderPopup.paymentScreenshot
                  )}`}
                  alt="Payment Screenshot"
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "2px solid #ddd",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              </div>
            ) : (
              <p style={{ color: "red" }}>❌ No Screenshot Uploaded</p>
            )}

            {newOrderPopup.paymentStatus !== "SUCCESS" ? (
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  style={{ background: "green", color: "white", padding: "10px" }}
                  onClick={() =>
                    paymentStatusHandler("SUCCESS", newOrderPopup._id)
                  }
                >
                  ✅ SUCCESS
                </button>

                <button
                  style={{ background: "red", color: "white", padding: "10px" }}
                  onClick={() => paymentStatusHandler("FAILED", newOrderPopup._id)}
                >
                  ❌ FAILED
                </button>

                <button
                  style={{
                    background: "orange",
                    color: "white",
                    padding: "10px",
                  }}
                  onClick={() =>
                    paymentStatusHandler("PENDING", newOrderPopup._id)
                  }
                >
                  ⏳ PENDING
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  style={{ background: "green", color: "white", padding: "10px" }}
                  onClick={() => statusHandler("assigned", newOrderPopup._id)}
                >
                  ✅ RECEIVED
                </button>

                <button
                  style={{ background: "red", color: "white", padding: "10px" }}
                  onClick={() => removeOrder(newOrderPopup._id)}
                >
                  ❌ CANCEL
                </button>
              </div>
            )}

            <button style={{ marginTop: "15px" }} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;

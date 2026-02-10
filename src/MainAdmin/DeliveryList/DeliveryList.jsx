/*import { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios";
import "./DeliveryList.css";

const BASE_URL = "http://localhost:3000/api";

const DeliveryList = () => {
  const { delBoyList = [], fetchDelBoys } = useContext(AdminContext);

  const [order, setOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  // Load selected order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (err) {
        console.error("Invalid order data");
      }
    }
  }, []);

  // Fetch delivery boys
  useEffect(() => {
    fetchDelBoys();
  }, [fetchDelBoys]);

  // Only ONLINE delivery boys
  const onlineBoys = delBoyList.filter((boy) => boy.isOnline === true);

  // Assign order
  const assignOrder = async (boy) => {
    if (!order?._id) {
      alert("❌ No order selected");
      return;
    }

    setLoadingId(boy._id);

    try {
      const res = await axios.post(`${BASE_URL}/assignorder/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });

      if (res.data.success) {
        alert(`✅ Order assigned to ${boy.name}`);
        localStorage.removeItem("selectedOrder");
        setOrder(null);
        fetchDelBoys();
      } else {
        alert(res.data.message || "❌ Assignment failed");
      }
    } catch (err) {
      console.error("ASSIGN ERROR", err);
      alert("❌ Server error");
    } finally {
      setLoadingId(null);
    }
  };

  // Update order status
  const updateStatus = async (newStatus) => {
    if (!order?._id) return;

    setStatusLoadingId(order._id);

    try {
      const res = await axios.put(`${BASE_URL}/assignorder/status`, {
        orderId: order._id,
        status: newStatus,
      });

      if (res.data.success) {
        alert(`✅ Status updated to "${newStatus}"`);
        setOrder(res.data.order);

        // If delivered, remove from selection
        if (newStatus === "delivered") {
          localStorage.removeItem("selectedOrder");
          setOrder(null);
        }
      } else {
        alert(res.data.message || "❌ Status update failed");
      }
    } catch (err) {
      console.error("STATUS UPDATE ERROR", err);
      alert("❌ Server error");
    } finally {
      setStatusLoadingId(null);
    }
  };

  return (
    <div className="delivery-list">
      <h2>🚴 Assign & Track Orders</h2>

      
      {order ? (
        <div className="order-card">
          <h3>📦 Selected Order</h3>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
          <p><b>Phone:</b> {order.address?.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>
          <p><b>Status:</b> <span className={`status ${order.status.replace(/\s/g, "")}`}>{order.status.toUpperCase()}</span></p>

          {order.status === "assigned" && (
            <button
              className="status-btn pickup"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("pickup")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Pickup"}
            </button>
          )}
          {order.status === "pickup" && (
            <button
              className="status-btn out-for-delivery"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("out for delivery")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Out For Delivery"}
            </button>
          )}
          {order.status === "out for delivery" && (
            <button
              className="status-btn delivered"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("delivered")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Delivered"}
            </button>
          )}
        </div>
      ) : (
        <p className="no-order">❌ No Order Selected</p>
      )}

      
      <h3 className="online-title">🟢 Online Delivery Boys</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="online-text">ONLINE</td>
                <td>
                  <button
                    className="assign-btn"
                    disabled={loadingId === boy._id || !order}
                    onClick={() => assignOrder(boy)}
                  >
                    {loadingId === boy._id ? "Assigning..." : "Assign"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;  //main code
*



import { useEffect, useState, useContext } from "react"; //main and deep code
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios";
import "./DeliveryList.css";

const BASE_URL = "http://localhost:3000/api";

const DeliveryList = () => {
  const { delBoyList = [], fetchDelBoys } = useContext(AdminContext);

  const [order, setOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live timer updates every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load selected order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (err) {
        console.error("Invalid order data");
      }
    }
  }, []);

  // Fetch delivery boys
  useEffect(() => {
    fetchDelBoys();
  }, [fetchDelBoys]);

  const onlineBoys = delBoyList.filter((boy) => boy.isOnline === true);

  // Assign order
  const assignOrder = async (boy) => {
    if (!order?._id) return alert("❌ No order selected");
    setLoadingId(boy._id);

    try {
      const res = await axios.post(`${BASE_URL}/assignorder/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });

      if (res.data.success) {
        alert(`✅ Order assigned to ${boy.name}`);
        localStorage.removeItem("selectedOrder");
        setOrder(res.data.assignedOrder); // make sure assignedAt is included
        fetchDelBoys();
      } else {
        alert(res.data.message || "❌ Assignment failed");
      }
    } catch (err) {
      console.error("ASSIGN ERROR", err);
      alert("❌ Server error");
    } finally {
      setLoadingId(null);
    }
  };

  // Update order status
  const updateStatus = async (newStatus) => {
    if (!order?._id) return;

    setStatusLoadingId(order._id);
    try {
      const res = await axios.put(`${BASE_URL}/assignorder/status`, {
        orderId: order._id,
        status: newStatus,
      });

      if (res.data.success) {
        setOrder(res.data.order); // update order info

        if (newStatus === "delivered") {
          localStorage.removeItem("selectedOrder");
          setOrder(null);
        }
      } else {
        alert(res.data.message || "❌ Status update failed");
      }
    } catch (err) {
      console.error("STATUS UPDATE ERROR", err);
      alert("❌ Server error");
    } finally {
      setStatusLoadingId(null);
    }
  };

  // Format milliseconds to mm:ss or HH:mm:ss
  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  // Calculate live delivery duration
  const getDeliveryDuration = (order) => {
    if (!order?.assignedAt) return "-";
    const start = new Date(order.assignedAt);
    const end = order.status === "delivered" && order.deliveredAt
      ? new Date(order.deliveredAt)
      : currentTime; // live timer for in-progress
    return formatDuration(end - start);
  };

  return (
    <div className="delivery-list">
      <h2>🚴 Assign & Track Orders</h2>

      
      {order ? (
        <div className="order-card">
          <h3>📦 Selected Order</h3>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
          <p><b>Phone:</b> {order.address?.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>
          <p><b>Status:</b> <span className={`status ${order.status.replace(/\s/g, "")}`}>{order.status.toUpperCase()}</span></p>

          
          <p><b>Time Since Assignment:</b> {getDeliveryDuration(order)}</p>

          
          {order.status === "assigned" && (
            <button
              className="status-btn pickup"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("pickup")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Pickup"}
            </button>
          )}
          {order.status === "pickup" && (
            <button
              className="status-btn out-for-delivery"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("out for delivery")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Out For Delivery"}
            </button>
          )}
          {order.status === "out for delivery" && (
            <button
              className="status-btn delivered"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("delivered")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Delivered"}
            </button>
          )}
        </div>
      ) : (
        <p className="no-order">❌ No Order Selected</p>
      )}

      
      <h3 className="online-title">🟢 Online Delivery Boys</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="online-text">ONLINE</td>
                <td>
                  <button
                    className="assign-btn"
                    disabled={loadingId === boy._id || !order}
                    onClick={() => assignOrder(boy)}
                  >
                    {loadingId === boy._id ? "Assigning..." : "Assign"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList; // main deep code

*
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import "./DeliveryList.css";

const BASE_URL = "http://localhost:3000/api";

const DeliveryList = () => {
  const { delBoyList = [], fetchDelBoys } = useContext(AdminContext);

  const [order, setOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ⏱ Live timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 📦 Load selected order
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (err) {
        console.error("Invalid order data");
      }
    }
  }, []);

  // 🚴 Fetch delivery boys
  useEffect(() => {
    fetchDelBoys();
  }, [fetchDelBoys]);

  const onlineBoys = delBoyList.filter((boy) => boy.isOnline === true);

  // ✅ Assign Order
  const assignOrder = async (boy) => {
    if (!order?._id) {
      alert("❌ No order selected");
      return;
    }

    setLoadingId(boy._id);

    try {
      const res = await axios.post(`${BASE_URL}/assignorder/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });

      if (res.data.success) {
        alert(`✅ Order assigned to ${boy.name}`);
        localStorage.removeItem("selectedOrder");
        setOrder(res.data.assignedOrder); // must include assignedAt
        fetchDelBoys();
      } else {
        alert(res.data.message || "❌ Assignment failed");
      }
    } catch (err) {
      console.error("ASSIGN ERROR", err);
      alert("❌ Server error");
    } finally {
      setLoadingId(null);
    }
  };

  // 🔄 Update Order Status
  const updateStatus = async (newStatus) => {
    if (!order?._id) return;

    setStatusLoadingId(order._id);

    try {
      const res = await axios.put(`${BASE_URL}/assignorder/status`, {
        orderId: order._id,
        status: newStatus,
      });

      if (res.data.success) {
        setOrder(res.data.order);

        if (newStatus === "delivered") {
          localStorage.removeItem("selectedOrder");
          setOrder(null);
        }
      } else {
        alert(res.data.message || "❌ Status update failed");
      }
    } catch (err) {
      console.error("STATUS UPDATE ERROR", err);
      alert("❌ Server error");
    } finally {
      setStatusLoadingId(null);
    }
  };

  // ⏱ Format time
  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };

  // ⌛ Live delivery duration
  const getDeliveryDuration = (order) => {
    if (!order?.assignedAt) return "-";

    const start = new Date(order.assignedAt);
    const end =
      order.status === "delivered" && order.deliveredAt
        ? new Date(order.deliveredAt)
        : currentTime;

    return formatDuration(end - start);
  };

  return (
    <div className="delivery-list">
      <h2>🚴 Assign & Track Orders</h2>

      
      {order ? (
        <div className="order-card">
          <h3>📦 Selected Order</h3>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
          <p><b>Phone:</b> {order.address?.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status ${order.status?.replace(/\s/g, "")}`}>
              {order.status?.toUpperCase()}
            </span>
          </p>

          <p>
            <b>Time Since Assignment:</b> {getDeliveryDuration(order)}
          </p>

          
          {order.status === "assigned" && (
            <button
              className="status-btn pickup"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("pickup")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Pickup"}
            </button>
          )}

          {order.status === "pickup" && (
            <button
              className="status-btn out-for-delivery"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("out for delivery")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Out For Delivery"}
            </button>
          )}

          {order.status === "out for delivery" && (
            <button
              className="status-btn delivered"
              disabled={statusLoadingId === order._id}
              onClick={() => updateStatus("delivered")}
            >
              {statusLoadingId === order._id ? "Updating..." : "Delivered"}
            </button>
          )}
        </div>
      ) : (
        <p className="no-order">❌ No Order Selected</p>
      )}

      
      <h3 className="online-title">🟢 Online Delivery Boys</h3>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="online-text">ONLINE</td>
                <td>
                  <button
                    className="assign-btn"
                    disabled={loadingId === boy._id || !order?._id}
                    onClick={() => assignOrder(boy)}
                  >
                    {loadingId === boy._id ? "Assigning..." : "Assign"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
*
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import "./DeliveryList.css";

const BASE_URL = "http://localhost:3000/api";

const DeliveryList = () => {
  const { delBoyList = [], fetchDelBoys, doneAudio, errorAudio, submitAudio, } = useContext(AdminContext);

  const [order, setOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        console.error("Invalid order in localStorage");
      }
    }
  }, []);

  
  useEffect(() => {
    fetchDelBoys();
  }, [fetchDelBoys]);

  const onlineBoys = delBoyList.filter((boy) => boy.isOnline === true);

  const assignOrder = async (boy) => {
    if (!order?._id) {
      alert("❌ No order selected");
      return;
    }

    setLoadingId(boy._id);

    try {
      const res = await axios.post(`${BASE_URL}/assignorder/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });

      if (res.data.success) {
        alert(`✅ Order assigned to ${boy.name}`);
        setOrder(res.data.assignedOrder);
        localStorage.setItem(
          "selectedOrder",
          JSON.stringify(res.data.assignedOrder)
        );
        fetchDelBoys();
        submitAudio.play()

      } else {
        alert(res.data.message);
        errorAudio.play()
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
      errorAudio.play()
    } finally {
      setLoadingId(null);
    }
  };

  const updateStatus = async (status) => {
    if (!order?._id) return;

    setStatusLoading(true);

    try {
      const res = await axios.put(`${BASE_URL}/assignorder/status`, {
        orderId: order._id,
        status, // ASSIGNED | PICKUP | OUT_FOR_DELIVERY | DELIVERED
      });

      if (res.data.success) {
        setOrder(res.data.order);

        if (status === "DELIVERED") {
          localStorage.removeItem("selectedOrder");
          setOrder(null);
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Status update failed");
    } finally {
      setStatusLoading(false);
    }
  };

  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };

  const getDeliveryDuration = (order) => {
    if (!order?.assignedAt) return "-";

    const start = new Date(order.assignedAt);
    const end =
      order.status === "DELIVERED" && order.deliveredAt
        ? new Date(order.deliveredAt)
        : currentTime;

    return formatDuration(end - start);
  };

  return (
    <div className="delivery-list">
      <h2>🚴 Assign & Track Orders</h2>

      {order ? (
        <div className="order-card">
          <h3>📦 Selected Order</h3>

          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
          {order?.address?.phone && (
            <a href={`tel:${order.address.phone}`} className="call-btn">
              📞 Call Customer
            </a>
          )}
          <p><b>Phone:</b> {order.address?.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </p>

          <p>
            <b>Time Since Assignment:</b> {getDeliveryDuration(order)}
          </p>
          {order.status === "ASSIGNED" && (
            <button
              className="status-btn pickup"
              disabled={statusLoading}
              onClick={() => updateStatus("PICKUP")}
            >
              Pickup
            </button>
          )}

          {order.status === "PICKUP" && (
            <button
              className="status-btn out-for-delivery"
              disabled={statusLoading}
              onClick={() => updateStatus("OUT_FOR_DELIVERY")}
            >
              Out For Delivery
            </button>
          )}

          {order.status === "OUT_FOR_DELIVERY" && (
            <button
              className="status-btn delivered"
              disabled={statusLoading}
              onClick={() => updateStatus("DELIVERED")}
            >
              Delivered
            </button>
          )}
        </div>
      ) : (
        <p className="no-order">❌ No Order Selected</p>
      )}

      <h3 className="online-title">🟢 Online Delivery Boys</h3>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="online-text">ONLINE</td>
                <td>
                  <button
                    className="assign-btn"
                    disabled={loadingId === boy._id || !order}
                    onClick={() => assignOrder(boy)}
                  >
                    {loadingId === boy._id ? "Assigning..." : "Assign"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
*/
import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import "./DeliveryList.css";

//const BASE_URL = "http://localhost:3000/api";

const DeliveryList = () => {
  const { delBoyList = [], fetchDelBoys, doneAudio, errorAudio, submitAudio,url } = useContext(AdminContext);

  const [order, setOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Safe audio play
  const playAudio = (audio) => {
    try {
      audio.play();
    } catch (err) {
      console.warn("Audio play failed:", err);
    }
  };

  // Save/remove selected order
  const saveOrder = (orderData) => {
    if (orderData) localStorage.setItem("selectedOrder", JSON.stringify(orderData));
    else localStorage.removeItem("selectedOrder");
  };

  // Live timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load selected order
  useEffect(() => {
    const savedOrder = localStorage.getItem("selectedOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        console.error("Invalid order in localStorage");
      }
    }
  }, []);

  // Fetch delivery boys on mount + every 10s
  const refreshDeliveryBoys = useCallback(() => {
    fetchDelBoys();
  }, [fetchDelBoys]);

  useEffect(() => {
    refreshDeliveryBoys();
    const interval = setInterval(refreshDeliveryBoys, 10000);
    return () => clearInterval(interval);
  }, [refreshDeliveryBoys]);

  // Separate online/offline boys
  const onlineBoys = delBoyList.filter(boy => boy.isOnline).sort((a, b) => a.name.localeCompare(b.name));
  const offlineBoys = delBoyList.filter(boy => !boy.isOnline).sort((a, b) => a.name.localeCompare(b.name));

  // Assign order
  const assignOrder = async (boy) => {
    if (!order?._id) return alert("❌ No order selected");

    setLoadingId(boy._id);
    try {
      const res = await axios.post(`${url}/api/assignorder/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });

      if (res.data.success) {
        setOrder(res.data.assignedOrder);
        saveOrder(res.data.assignedOrder);
        refreshDeliveryBoys();
        playAudio(submitAudio);
        alert(`✅ Order assigned to ${boy.name}`);
      } else {
        alert(res.data.message);
        playAudio(errorAudio);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
      playAudio(errorAudio);
    } finally {
      setLoadingId(null);
    }
  };

  // Update order status
  const updateStatus = async (status) => {
    if (!order?._id) return;

    setStatusLoading(true);
    try {
      const res = await axios.put(`${url}/api/assignorder/status`, {
        orderId: order._id,
        status,
      });

      if (res.data.success) {
        setOrder(res.data.order);
        if (status === "DELIVERED") {
          saveOrder(null);
          setOrder(null);
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Status update failed");
    } finally {
      setStatusLoading(false);
    }
  };

  // Format duration
  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };

  const getDeliveryDuration = (order) => {
    if (!order?.assignedAt) return "Not assigned";
    const start = new Date(order.assignedAt);
    const end =
      order.status === "DELIVERED" && order.deliveredAt
        ? new Date(order.deliveredAt)
        : currentTime;
    return formatDuration(end - start);
  };

  return (
    <div className="delivery-list">
      <h2>🚴 Assign & Track Orders</h2>

      {/* Selected Order */}
      {order ? (
        <div className="order-card">
          <h3>📦 Selected Order</h3>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
          {order.address?.phone && (
            <a href={`tel:${order.address.phone}`} className="call-btn">📞 Call Customer</a>
          )}
          <p><b>Phone:</b> {order.address?.phone}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>
          <p>
            <b>Status:</b> <span className={`status ${order.status}`}>{order.status}</span>
          </p>
          <p><b>Time Since Assignment:</b> {getDeliveryDuration(order)}</p>

          {order.status === "ASSIGNED" && <button className="status-btn pickup" disabled={statusLoading} onClick={() => updateStatus("PICKUP")}>Pickup</button>}
          {order.status === "PICKUP" && <button className="status-btn out-for-delivery" disabled={statusLoading} onClick={() => updateStatus("OUT_FOR_DELIVERY")}>Out For Delivery</button>}
          {order.status === "OUT_FOR_DELIVERY" && <button className="status-btn delivered" disabled={statusLoading} onClick={() => updateStatus("DELIVERED")}>Delivered</button>}
        </div>
      ) : (
        <p className="no-order">❌ No Order Selected</p>
      )}

      {/* Online Delivery Boys */}
      <h3 className="online-title">🟢 Online Delivery Boys</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {onlineBoys.length === 0 ? (
            <tr><td colSpan="6">No delivery boys online</td></tr>
          ) : (
            onlineBoys.map((boy) => (
              <tr key={boy._id}>
                <td>{boy.name}</td>
                <td>{boy.number}</td>
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="online-text">ONLINE</td>
                <td>
                  <button className="assign-btn" disabled={loadingId === boy._id || !order} onClick={() => assignOrder(boy)}>
                    {loadingId === boy._id ? "Assigning..." : "Assign"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Offline Delivery Boys */}
      <h3 className="offline-title">⚪ Offline Delivery Boys</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offlineBoys.length === 0 ? (
            <tr><td colSpan="6">No delivery boys offline</td></tr>
          ) : (
            offlineBoys.map((boy) => (
              <tr key={boy._id}>
                <td>{boy.name}</td>
                <td>{boy.number}</td>
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>
                <td className="offline-text">OFFLINE</td>
                <td>
                  <button className="assign-btn" disabled>Assign</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;

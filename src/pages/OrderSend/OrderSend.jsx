import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./OrderSend.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const OrderSend = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const {url} = useContext(AdminContext);

    const fetchPendingOrders = async () => {
  try {
    const res = await axios.get(`${url}/api/order/list`);

    if (res.data.success) {
      const pending = res.data.data.filter(order =>
        order.status === "Food Processing" ||
        order.status === "Pending" ||
        !order.status
      );

      setPendingOrders(pending);
    }
  } catch (err) {
    toast.error("Server error");
  }
};


    useEffect(() => {
        fetchPendingOrders();
        const interval = setInterval(fetchPendingOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="order-send">
            <h2>📦 Pending Orders ({pendingOrders.length})</h2>

            {pendingOrders.map(order => (
                <div className="order-send-item" key={order._id}>
                    <p><b>Order ID:</b> {order._id}</p>
                    <p>
                        <b>Customer:</b> {order.address.firstName}{" "}
                        {order.address.lastName}
                    </p>

                    <p>
                        <b>Items:</b>{" "}
                        {order.items.map(i => `${i.name}×${i.quantity}`).join(", ")}
                    </p>

                    <p><b>Amount:</b> ₹{order.amount}</p>
                    <p><b>Phone:</b> {order.address.phone}</p>
                    <p><b>City:</b> {order.address.city}</p>

                    <p className="pending-status">🕒 Pending Delivery</p>
                </div>
            ))}

            {pendingOrders.length === 0 && (
                <p>No pending orders 🎉</p>
            )}
        </div>
    );
};

export default OrderSend;

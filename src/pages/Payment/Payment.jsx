import React, { useEffect, useState } from "react";
import "./Payment.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Payment = () => {
    const [orders, setOrders] = useState([]);
    const { orderAudio, doneAudio, errorAudio, submitAudio,url } = useContext(AdminContext);

    // ✅ Fetch Orders
    const fetchOrders = async () => {
        try {
            const res = await axios.get(url + "/api/order/list");

            if (res.data.success) {
                setOrders(res.data.data || []);


            }
        } catch (err) {
            console.log(err.message);
            toast.error("Server error while fetching orders ❌");
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    // ✅ Update Payment Status
    const paymentStatusHandler = async (paymentStatus, orderId) => {
        try {
            const res = await axios.post(url + "/api/order/update-payment-status", {
                orderId,
                paymentStatus, // SUCCESS | FAILED | PENDING
            });

            if (res.data.success) {
                toast.success("Payment status updated ✅");
                fetchOrders();
                doneAudio.play()


            } else {
                toast.error(res.data.message || "Payment update failed ❌");
                doneAudio.play()
            }
        } catch (err) {
            console.log(err.message);
            toast.error("Payment update failed ❌");
            errorAudio.play()
        }
    };

    return (
        <div className="orderpays" style={{  background: "#eee" }}>
            <h3>Payment Page</h3>

            <div className="order-list">
                {orders.map((order, index) => (
                    <div className="order-item" key={order._id}>
                        <h4 className="order-number">Order #{index + 1}</h4>

                        <p>Order Id : {order._id}</p>

                        {/* Items */}
                        <div className="items-list">
                            <h4>Items</h4>

                            {(order.items || []).map((item, i) => (
                                <div className="item-card" key={i}>
                                    

                                    {/*<img
                                        src={`${url}/images/${encodeURIComponent(
                                            item.image || ""
                                        )}`}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/80";
                                        }}
                                    />*/}<img src={item.image} alt={item.name} />

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

                        {/* Address */}
                        <p className="order-item-name">
                            Name - {order?.address?.firstName || "N/A"}{" "}
                            {order?.address?.lastName || ""}
                        </p>

                        <div className="phone">

                            {order?.address?.phone && (
                                <a href={`tel:${order.address.phone}`} className="call-btn"> 
                                    📞 Call Customer
                                </a>
                            )}

                            <p>Number - {order?.address?.phone || "N/A"}</p>
                            <p>City - {order?.address?.city || "N/A"}</p>
                            <p>Zipcode - {order?.address?.zipcode || "N/A"}</p> 
                            <p>Address - {order?.address?.street || "N/A"}</p>
                        </div>

                        <p>
                            Payment Method:{" "}
                            <b>
                                {order.paymentMethod === "offline"
                                    ? "💵 Cash On Delivery"
                                    : "📱 Online (UPI)"}
                            </b>
                        </p>

                        <p className="amount">₹{order.amount || 0}</p>

                        {/* Payment Screenshot */}
                        <div style={{ marginTop: "15px" }}>
                            <h4>Payment Screenshot</h4>
                            {order.paymentScreenshot ? (
                                <img
                                    src={`${url}/uploads/payments/${order.paymentScreenshot}`}
                                     
                                    alt="Payment Screenshot"
                                    style={{
                                        width: "30%",
                                        height: "30%",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        border: "2px solid #ddd",
                                    }}
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300";
                                    }}
                                />
                                

                            ) : (
                                <p style={{ color: "red" }}>❌ No Screenshot Uploaded</p>
                            )}





                        </div>

                        {/* Current Payment Status */}
                        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                            Payment Status:{" "}
                            <span style={{ color: "blue" }}>
                                {order.paymentStatus || "PENDING"}
                            </span>
                        </p>

                        {/* 3 Buttons Always Show */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                            <button
                                style={{ background: "green", color: "white", padding: "10px" }}
                                onClick={() => paymentStatusHandler("SUCCESS", order._id)}
                            >
                                ✅ SUCCESS
                            </button>

                            <button
                                style={{ background: "red", color: "white", padding: "10px" }}
                                onClick={() => paymentStatusHandler("FAILED", order._id)}
                            >
                                ❌ FAILED
                            </button>

                            <button
                                style={{
                                    background: "orange",
                                    color: "white",
                                    padding: "10px",
                                }}
                                onClick={() => paymentStatusHandler("PENDING", order._id)}
                            >
                                ⏳ PENDING
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payment;

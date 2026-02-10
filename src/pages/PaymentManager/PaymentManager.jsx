import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const PaymentManager = () => {
  const [file, setFile] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [payments, setPayments] = useState([]);
  const {url}= useContext(AdminContext);

  // Fetch all payment-pending orders
  const fetchPayments = async () => {
    try {
      const res = await axios.get(url + "/api/payment/list"); // Your backend should return all payment uploads
      if (res.data.success) {
        setPayments(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch payments");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload payment screenshot
  const handleUpload = async () => {
    if (!file || !orderData) {
      toast.error("Select file and fill order data");
      return;
    }

    const formData = new FormData();
    formData.append("paymentScreenshot", file);
    formData.append("orderData", JSON.stringify(orderData));

    try {
      const res = await axios.post(url + "/api/order/payment-pending", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Payment uploaded");
        setFile(null);
        setOrderData({});
        fetchPayments();
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  // Update payment status
  const updatePaymentStatus = async (id, status) => {
    try {
      const res = await axios.post(url + "/api/payment/status", { id, status });
      if (res.data.success) {
        toast.success(`Payment status updated to ${status}`);
        fetchPayments();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Payment Manager</h2>

      {/* Upload section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={!file}>
          Upload Payment
        </button>
      </div>

      {/* Payment pending list */}
      <div>
        {payments.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px" }}>
            <img
              src={`${url}/${p.paymentScreenshot}`} 
              alt="Payment Screenshot"
              style={{ width: "150px", marginBottom: "10px" }}
            />
            <p><b>Order Id:</b> {p._id}</p>
            <p><b>Status:</b> {p.status || "Pending"}</p>

            {/* 3 buttons for status */}
            <div>
              <button
                style={{ marginRight: "10px", backgroundColor: "green", color: "#fff" }}
                onClick={() => updatePaymentStatus(p._id, "Success")}
              >
                Success
              </button>
              <button
                style={{ marginRight: "10px", backgroundColor: "red", color: "#fff" }}
                onClick={() => updatePaymentStatus(p._id, "Fail")}
              >
                Fail
              </button>
              <button
                style={{ backgroundColor: "orange", color: "#fff" }}
                onClick={() => updatePaymentStatus(p._id, "Pending")}
              >
                Pending
              </button>
            </div>

            {/* If status is success, show new order receive / cancel buttons */}
            {p.status === "Success" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{ marginRight: "10px" }}
                  onClick={async () => {
                    try {
                      const res = await axios.post(url + "/api/order/status", {
                        orderId: p._id,
                        status: "Assigned",
                      });
                      if (res.data.success) {
                        toast.success("Order received");
                        fetchPayments();
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error("Receive failed");
                    }
                  }}
                >
                  Receive
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await axios.post(url + "/api/order/remove", { id: p._id });
                      if (res.data.success) {
                        toast.success("Order cancelled");
                        fetchPayments();
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error("Cancel failed");
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentManager;

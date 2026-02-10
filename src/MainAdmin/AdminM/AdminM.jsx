import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";

import DeliveryCreate from "../DeliveryCreate/DeliveryCreate";

const AdminM = () => {
  return (
    <div>
      {/* Top Navbar */}
      <Navbar />

      <div style={{ display: "flex" }}>
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Side Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<h2>Welcome Admin Panel</h2>} />

            {/* Delivery Boy Create Page */}
            <Route path="/delivery-create" element={<DeliveryCreate />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminM;

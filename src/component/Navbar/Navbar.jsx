
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //const {admins, setAdmins,loading, setLoading,fetchAdmins,removeAdmin,url,}= useContext(AdminContext)

  const admin = localStorage.getItem("token");

  /*const logoutHandler = () => {
  localStorage.removeItem("token");
  navigate("/");
};
*/

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src={assets.speed} alt="logo" className="logo-img" />

        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/order">Order</Link>
          <Link to="/payment">Payment</Link>
          <Link to="/delivery/create">Delivery Boy Id</Link>
          <Link to="/condition">Condition</Link>
          {/*{!token ? (
            <button onClick={() => setShowLogin(true) || navigate("/login")}>Login</button>
          ) : ( */}

          {!admin ? (
            <button onClick={() => navigate("/login")}>
              Admin
            </button>
          ) : (
            <div className="navbar-profile">
              <img className="admin" src={assets.admin} alt="admin" />
              <ul className="nav-profile-down">
                <li onClick={() => navigate("/delivery/get")}><p>Delivery List</p></li>
                <hr />
                <li onClick={() => navigate("/admin/get")} ><p>Admin Data</p></li>
                
                <li onClick={() => navigate("/storeverify")}><p>Store Data</p></li>
                <li onClick={() => navigate("/user")} ><p>User Data</p></li>    
                <li onClick={() => navigate("/deliveryinfo")} ><p>Delivery Info</p></li>
                <li onClick={() => navigate("/storeinfo")} ><p>Store Info Data</p></li>
                <li onClick={() => navigate("/delinfo")} ><p>Delivery Info Data</p></li>
                <li onClick={() => navigate("/map")} ><p>Map Data</p></li>
                <li onClick={() => navigate("/online")} ><p>Online Data</p></li>
                <li onClick={() => navigate("/storeverifydata")}><p>Store Data Verify</p></li>
                
                
              </ul>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

///admin/get
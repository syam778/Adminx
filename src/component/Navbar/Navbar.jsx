
/*import React, { useState } from "react";
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

  const logoutHandler = () => {
  localStorage.removeItem("admin");
  navigate("/");
};


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

*/
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  const navigate = useNavigate();

  // ✅ Always check localStorage on load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setAdminToken(token);
  }, []);

  // ✅ Logout
  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdminToken(null);
    navigate("/login");
  };

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

          {/* ✅ Admin Login / Admin Profile */}
          {!adminToken ? (
            <button onClick={() => navigate("/login")}>Admin</button>
          ) : (
            <div className="navbar-profile">
              <img className="admin" src={assets.admin} alt="admin" />

              <ul className="nav-profile-down">
                <li onClick={() => navigate("/delivery/get")}>
                  <p>Delivery List</p>
                </li>
                <hr />

                <li onClick={() => navigate("/admin/get")}>
                  <p>Admin Data</p>
                </li>

                <li onClick={() => navigate("/storeverify")}>
                  <p>Store Data</p>
                </li>

                <li onClick={() => navigate("/user")}>
                  <p>User Data</p>
                </li>

                <li onClick={() => navigate("/deliveryinfo")}>
                  <p>Delivery Info</p>
                </li>

                <li onClick={() => navigate("/storeinfo")}>
                  <p>Store Info Data</p>
                </li>

                <li onClick={() => navigate("/delinfo")}>
                  <p>Delivery Info Data</p>
                </li>

                <li onClick={() => navigate("/map")}>
                  <p>Map Data</p>
                </li>

                <li onClick={() => navigate("/online")}>
                  <p>Online Data</p>
                </li>

                <li onClick={() => navigate("/storeverifydata")}>
                  <p>Store Data Verify</p>
                </li>

                <hr />
                <li onClick={logoutHandler}>
                  <p>Logout</p>
                </li>
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

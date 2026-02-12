/*import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear all stored login data
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("storeId");
    localStorage.removeItem("userId");

    // Optional: clear everything
    // localStorage.clear();

    // ✅ Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ remove admin login data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    // ✅ redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px", fontSize: "22px" }}>
      ⏳ Logging out...
    </div>
  );
};

export default Logout;

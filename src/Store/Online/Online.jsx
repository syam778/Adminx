import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Online.css";
import { AdminContext } from "../../Context/AdminContext";


const Online = () => {
  const {url} = useContext(AdminContext);
  const [form, setForm] = useState({
    name: "",
    number: "",
    gmail: "",
    userSpecialId: "",
    vehicle: "",
  });

  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create delivery boy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${url}/api/delboy/createdelboys`, form);
      if (res.data.success) {
        setMessage(res.data.message);
        setForm({ name: "", number: "", gmail: "", userSpecialId: "", vehicle: "" });
        fetchDeliveryList();
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("❌ Server error");
    }
  };

  // Fetch delivery boys list
  const fetchDeliveryList = async () => {
    try {
      const res = await axios.get(`${url}/api/delboy/get`);
      if (res.data.success) setList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove delivery boy
  const deleteDelivery = async (id) => {
    if (!window.confirm("Remove this delivery boy?")) return;
    try {
      await axios.delete(`${url}/api/delboy/delete/${id}`);
      fetchDeliveryList();
    } catch (error) {
      console.log(error);
    }
  };

  // Set online
  const setOnline = async (id) => {
    try {
      await axios.post(`${url}/api/delboy/online`, { id });
      fetchDeliveryList();
    } catch (error) {
      console.log(error);
    }
  };

  // Set offline
  const setOffline = async (id) => {
    try {
      await axios.post(`${url}/api/delboy/offline`, { id });
      fetchDeliveryList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeliveryList();
  }, []);

  return (
    <div className="admin-delivery">
      <h2>Create Delivery Boy</h2>

      {/* Form */}
      <form className="delivery-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={form.number}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={form.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userSpecialId"
          placeholder="User Special ID"
          value={form.userSpecialId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vehicle"
          placeholder="Vehicle (Bike / Cycle / Car)"
          value={form.vehicle}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>

      {/* Message */}
      {message && (
        <p className={`msg ${message.includes("No delivery") ? "error" : "success"}`}>
          {message}
        </p>
      )}

      {/* Delivery Boy List */}
      <h3>Delivery Boy List</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Gmail</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="7">No delivery boys found</td>
            </tr>
          ) : (
            list.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.number}</td>
                <td>{d.gmail}</td>
                <td>{d.userSpecialId}</td>
                <td>{d.vehicle}</td>
                
                <td>{d.isOnline ? "🟢 Online" : "🔴 Offline"}</td>

                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={d.isOnline === true}
                      onChange={() =>
                        d.isOnline ? setOffline(d._id) : setOnline(d._id)
                      }
                    />
                    <span className="slider">
                      <span className="label-text">
                        {d.isOnline ? "Online" : "Offline"}
                      </span>
                    </span>
                  </label>

                  <button onClick={() => deleteDelivery(d._id)}>❌ Remove</button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Online;

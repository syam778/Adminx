
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./DeliveryCreate.css";
import { AdminContext } from "../../Context/AdminContext";

//const BASE_URL = "http://localhost:3000/api/delivery";

const DeliveryCreate = () => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    gmail: "",
    userSpecialId: "",
    vehicle: "",
  });

  const { delBoyList, fetchDelBoys, doneAudio, errorAudio, submitAudio, url } = useContext(AdminContext);
  const [message, setMessage] = useState("");

  // 🔁 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Create delivery boy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${url}/api/delivery/create`, form);

      if (res.data.success) {
        setMessage("✅ Delivery boy created");
        setForm({
          name: "",
          number: "",
          gmail: "",
          userSpecialId: "",
          vehicle: "",
        });
        fetchDelBoys();
        submitAudio.play() // 🔥 refresh list
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("❌ Server error");
      errorAudio.play()
    }
  };

  // ❌ Remove delivery boy
  const deleteDelivery = async (id) => {
    if (!window.confirm("Remove this delivery boy?")) return;

    try {
      await axios.delete(`${url}/api/delivery/delete/${id}`);
      fetchDelBoys();
      errorAudio.play()
    } catch (error) {
      console.error(error);
    }
  };

  // 📦 Load list on page load
  useEffect(() => {
    fetchDelBoys();
  }, []);

  return (
    <div className="admin-delivery">
      <h2>Create Delivery Boy</h2>

      <form className="delivery-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} required />
        <input name="gmail" placeholder="Gmail" value={form.gmail} onChange={handleChange} required />
        <input name="userSpecialId" placeholder="User Special ID" value={form.userSpecialId} onChange={handleChange} required />
        <input name="vehicle" placeholder="Vehicle" value={form.vehicle} onChange={handleChange} required />

        <button type="submit">Create</button>
      </form>

      {message && <p className="msg">{message}</p>}

      <h3>Delivery Boy List</h3>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Gmail</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {delBoyList.length === 0 ? (
            <tr>
              <td colSpan="6">No delivery boys found</td>
            </tr>
          ) : (
            delBoyList.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                {d.number && (
                  <a href={`tel:${d.number}`} className="call-btn">
                    📞 Call Customer
                  </a>
                )}

                <td>{d.gmail}</td>
                <td>{d.userSpecialId}</td>
                <td>{d.vehicle}</td>
                <td>
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

export default DeliveryCreate;






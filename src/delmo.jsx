/*import { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryList.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const DELBOY_URL = "http://localhost:3000/api/delboy";
const DELIVERY_URL = "http://localhost:3000/api/delivery";

const DeliveryList = () => {
  const [delBoyList, setDelBoyList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const {fetchDelBoys,
      fetchDeliveries,
    fetchAllOrders,
    fetchDeliveryBoys,} = useContext(AdminContext)

  // ⏰ Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch delivery boys


  


  


  

  // Toggle online/offline
  const toggleStatus = async (boy) => {
    try {
      if (boy.status === "online") {
        await axios.post(`${DELBOY_URL}/offline`, { id: boy._id });
      } else {
        await axios.post(`${DELBOY_URL}/online`, { id: boy._id });
      }
      fetchDelBoys();
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate total duty time (online only)
  const getTotalDuty = (boy) => {
    let totalMinutes = boy.totalOnlineMinutes || 0;

    if (boy.status === "online" && boy.onlineAt) {
      const diff = Math.floor((new Date() - new Date(boy.onlineAt)) / 60000);
      totalMinutes += diff;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // Check if a delivery is active (based on online delboy)
  const isActiveDelBoy = (userSpecialId) =>
    delBoyList.some((d) => d.userSpecialId === userSpecialId);





  useEffect(() => {
    fetchDelBoys();
    fetchDeliveries();
    
    fetchAllOrders()
    fetchDeliveryBoys()
  
  const interval = setInterval(fetchAllOrders, 5000);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="delivery-list">
      <h2>Delivery & Delivery Boy Status</h2>

      {/* Live Date & Time *
      <div className="live-time">
        📅 {currentTime.toLocaleDateString()} | ⏰ {currentTime.toLocaleTimeString()}
      </div>

      {/* Delivery Boys Table *
      <h3>Delivery Boy List</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Special ID</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Total Duty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {delBoyList.length === 0 ? (
            <tr>
              <td colSpan="8">No delivery boys found</td>
            </tr>
          ) : (
            delBoyList.map((boy) => (
              <tr key={boy._id} className={boy.status === "online" ? "row-online" : "row-offline"}>
                <td>{boy.name}</td>
                <td>{boy.number}</td>
                <td>{boy.gmail}</td>
                <td>{boy.userSpecialId}</td>
                <td>{boy.vehicle}</td>

                {/* Status + Live Online Time *
                <td>
                  {boy.status === "online" ? (
                    <>
                      🟢 Online <br />
                      <small>Since: {new Date(boy.onlineAt).toLocaleTimeString()}</small>
                    </>
                  ) : (
                    <>
                      🔴 Offline
                    </>
                  )}
                </td>

                <td>{getTotalDuty(boy)}</td>

                <td>
                  <button onClick={() => toggleStatus(boy)}>
                    {boy.status === "online" ? "Go Offline" : "Go Online"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Admin Delivery List *
      <h3>Admin Delivery List</h3>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>ID</th>
            <th>Vehicle</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {deliveryList.length === 0 ? (
            <tr>
              <td colSpan="6">No admin deliveries found</td>
            </tr>
          ) : (
            deliveryList.map((d) => {
              const active = isActiveDelBoy(d.userSpecialId);
              return (
                <tr key={d._id} className={active ? "row-active" : "row-inactive"}>
                  <td>{d.name}</td>
                  <td>{d.number}</td>
                  <td>{d.gmail}</td>
                  <td>{d.userSpecialId}</td>
                  <td>{d.vehicle}</td>
                  <td>{active ? "ACTIVE" : "NOT ACTIVE"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList ;




*/
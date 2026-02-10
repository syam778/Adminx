// DeliveryBoyOrders.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";


const DeliveryBoyOrders = ({ delBoyId, }) => {
  const { delBoyList } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const {url} = useContext(AdminContext);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/orders/get-by-delboy/${delBoyId}`);
      if (res.data.success) setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // poll every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-list">
      <h2>🟢 Online Orders Assigned to You</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              {order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}
              {" "} | ₹{order.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryBoyOrders;

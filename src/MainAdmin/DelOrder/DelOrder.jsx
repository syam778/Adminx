import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

//const BASE_URL = "http://localhost:3000/api";

const DelOrders = () => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const {url} = useContext(AdminContext);

  // Fetch all delivery orders
  const fetchDeliveryOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/delivery-orders`);
      if (res.data.success) {
        setDeliveryOrders(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeliveryOrders();
  }, []);

  return (
    <div className="delivery-list">
      <h2>📝 Orders Assigned to Delivery Boys</h2>

      {deliveryOrders.length === 0 ? (
        <p style={{ color: "red" }}>No orders assigned yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Delivery Boy ID</th>
              <th>Delivery Boy Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveryOrders.map((d, i) => (
              <tr key={d._id}>
                <td>{i + 1}</td>
                <td>{d.order._id}</td>
                <td>{d.deliveryBoy._id}</td>
                <td>{d.deliveryBoy.name}</td>
                <td>{d.order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DelOrders;

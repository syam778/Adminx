// AdminOrders.jsx
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const { delBoyList } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const prevIdsRef = useRef(new Set());
  const {url} = useContext(AdminContext);

  // 🔁 Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/list");
      if (res.data.success) {
        const newOrders = res.data.data || [];
        const newIds = new Set(newOrders.map(o => o._id));

        // ✅ Detect new order
        const newlyArrived = newOrders.filter(o => !prevIdsRef.current.has(o._id));
        if (newlyArrived.length > 0) {
          toast.success("New order received!");
          assignToOnlineBoys(newlyArrived[0]);
        }

        prevIdsRef.current = newIds;
        setOrders(newOrders);
      }
    } catch {
      toast.error("Failed to fetch orders");
    }
  };

  // 🔄 Assign order to online delivery boy
  const assignToOnlineBoys = async (order) => {
    const onlineBoys = delBoyList.filter(boy => boy.isActive);
    if (onlineBoys.length === 0) {
      toast.error("No delivery boy online");
      return;
    }

    for (let boy of onlineBoys) {
      await axios.post(`${url}/api/order/assign`, {
        orderId: order._id,
        deliveryBoyId: boy._id,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [delBoyList]);

  return <div>Admin Orders Page (fast real-time system)</div>;
};

export default AdminOrders;

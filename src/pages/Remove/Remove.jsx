import React from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import './Remove.css'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'

function Remove() {
  const {url} = useContext(AdminContext);
    const removeOrder = async (id) => {
    try {
      const res = await axios.post(`${url}/api/order/remove`, { id });

      if (res.data.success) {
        toast.success("Order removed");
        fetchAllOrders();
        submitAudioRef.current?.play();
      } else {
        toast.error(res.data.message || "Failed to remove");
        errorAudioRef.current?.play();
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
      errorAudioRef.current?.play();
    }
  };

  return (
    <div><button className='remove' onClick={() => removeOrder(order._id)}>ok</button></div>
  )
}

export default Remove
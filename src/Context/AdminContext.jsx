/*import { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  // ✅ Backend URL
  const url = "http://localhost:3000";

  // ✅ Delivery Boy List State
  const [delBoyList, setDelBoyList] = useState([]);

  // ✅ Audio Files
  const doneAudio = new Audio("/Audios/done.mp3");
  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");

  // ✅ Fetch Delivery Boys
  const fetchDelBoys = async () => {
    try {
      const res = await axios.get(`${url}/api/delivery/list`);

      if (res.data.success) {
        setDelBoyList(res.data.data);
      } else {
        console.log("Fetch Delivery List Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Context Values
  const contextValue = {
    url,
    delBoyList,
    setDelBoyList,
    fetchDelBoys,

    // audios
    doneAudio,
    errorAudio,
    submitAudio,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
*/
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  // ✅ Backend URL
  const url = "http://localhost:3000";
  
  //const url = "https://backend2-5-2t0w.onrender.com" //last

  // ✅ Delivery boys list
  const [delBoyList, setDelBoyList] = useState([]);

  // 🔊 Audio files (put inside public folder)
  const doneAudio = new Audio("/Audios/done.mp3");
  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");
  const orderAudio = new Audio("/Audios/order.mp3");

  // ✅ Fetch Delivery Boys
  const fetchDelBoys = async () => {
    try {
      const res = await axios.get(`${url}/api/delboy/get`);

      if (res.data.success) {
        setDelBoyList(res.data.data);
      } else {
        setDelBoyList([]);
      }
    } catch (error) {
      console.log("fetchDelBoys error:", error);
      setDelBoyList([]);
    }
  };

  // auto fetch once
  useEffect(() => {
    fetchDelBoys();
  }, []);

  const contextValue = {
    url,
    delBoyList,
    fetchDelBoys,
    doneAudio,
    errorAudio,
    submitAudio,
    orderAudio,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

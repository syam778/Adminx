import React from 'react'
import './index.css'
//import Navbar from './components/Navbar/Navbar'
//import Sidebar from './components/sidebar/sidebar'

import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import AdminM from './MainAdmin/AdminM/AdminM'
import { useState } from 'react'
import DeliveryCreate from './MainAdmin/DeliveryCreate/DeliveryCreate'
import DeliveryList from './MainAdmin/DeliveryList/DeliveryList'
import Logout from './Logout/Logout'
import OrderSend from './pages/OrderSend/OrderSend'
import Newdata from './pages/Newdata/Newdata'
//import SendData from './pages/SendData/SendData'
import DeliveryBoyOrders from './pages/Deliveryorder/Deliveryorder'
import AdminOrders from './pages/AdminOrder/AdminOrder'
import SendData from './pages/SendData/SendData'
import CheckOrderD from './MainAdmin/CheckOrderD/CheckOrderD'
import DelOrders from './MainAdmin/DelOrder/DelOrder'
import StoreData from './Store/StoreData/StoreData'
import StoreVerify from './Store/StoreVerify/StoreVerify'
import StoreVerifyData from './Store/StoreVerifyData/StoreVerifyData'
import PaymentManager from './pages/PaymentManager/PaymentManager'
import Payment from './pages/Payment/Payment'
import Condition from './pages/Condition/Condition'
import User from './MainAdmin/User/User'
import DeliveryInfo from './MainAdmin/DeliveryInfo/DeliveryInfo'
import StoreInfo from './MainAdmin/StoreInfo/StoreInfo'
import DelInfo from './MainAdmin/DelInfo/DelInfo'
import Map from './component/Map/Map'
import Home from './pages/Home/Home'
import Online from './Store/Online/Online'
import AdminCreate from './pages/AdminCreate/AdminCreate'
import Login from './Login/Login'






const App = () => {
  const {showLogin,setShowLogin} =useState(false)
  const url ="https://backend2-1-mqob.onrender.com"
    //const url = "https://backend-18-0jhq.onrender.com"
    //const url = "http://localhost:3000"
    
    //const url = "https://back-ylnd.onrender.com"
    //{showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
 
  return (
    <>
    {showLogin ? <AdminM  setShowLogin={setShowLogin} /> : <></>}
    <div >
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-cont">
        <Sidebar/>
        <Routes>
          <Route path='/delivery/get' element={<DeliveryList url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/order' element={<Order url={url} />} />
          <Route path='/create' element={<AdminM url={url}/>}/>
          <Route path='/delivery/create' element={<DeliveryCreate url={url}/>}/>
          <Route path='/admin/get' element={<Logout url={url}/>}/>
          <Route path='/delivery/get' element={<OrderSend url={url}/>}/>
          <Route path="/delordernew" element={<SendData/>} />

          <Route path="/new-order" element={<Newdata />} />
          <Route path="/del" element={<DeliveryBoyOrders />} />
          <Route path="/adm" element={<AdminOrders />} />
          <Route path='/data' element={<CheckOrderD/>}/>
          <Route path='/delorder' element={<DelOrders/>}/>
          <Route path="/storedata" element={<StoreData />} />
          <Route path='/storeverify' element={<StoreVerify/>}/>
          <Route path='/storeverifydata' element={<StoreVerifyData/>}/>
          <Route path='/paymentmanager' element={<PaymentManager/>}/>
          <Route path='/payment' element={<Payment url={url}/>}/>
          <Route path='/condition' element={<Condition/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/deliveryinfo' element={<DeliveryInfo/>}/>
          <Route path='/storeinfo' element={<StoreInfo/>}/>
          <Route path='/delinfo' element={<DelInfo/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/online' element={<Online/>}/>
          <Route path='/admin' element={<AdminCreate/>}/>
          <Route path='/login' element={<Login/>}/>


        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
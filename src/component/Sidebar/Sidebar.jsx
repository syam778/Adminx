import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    let errorAudio = new Audio('/Audios/done.mp3');
    
  return (
    <div className='sidebar'>
        <div className="sidebar-op">
            <NavLink to='/add' onClick={errorAudio.play()}  className="side-op">
                <div className='icon-wrap'><img src={assets.add} alt="" /></div>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' onClick={errorAudio.play()}   className="side-op">
                 <div className='icon-wrap' ><img src={assets.data} alt="" /></div>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/order' onClick={errorAudio.play()}   className="side-op">
                <div className='icon-wrap' ><img src={assets.bocket} alt="" /></div>
                <p>Order</p>
            </NavLink>
            <NavLink to='/delivery/get' onClick={errorAudio.play()}   className="side-op">
                <div className='icon-wrap' ><img src={assets.delivery} alt="" /></div>
                <p>OrderSend</p>
            </NavLink>
            <NavLink to='/login' onClick={errorAudio.play()}   className="side-op">
                <div className='icon-wrap' ><img src={assets.admin} alt="" /></div>
                <p>Admin Login</p>
            </NavLink>
            
        </div>
    </div>
  )
}

export default Sidebar
/*
.side-op img{
    width: 50px;
    height: 50px;
}
.sidebar{
    width: 18%;
    min-height: 100vh;
    border: 2px solid gray;
    border-top: 4px;
    font-size: 16px;
    font-weight: 600;

}
.sidebar-op{
    padding-top: 50px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.side-op{
    display: flex;
    align-items: center;
    gap: 12px;
    border-right: 0;
    padding: 8px 10px;
    border: 1px solid black;
    box-shadow: 0px 0px 10px black;
    border-radius: 5px;
    cursor: pointer;

}
.sidebar-op .active{
    border: 2px solid tomato;
    background-color: greenyellow;
    box-shadow: 0px 0px 10px tomato ;
}
@media (max-width:320px){
    .side-op img{
        width: 40px;
        height: 40px;
    }
    .sidebar{
        width: 22%;
        min-height: 80vh;
        border: 1.8px solid gray;
        border-top: 4px;
        font-size: 16px;
        font-weight: 600;
        
    
    }
    .sidebar-op{
        padding-top: 50px;
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        cursor: pointer;
        margin-left: -20px;
        
    }
    .side-op{
        display: flex;
        align-items: center;
        gap: 12px;
        
        border-right: 0;
        padding: 8px 10px;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        box-shadow: 0px 0px 10px gray;
    }
}
*/
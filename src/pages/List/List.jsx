import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const List = () => {

  const [list, setList] = useState([]);
  const { url } = useContext(AdminContext);

  let errorAudio = new Audio('/Audios/error.mp3');
  let submitAudio = new Audio('/Audios/done.mp3');
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    //console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
      submitAudio.play()

    }
    else {
      toast.error("Error")


    }
  }

  //const mapUrl = item.linkdata

  const removeFood = async (foodId) => {
    //console.log(foodId)
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
      errorAudio.play()
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  return (
    <div className='list'>
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format ti">
          <div className="pop">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Store <p>deteles</p></b>
            <b>map loc..</b>
            <b>Action</b></div>
          {list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                {/*<img src={`${url}/images/` + item.image} alt="" />*/}
                <img src={`${url}/uploads/` + item.image} alt="" />




                <p>Name : {item.name}</p>
                <p>Category : {item.category}</p>
                <p>Price : ₹{item.price}</p>
                <span className='stor'>
                  <p className='city'>City - {item.city}</p>

                  <p className='street'>Adress : {item.street}</p>
                  <p className='brand'>S Name : {item.firstName}</p>
                  <p className='phone'>Number : {item.phone}</p>
                  {item.phone && (
                    <a href={`tel:${item.phone}`} className="call-btnn">
                      📞 Call
                    </a>
                  )}


                </span>

                <p>
                  {item.linkdata ? (
                    <a
                      href={item.linkdata}
                      target="_blank"
                      rel="noopener noreferrer"
                    ><img className='marker1' src={assets.lmarker} alt="" />
                      View Map
                    </a>
                  ) : (
                    "No Map"
                  )}
                </p>

                <button onClick={() => removeFood(item._id)} className='cursor'>Remove</button>
              </div>
            )

          })}
        </div>
      </div>
    </div>
  )
}

export default List

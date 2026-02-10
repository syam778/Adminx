/*import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'


const Add = ({ url }) => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "curd",
        phone: "",
        city: "",
        street: "",
        firstName: "",
        linkdata: ""

    })
    let errorAudio = new Audio('/Audios/error.mp3');
    let submitAudio = new Audio('/Audios/submit2.mp3');

    const notify = () => toast("Food ADD");


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        formData.append("firstName", data.firstName)
        formData.append("phone", data.phone)
        formData.append("city", data.city)
        formData.append("street", data.street)
        formData.append("linkdata", data.linkdata)






        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "curd",
                phone: "",
                city: "",
                street: "",
                firstName: "",
                linkdata: ""



            })
            setImage(false)
            toast.success(response.data.message)
            submitAudio.play()



        }
        else {
            toast.error(response.data.message)
            errorAudio.play()

        }
    }

    return (
        <div className='add'>
            <form className='form1' onSubmit={onSubmitHandler} >
                <div className="add-img-up form1">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.download} alt="" />
                       
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name form1">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
                </div>
                <div className="add-product-description form1">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write Content Here'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category form1">
                        <p>Product Category</p>
                        <select name="category" onChange={onChangeHandler} id="">

                            <option value="Vegetable">Vegetable</option>
                            <option value="MilkProduct">MilkProduct</option>
                            <option value="Oil">Oil</option>
                            <option value="NonVeg">NonVeg</option>
                            <option value="GroceryItems">GroceryItems</option>
                            <option value="FreshProduct">FreshProduct</option>
                            <option value="ColdDrinks">ColdDrinks</option>
                            <option value="FoodItems">FoodItems</option>
                            <option value="IceCream">IceCream</option>
                            <option value="Offers">Offers</option>
                            <option value="Lassi">Lassi</option>
                            <option value="Kulfi">Kulfi</option>
                            <option value="Bags">Bags</option>
                            <option value="GarmentsItems">GarmentsItems</option>
                            <option value="SportsProduct">SportsProduct</option>

                        </select>
                    </div>

                    <div className="add-price form1">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <div className="store">
                    <p>Store deteles</p>
                    <input onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='Store Name' />
                    <input onChange={onChangeHandler} value={data.phone} name='phone' type="number" placeholder='Store Number' />
                    <input onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Area Name' />
                    <input onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='Your City Name' />
                </div>

                <div className="map">
                    <p>Map Navigation </p>
                    <input onChange={onChangeHandler} value={data.linkdata} name='linkdata' type="text" placeholder=' Send Your Map Link' />
                    <p>Post Your Current Store Map Link Only</p>

                </div>

                <button type='submit' onClick={notify || submitAudio.play()} className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add; //master code
*/
import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Add = () => {
  const [image, setImage] = useState(null);
  const {url} = useContext(AdminContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Vegetable",
    phone: "",
    city: "",
    street: "",
    firstName: "",
    linkdata: "",
  });

  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload image");
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, key === "price" ? Number(value) : value);
      });

      formData.append("image", image);

      // 🔥 IMPORTANT: ADMIN BYPASS
      formData.append("createdBy", "admin");
      // ❌ DO NOT send storeIdRef

      const res = await axios.post(`${url}/api/food/add`, formData);

      if (res.data.success) {
        toast.success("Food added by Admin");
        submitAudio.play();

        setData({
          name: "",
          description: "",
          price: "",
          category: "Vegetable",
          phone: "",
          city: "",
          street: "",
          firstName: "",
          linkdata: "",
        });
        setImage(null);
      } else {
        toast.error(res.data.message);
        errorAudio.play();
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
      errorAudio.play();
    }
  };

  return (
    <div className="add">
      <form className="form1" onSubmit={onSubmitHandler}>
        {/* IMAGE */}
        <div className="add-img-up">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.download}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* PRODUCT */}
        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Product Name"
          required
        />

        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Description"
          required
        />

        <select
          name="category"
          value={data.category}
          onChange={onChangeHandler}
        >
          <option value="Vegetable">Vegetable</option>
          <option value="MilkProduct">MilkProduct</option>
          <option value="Oil">Oil</option>
          <option value="NonVeg">NonVeg</option>
          <option value="GroceryItems">GroceryItems</option>
          <option value="FreshProduct">FreshProduct</option>
          <option value="ColdDrinks">ColdDrinks</option>
          <option value="FoodItems">FoodItems</option>
          <option value="IceCream">IceCream</option>
          <option value="Offers">Offers</option>
          <option value="SportsProduct">SportsProduct</option>
        </select>

        <input
          type="number"
          name="price"
          value={data.price}
          onChange={onChangeHandler}
          placeholder="Price"
          required
        />

        {/* STORE DISPLAY (ADMIN SIDE INFO) */}
        <input
          name="firstName"
          value={data.firstName}
          onChange={onChangeHandler}
          placeholder="Brand / Admin Label"
          required
        />
        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />
        <input
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
          required
        />
        <input
          name="city"
          value={data.city}
          onChange={onChangeHandler}
          placeholder="City"
          required
        />

        {/* MAP */}
        <input
          name="linkdata"
          value={data.linkdata}
          onChange={onChangeHandler}
          placeholder="Google Map Link"
          required
        />

        <button type="submit" className="add-btn">
          ADD (ADMIN)
        </button>
      </form>
    </div>
  );
};

export default Add;

import logo from './images/logo.png';
import sell from './images/selling.png';
import cart from './images/cart_logo.png'
import './App.css';
import { Link } from 'react-router-dom';
import { db } from './config';
import { set,ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import account from './images/account_logo.png'


function Sell()
{
    const [counter_data, setcounter_data] = useState({});
    const [images_val, setimages_val] = useState("");
    const [platform_val, setplatform_val] = useState("");
    const [product_price_val, setproduct_price_val] = useState(0);
    const [product_name, setproduct_name_val] = useState("");
    const [status_val, setstatus_val] = useState(0);
    const [type_val, settype_val] = useState("");

    const handlechange1 = (event)=>{
      setimages_val(event.target.value);
    }
    const handlechange2 = (event)=>{
      setplatform_val(event.target.value);
    }
    const handlechange3 = (event)=>{
      setproduct_price_val(event.target.value);
    }
    const handlechange4 = (event)=>{
      setproduct_name_val(event.target.value);
    }
    const handlechange5 = (event)=>{
      setstatus_val(event.target.value);
    }
    const handlechange6 = (event)=>{
      settype_val(event.target.value);
    }


    const [productInfo, setproductInfo] = useState({
      product_name: "test",
      platform: "Test",
      price: 69,
      images: "https://www.shutterstock.com/image-vector/test-ink-hand-lettering-modern-600w-614757713.jpg",
      status: "test",
      type: "test"
      });

      useEffect(()=>{
        onValue(ref(db,'/counter'),(snapshot)=>{
          const data = snapshot.val();
          if(data!=null){
          setcounter_data(data)}
        })
      },[]);
      console.log(counter_data);
      const update_counter = () => {
        set(ref(db, 'counter/'),{
            unique_id:counter_data.unique_id+1,
            counter:counter_data.counter+1,
            item_brought_count:counter_data.item_brought_count,
            item_sold_count:counter_data.item_sold_count+1
        })
      }
    let user_email = JSON.parse(localStorage.getItem("user-data")).email;
    let var_user_email = user_email.slice(0, user_email.length-10)
    
    
    const write_data = () =>{
        const timestamp = Date.now();
        set(ref(db, 'products/'+counter_data.counter),{
          product_id: counter_data.counter,
          product_name: product_name,
          platform: platform_val,
          price: product_price_val,
          images: images_val,
          status: "not sold",
          type: type_val
        })
        set(ref(db, "users/"+var_user_email+"/item-sold/"+timestamp),{
          product_id: counter_data.counter,
          product_name: product_name,
          platform: platform_val,
          price: product_price_val,
          images: images_val,
          status: "not sold",
          type: type_val
        })
        // setproductInfo({});
        update_counter();
    }
    return (
        <>
            <div className='header'>
                    <Link to="/home"><img id="logo_h" src={logo} alt="logo"></img></Link>
                    <Link to="/cart"><img id="sell_h" src={cart} alt="sell"></img></Link>
                    <Link to="/"><img id="account_h" src={account}></img></Link>
                    {/* <div class="header_title">Cex 2.0</div> */}  
            </div>
            <div style={{textAlign:"center", margin:"50px", fontSize:"50px", color:"rgb(237, 195, 81)"}}>CEX 2.0 sell ur old stuff and make money for new stuff</div>
            <div style={{display:"grid", justifyContent:"center"}}>
              <div style={{fontSize:"30px",color:"rgb(152, 190, 250)"}}>image_url : </div>
              <input value={images_val} onChange={handlechange1} style={{width:"500px",padding:"10px"}}></input>
              <div style={{fontSize:"30px",color:"rgb(152, 190, 250)"}}>platform</div>
              <input value={platform_val} onChange={handlechange2} style={{width:"500px",padding:"10px"}}></input>
              <div style={{fontSize:"30px",color:"rgb(152, 190, 250)"}}>price</div>
              <input value={product_price_val} onChange={handlechange3} style={{width:"500px",padding:"10px"}}></input>
              <div style={{fontSize:"30px",color:"rgb(152, 190, 250)"}}>product name</div>
              <input value={product_name} onChange={handlechange4} style={{width:"500px",padding:"10px"}}></input>

              {/* <input value={status_val} onChange={handlechange5}></input> */}
              <div style={{fontSize:"30px",color:"rgb(152, 190, 250)"}}>product_type</div>
              <input value={type_val} onChange={handlechange6} style={{width:"500px",padding:"10px"}}></input>
              <div></div>
              <button onClick={write_data} style={{padding:"10px",marginTop:"20px",backgroundColor:"rgb(105, 245, 110)"}}>sell</button>
            </div>
            
        </>
    )
}

export default Sell;
import logo from './images/logo.png';
import sell from './images/selling.png';
import './App.css';
import { Link } from 'react-router-dom';
import { db } from './config';
import { set,ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';


function Sell()
{

    const [images, setimages] = useState("");
    const [platform, setplatform] = useState("");
    const [price, setprice] = useState("");
    const [product_id, setproductid] = useState("");
    const [product_name, setproduct_name] = useState("");
    const [counter_data, setcounter_data] = useState({});

    const [productInfo, setproductInfo] = useState({
        images: "sampl",
        platform: "joemama",
        price: 1900,
        product_id: 100,
        product_name: "three"
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
            counter:counter_data.counter+1
        })
      }

    const write_data = () =>{
        const timestamp = Date.now();
        set(ref(db, 'products/'+counter_data.counter),{
            images: productInfo.images,
            platform: productInfo.platform,
            price: productInfo.price,
            product_id: counter_data.unique_id,
            product_name: productInfo.product_name
        })
        setimages("");
        setplatform("")
        setprice("")
        setproductid("")
        setproduct_name("")
        update_counter()
    }
    return (
        <>
            <div className='header'>
                    <Link to="/"><img id="logo_h" src={logo} alt="logo"></img></Link>
                    {/* <div class="header_title">Cex 2.0</div> */}
                    <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
                    <button onClick={write_data}>sample</button>
            </div>
            
        </>
    )
}

export default Sell;
import logo from './images/logo.png';
import sell from './images/selling.png';
import './App.css';
import { Link } from 'react-router-dom';
import { db } from './config';
import { set,ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';


function Sell()
{
    const [counter_data, setcounter_data] = useState({});

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
            counter:counter_data.counter+1
        })
      }

    const write_data = () =>{
        const timestamp = Date.now();
        set(ref(db, 'products/'+counter_data.counter),{
          product_id: counter_data.counter,
          product_name: productInfo.product_name,
          platform: productInfo.platform,
          price: productInfo.price,
          images: productInfo.images,
          status: productInfo.status,
          type: productInfo.type
        })
        // setproductInfo({});
        update_counter();
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
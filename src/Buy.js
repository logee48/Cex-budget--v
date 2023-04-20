
import { useLocation } from "react-router-dom";
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import logo from './images/logo.png';
import sell from './images/selling.png';
import './App.css';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import account from './images/account_logo.png'

function Buy()
{
    const [testdata, settestdata] = useState([]);
    const [counter_data, setcounter_data] = useState({});
    const { id } = useLocation().state;
    let dataSearch = testdata.filter(item =>{
        return Object.keys(item).some(key=>
          item[key].toString().toLowerCase().includes(id.toLowerCase())
          )
      });


    useEffect(()=>{
    onValue(ref(db,'/products'),(snapshot)=>{
        const data = snapshot.val();
        if(data!=null){
        settestdata(data)}
    })
    onValue(ref(db,'/counter'),(snapshot)=>{
        const data = snapshot.val();
        if(data!=null){
        setcounter_data(data)}
      })
    },[]);
    console.log(counter_data);
    // const update_counter = () => {
    //   set(ref(db, 'counter/'),{
    //       unique_id:counter_data.unique_id,
    //       counter:counter_data.item_brought_count,
    //       item_brought_count:counter_data.item_brought_count+1,
    //       item_sold_count:counter_data.item_sold_count
    //   })
    // }
    let user_email = JSON.parse(localStorage.getItem("user-data")).email;
    let var_user_email = user_email.slice(0, user_email.length-10)
    // console.log(var_user_email);
    // console.log(user_email.length);
    const buy_item = () =>{
        const timestamp = Date.now();
        set(ref(db, "users/"+var_user_email+"/item-brought/"+timestamp),{
            product_id: dataSearch[0].product_id,
            product_name: dataSearch[0].product_name,
            platform: dataSearch[0].platform,
            price: dataSearch[0].price,
            images: dataSearch[0].images,
            status: "sold",
            type: dataSearch[0].type
        })
        set(ref(db, 'products/'+dataSearch[0].product_id),{
            product_id: dataSearch[0].product_id,
            product_name: dataSearch[0].product_name,
            platform: dataSearch[0].platform,
            price: dataSearch[0].price,
            images: dataSearch[0].images,
            status: "sold",
            type: dataSearch[0].type
        })
        
    }
    return (
        <>

            <div className='header'>
                    <Link to="/"><img id="logo_h" src={logo} alt="logo"></img></Link>
                    <Link to="/test"><img id="account_h" src={account}></img></Link>
                    {/* <div class="header_title">Cex 2.0</div> */}
                    <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
                
            </div>
            <div>profile page</div>
            <div>{dataSearch.product_data}</div>
            {dataSearch.map((prod)=>(
                <div className="product_border">
                    <img id="game_pic" src={prod.images} alt="game_pic"></img>
              <div id="game_title">{prod.product_name}</div>
              <div id="game_price">price:{prod.price}</div>
              <img id="platform_pic" src={prod.platform === "pc" ? windows:prod.platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
                </div>
            ))}

            <button onClick={buy_item}>confirm buy</button>
        </>
    )
}

export default Buy;
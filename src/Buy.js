import { useLocation } from "react-router-dom";
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import book_logo from './images/book.png';
import logo from './images/logo.png';
import sell from './images/selling.png';
import './App.css';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import account from './images/account_logo.png';
import cart from './images/cart_logo.png'

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
                    <Link to="/cart"><img id="sell_h" src={cart} alt="sell"></img></Link>
                    <Link to="/test"><img id="account_h" src={account}></img></Link>
                    {/* <div class="header_title">Cex 2.0</div> */}
                    <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
                
            </div>
            {/* <div>{dataSearch.product_data}</div> */}
            {dataSearch.map((prod)=>(
                <div style={{borderStyle:"solid",width:"60vw",display:"grid",gridTemplateColumns:"auto auto",marginTop:"100px",marginLeft:"20%",borderRadius:"40px"}}>
                    <div><img style={{width:"300px",padding:"20px"}} src={prod.images} alt="game_pic"></img></div>
                    <div style={{padding:"20px"}}>
                        <div style={{fontSize:"50px"}}>{prod.product_name}</div>
                        <div style={{fontSize:"40px",marginTop:"20px"}}>price:{prod.price}</div>
                        <div><img style={{width:"50px",marginTop:"20px"}} src={prod.platform === "pc" ? windows:prod.platform === "playstation"?ps_logo:prod.platform === "xbox"?xbox_logo:book_logo} alt="platform_pic"></img></div>
                        <Link to="/"><button onClick={buy_item} style={{marginTop:"60px",color:"rgb(95, 237, 76)",padding:"20px",width:"200px",borderStyle:"solid black",backgroundColor:"white"}}>buy now</button></Link>
                    </div>
                </div>
            ))}

            
        </>
    )
}

export default Buy;
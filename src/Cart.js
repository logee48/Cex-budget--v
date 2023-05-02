import { Link } from "react-router-dom";
import account from './images/account_logo.png';
import sell from './images/selling.png';
import logo from './images/logo.png';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import book_logo from './images/book.png';
import { useEffect, useState } from "react";
import { db } from './config';
import { ref,onValue } from 'firebase/database';


function Cart()
{
    var total_cost = 0;
    var total_item = 0;
    var book_count = 0;
    var game_count = 0;
    var user_data = JSON.parse(localStorage.getItem("user-data"));
    let var_user_email = user_data.email.slice(0, user_data.email.length-10);
    const [cartdata, setcartdata] = useState([]);

    useEffect(()=>{
        onValue(ref(db,"users/"+var_user_email+"/cart"),(snapshot)=>{
          const data = snapshot.val();
          if(data!=null){
          setcartdata(data)}
        })
      },[]);
    return(
        <>
            <div className='header'>
                    <Link to="/home"><img id="logo_h" src={logo} alt="logo"></img></Link>
                    <Link to="/"><img id="account_h" src={account}></img></Link>
                    <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
            </div>
            {Object.keys(cartdata).map((id,index)=>{
                            total_cost = total_cost + Number(cartdata[id].price);
                            total_item +=1;
                            if (cartdata[id].platform === "book"){
                            book_count+=1;}
                            else{
                            game_count+=1;}
                        
                    })}
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{paddingTop:"7%",fontSize:"50px",width:"600px",paddingLeft:"10%"}}>Welcome to your cart<div style={{fontSize:"60px",color:"grey"}}>{user_data.name}</div><div style={{fontSize:"35px", color:"rgb(166, 186, 224)",paddingTop:"30px"}}>Total item count : {total_item}</div><div style={{fontSize:"35px", color:"rgb(166, 186, 224)",paddingTop:"30px"}}>Total book count : {book_count}</div><div style={{fontSize:"35px", color:"rgb(166, 186, 224)",paddingTop:"30px"}}>Total game count : {game_count}</div><div style={{fontSize:"40px", color:"rgb(166, 186, 224)",paddingTop:"30px"}}>Grand Total : {total_cost}</div><button>buy now</button></div>
                <div style={{height:"500px",width:"600px", overflow:"scroll", marginTop:"100px"}}>
                    {Object.keys(cartdata).map((id,index)=>{
                        return (
                            <div className="product_border" style={{position:"relative", left:"25%", display:"grid",gridTemplateColumns:"auto auto",padding:"10px"}}>
                                <div><img style={{width:'150px'}} src={cartdata[id].images} alt="game_pic"></img></div>
                                <div>
                                    <div >{cartdata[id].product_name}</div>
                                    <div>price:{cartdata[id].price}</div>
                                    <img width={"50px"} src={cartdata[id].platform === "pc" ? windows:cartdata[id].platform === "playstation"?ps_logo:cartdata[id].platform === "xbox"?xbox_logo:book_logo} alt="platform_pic"></img>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            {/* <div>Total cost : {total_cost}</div> */}
        </>
    )
}

export default Cart;
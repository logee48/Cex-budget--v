import React, { useState, useEffect } from "react";
import './App.css';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';

function Homee(){
    const [broughtitems, setbroughtitems] = useState([]);
    const [solditems, setsolditems] = useState([]);
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    const userdata = JSON.parse(localStorage.getItem("user-data"));
    console.log(userdata);
    useEffect(()=>{
        onValue(ref(db,"users/"+var_user_email+"/item-brought"),(snapshot)=>{
          const data = snapshot.val();
          if(data!=null){
          setbroughtitems(data)}
        })
        onValue(ref(db,"users/"+var_user_email+"/item-sold"),(snapshot)=>{
            const data = snapshot.val();
            if(data!=null){
            setsolditems(data)}
          })
      },[]);
      let user_email = JSON.parse(localStorage.getItem("user-data")).email;
  let var_user_email = user_email.slice(0, user_email.length-10)
    return (
        <div>
            <div id="profile-header">
                <div><img src={userdata.img} style={{width:"300px",borderRadius:"50%", marginTop:"100px",marginLeft:"200px"}}></img></div>
                <div id="profile-text">
                    <div id="profile-name">UserName: {userdata.name}</div>
                    <div id="profile-mail">Email: {userdata.email}</div>
                </div>
            </div>
            <div id="item-display">
                <div id="items-bought">
                    <div style={{textAlign:"center",marginTop:"10vh"}}>items Bought</div>
                    {Object.keys(broughtitems).map((id,index)=>{
          return (
            <div className="product_border">
              <img id="game_pic" src={broughtitems[id].images} alt="game_pic"></img>
            <div id="game_title">{broughtitems[id].product_name}</div>
            <div id="game_price">price:{broughtitems[id].price}</div>
            <img id="platform_pic" src={broughtitems[id].platform === "pc" ? windows:broughtitems[id].platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
            {broughtitems[id].status === "sold"? <div>item sold out</div>:<div>in stock</div>}
            
          </div>
          )
        })}
                </div>
                <div id="items-sold">
                    <div style={{textAlign:"center",marginTop:"10vh"}}>items Sold</div>
                    {Object.keys(solditems).map((id,index)=>{
          return (
            <div className="product_border">
              <img id="game_pic" src={solditems[id].images} alt="game_pic"></img>
            <div id="game_title">{solditems[id].product_name}</div>
            <div id="game_price">price:{solditems[id].price}</div>
            <img id="platform_pic" src={solditems[id].platform === "pc" ? windows:solditems[id].platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
            {solditems[id].status === "sold"? <div>item sold out</div>:<div>in stock</div>}
            
          </div>
          )
        })}
                </div>
            </div>
        </div>
    );
}
export default Homee;
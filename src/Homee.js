import React, { useState, useEffect } from "react";
import './App.css';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import book_logo from './images/book.png'
import profilee from './images/account_logo.png';

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
                <div><img src={userdata.img} style={{width:"300px",borderRadius:"50%", marginTop:"10px",marginLeft:"100px"}}></img></div>
                {/* <div><img src={userdata.img?userdata.img:profilee} style={{width:"300px",borderRadius:"50%", marginTop:"100px",marginLeft:"200px"}}></img></div> */}
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
            <div className="product_border" style={{position:"relative", left:"25%", display:"grid",gridTemplateColumns:"auto auto",padding:"10px"}}>
             <div><img style={{width:'150px'}} src={broughtitems[id].images} alt="game_pic"></img></div>
              <div>
                <div >{broughtitems[id].product_name}</div>
                <div>price:{broughtitems[id].price}</div>
                <img width={"50px"} src={broughtitems[id].platform === "pc" ? windows:broughtitems[id].platform === "playstation"?ps_logo:broughtitems[id].platform === "xbox"?xbox_logo:book_logo} alt="platform_pic"></img>
              </div>
            </div>
          )
        })}
                </div>
                <div id="items-sold">
                    <div style={{textAlign:"center",marginTop:"10vh"}}>items Sold</div>
                    {Object.keys(solditems).map((id,index)=>{
          return (
            <div className="product_border" style={{position:"relative", left:"25%", display:"grid",gridTemplateColumns:"auto auto",padding:"10px"}}>
              <div><img style={{width:'150px'}} src={solditems[id].images} alt="game_pic"></img></div>
              <div>
                <div >{solditems[id].product_name}</div>
                <div>price:{solditems[id].price}</div>
                <img width={"50px"} src={solditems[id].platform === "pc" ? windows:solditems[id].platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
              </div>
            </div>
          )
        })}
                </div>
            </div>
        </div>
    );
}
export default Homee;
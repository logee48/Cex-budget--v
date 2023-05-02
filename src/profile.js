import React, { useEffect, useState } from "react";
import {auth,provider} from "./config";
import {signInWithPopup} from "firebase/auth";
import Homee from "./Homee";
import logo from './images/logo.png';
import sell from './images/selling.png';
import cart from './images/cart_logo.png'
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'

function Profile(){
    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            console.log(data.user.displayName);
            setValue(data.user.email)
            localStorage.setItem("user-data",JSON.stringify({"email":data.user.email, "img":data.user.photoURL, "name":data.user.displayName}))

        })
        document.getElementById("sigin-section").style.display = "none";
        document.getElementById("sign-out-button").style.display = "block";
    }

    useEffect(()=>{
        setValue(localStorage.getItem('user-data'))
    })
    const signout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    const button_style = {display: 'none'};

return (
    <div className="acc-section">
        <div class='header'>
                <Link to="/"><img id="logo_h" src={logo} alt="logo"></img></Link>
                {value?<Link to="/cart"><img id="sell_h" src={cart} alt="sell"></img></Link>:<></>}
                {value?<button onClick={signout}>sigin-out</button>:<></>}
                <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
        </div>
        <div>
            <div>{value?<Homee/>:
            <div id="sigin-section" style={{display:"grid",gridTemplateColumns:"auto"}}>
                <div style={{fontSize:"80px",color:"rgb(250, 112, 102)"}}>Welcome to CEX 2.0</div>
                <button  onClick={handleClick} style={{width:"400px",position:"relative",left:"20%",height:"40px",border:"none",backgroundColor:"rgb(150, 189, 242)"}}>Signin With Google</button>
            </div>
            }</div>
        </div>
    </div>
);
}
export default Profile;

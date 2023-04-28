import React, { useEffect, useState } from "react";
import {auth,provider} from "./config";
import {signInWithPopup} from "firebase/auth";
import Homee from "./Homee";
import logo from './images/logo.png';
import sell from './images/selling.png';
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
                {/* <div class="header_title">Cex 2.0</div> */}
                
                {value?<button onClick={signout}>sigin-out</button>:<></>}
                <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
        </div>
        <div>
            {/* <div>sdjn</div> */}
            {/* <div>sign in with your account</div> */}
            <div>{value?<Homee/>:
            <div id="sigin-section"><button  onClick={handleClick}>Signin With Google</button></div>
            }</div>
        </div>
    </div>
);
}
export default Profile;

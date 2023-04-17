import React from "react";

function Homee(){
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div>
            <h1>Home Page</h1>
            <div>{localStorage.getItem('email')}</div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default Homee;
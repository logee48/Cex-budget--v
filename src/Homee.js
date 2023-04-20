import React from "react";

function Homee(){
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }
    const userdata = JSON.parse(localStorage.getItem("user-data"));
    console.log(userdata);
    return (
        <div>
            <h1>Home Page</h1>
            <div>{userdata.name}</div>
            <img src={userdata.img}></img>
            <div>{userdata.email}</div>
            {/* <img src="https://lh3.googleusercontent.com/a/AGNmyxZvXsqQryc0f_CTZsQ0pVzNf6JUtVHQ0pLcE1U=s96-c"></img> */}
            {/* <button onClick={logout}>Logout</button> */}
        </div>
    );
}
export default Homee;
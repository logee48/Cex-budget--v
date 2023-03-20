import { Route, Routes } from "react-router-dom";
import App from './App';
import Cart from './Cart';
import Profile from './Profile';
import Login  from "./login";
import { useState } from "react";

function Home()
{

    const [data, setdata] = useState({});
    return (
        <>
            <Routes>
                <Route path="/" element={<Login setdata={setdata}/>}/>
                <Route path="/home" element={<App data={data}/>}/>
                {/* <Route path="/sell" element={<Sell />}/> */}
                <Route path="/profile" element={<Profile />}/>
                <Route path="/cart" element={<Cart />}/>
            </Routes>
        </>
    )
}

export default Home;
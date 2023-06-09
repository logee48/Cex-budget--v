import { Route, Routes } from "react-router-dom";
import App from './App';
import Buy from "./Buy";
import Sell from "./Sell";
import Sample from "./profile";
import Cart from "./Cart";


function Home()
{
    return (
        <>
            <Routes>
                <Route path="/" element={<Sample/>}/>
                <Route path="/sell" element={<Sell/>}/>
                <Route path="/buy" element={<Buy />}/>
                <Route path="/home" element={<App />}/>
                <Route path="/cart" element={<Cart />}/>
            </Routes>
        </>
    )
}

export default Home;
import { Route, Routes } from "react-router-dom";
import App from './App';
import Buy from "./Buy";
import Sell from "./Sell";

function Home()
{
    return (
        <>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/sell" element={<Sell/>}/>
                <Route path="/buy" element={<Buy />}/>
            </Routes>
        </>
    )
}

export default Home;
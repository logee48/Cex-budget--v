import { Route, Routes } from "react-router-dom";
import App from './App';
import Buy from "./Buy";
import Sell from "./Sell";
import Sample from "./Sample";

function Home()
{
    return (
        <>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/sell" element={<Sell/>}/>
                <Route path="/buy" element={<Buy />}/>
                <Route path="/test" element={<Sample />}/>
            </Routes>
        </>
    )
}

export default Home;
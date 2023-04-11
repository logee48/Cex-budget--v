
import { useLocation } from "react-router-dom";
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import logo from './images/logo.png';
import sell from './images/selling.png';
import './App.css';

import { Link } from 'react-router-dom';

function Buy()
{
    const { id } = useLocation().state;
    let dataSearch = product_data.filter(item =>{
        return Object.keys(item).some(key=>
          item[key].toString().toLowerCase().includes(id)
          )
      });
    return (
        <>

            <div className='header'>
                    <Link to="/"><img id="logo_h" src={logo} alt="logo"></img></Link>
                    {/* <div class="header_title">Cex 2.0</div> */}
                    <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
                
            </div>
            <div>profile page</div>
            <div>{dataSearch.product_data}</div>
            {dataSearch.map((prod)=>(
                <div className="product_border">
                    <img id="game_pic" src={prod.images.url1} alt="game_pic"></img>
              <div id="game_title">{prod.product_name}</div>
              <div id="game_price">price:{prod.price}</div>
              <img id="platform_pic" src={prod.platform === "pc" ? windows:prod.platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
                </div>
            ))}
        </>
    )
}

export default Buy;
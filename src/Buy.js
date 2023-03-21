
import { useLocation } from "react-router-dom";
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';

function Buy()
{
    const { id } = useLocation().state;
    let dataSearch = product_data.filter(item =>{
        return Object.keys(item).some(key=>
          item[key].toString().toLowerCase().includes(id)
          )
      });
    console.log(dataSearch);
    return (
        <>
            <div>profile page</div>
            <div>{dataSearch.product_data}</div>
            {dataSearch.map((prod)=>(
                <div className="product_border">
                    <img id="game_pic" src={prod.images.url1} alt="game_pic"></img>
                {/* <img id="game_pic" src={prod.images.url2} alt="game_pic"></img>
                <img id="game_pic" src={prod.images.url3} alt="game_pic"></img>
                <img id="game_pic" src={prod.images.url4} alt="game_pic"></img>
              </AwesomeSlider> */}
              <div id="game_title">{prod.product_name}</div>
              <div id="game_price">price:{prod.price}</div>
              {/* <img id="platform_pic" src={for_platform(prod.platform)} alt="platform_pic"></img> */}
              <img id="platform_pic" src={prod.platform === "pc" ? windows:prod.platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
                </div>
            ))}
            {/* <img src={dataSearch.images.url1}></img> */}
        </>
    )
}

export default Buy;
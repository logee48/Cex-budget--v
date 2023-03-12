import './App.css';
import logo from './images/logo.png';
import account from './images/account_logo.png';
import cart from './images/cart_logo.png';
import sell from './images/selling.png';
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';

//function for find platforms, i used conditional rendering instead


// function for_platform(arg)
// {
//   if(arg==="pc"){
//     return windows
//   }
//   else if(arg==="xbox")
//   // console.log(typeof(arg));
//   return ps_logo
//   return xbox_logo
// }


function App() {
  return (
    <>
      {/* header line section */}
      <div class='header'>
        <img id="logo_h" src={logo} alt="logo"></img>
        <div class="header_title">Cex 2.0</div>
        <input type={Text}></input>
        <img id="sell_h" src={sell} alt="sell"></img>
        <img id="account_h" src={account} alt="account"></img>
        <img id="cart_h" src={cart} alt="cart"></img>
      </div>
      
      <div>
        <div class='product'>
            {/* product display section */}
            {product_data.map((prod)=>(
              <div class="product_border">
              <img id="game_pic" src={prod.images.url1} alt="game_pic"></img>
              <div id="game_title">{prod.product_name}</div>
              <div id="game_price">price:{prod.price}</div>
              {/* <img id="platform_pic" src={for_platform(prod.platform)} alt="platform_pic"></img> */}
              <img id="platform_pic" src={prod.platform === "pc" ? windows:prod.platform === "ps"?ps_logo:xbox_logo} alt="platform_pic"></img>
            </div>
            ))}


            {/* <div class="product_border">
              <img id="game_pic" src={logo} alt="game_pic"></img>
              <div id="game_title">game name</div>
              <div id="game_price">price:1500</div>
              <img id="platform_pic" src={cart} alt="platform_pic"></img>
            </div> */}

        </div>
        {/* filter section */}
        <div class='filter'></div>
        

      </div>
  
    </>
  );
}

export default App;
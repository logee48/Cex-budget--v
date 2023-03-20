import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import account from './images/account_logo.png';
import cart from './images/cart_logo.png';
import sell from './images/selling.png';


function Navbar()
{
    return (
        <>
            <div class='header'>
                <img id="logo_h" src={logo} alt="logo"></img>
                {/* <div class="header_title">Cex 2.0</div> */}
                <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
                <Link to="/profile"><img id="account_h" src={account} alt="account"></img></Link>
                <Link to="/cart"><img id="cart_h" src={cart} alt="cart"></img></Link>
            </div>
        </>
    )
}

export default Navbar;
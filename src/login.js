import { Link } from "react-router-dom";
import { useState } from "react";

function Login({setdata})
{
    const [Name, setName] = useState("");
    const [Pword, setPword] = useState("");
    setdata({"name":{Name}, "password":Pword});
    const handlechange = (e)=>{
        setName(e.target.value)
        setPword(e.target.value)
    }


    return(
        <>
            <input value={Name} onChange={handlechange}></input>
            <input value={Pword}></input>
            <Link to="/home"><button>submit</button></Link>
            {/* <Link to={{pathname:"/home",state:{Name}}}><button>submit</button></Link> */}
            <button onClick={test}>sample</button>
        </>
    )
}


export default Login;
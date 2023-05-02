import { useState, useEffect } from 'react';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
// import { uid } from 'uid';
import './App.css';
import account from './images/account_logo.png'
import logo from './images/logo.png';
import sell from './images/selling.png';
import cart from './images/cart_logo.png';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import book_logo from './images/book.png';
import { Link, Route, Routes } from 'react-router-dom';
import { useLocation } from "react-router-dom";



// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';














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


  

function App({data}) {


  console.log(data);
  const [filter, setfilter] = useState('');
  const [testdata, settestdata] = useState([]);
  const [a, seta] = useState([{'name':'joe'},{'name':'dsgs'},{'name':'sdgsgsj'}]);
  const searchText = (event)=>{
    setfilter(event.target.value);
  }

  // searching function
  // let dataSearch = product_data.filter(item =>{
  //   return Object.keys(item).some(key=>
  //     item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
  //     )
  // });

  let dataSearch1 = testdata.filter(item =>{
    return Object.keys(item).some(key=>
      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  });

  // writing works
  // const write_data = () =>{
  //   const uuid = uid();
  //   set(ref(db, 'users/'+uuid),{
  //     name: filter
  //   })
  //   setfilter("");
  // }


  //does work, can't renter values

  // useEffect(() => {
  //   const dbref = ref(db);
  //   onValue(dbref, (snapshot)=>{
  //     let records = [];
  //     snapshot.forEach(childSnapshot=>{
  //       // let keyName = childSnapshot.key;
  //       let data = childSnapshot.val();
  //       records.push({"data":data});
  //     })
  //     settestdata(records);
  //   })
  // }, []);




  //works, but can't render
  // it works now, problem in return part
  useEffect(()=>{
    onValue(ref(db,'/products'),(snapshot)=>{
      const data = snapshot.val();
      if(data!=null){
      settestdata(data)}
    })
  },[]);


  // useEffect(()=>{
  //   onValue(ref(db),(snapshot)=>{
  //     if(snapshot.val() !== null){
  //       settestdata({...snapshot.val()});
  //     }else{
  //       settestdata({});
  //     }
  //   });
  //   return()=>{
  //     settestdata({});
  //   };
  // },[]);






















  // console.log(testdata)
  const sample = useLocation().state;
  let user_email = JSON.parse(localStorage.getItem("user-data")).email;
  let var_user_email = user_email.slice(0, user_email.length-10)


  function cart_function(arg)
  {
    let cart_item = testdata.filter(item =>{
      return Object.keys(item).some(key=>
        item[key].toString().toLowerCase().includes(arg.toLowerCase())
        )
    });
    const timestamp = Date.now();
        set(ref(db, "users/"+var_user_email+"/cart/"+timestamp),{
          product_id: cart_item.product_id,
          product_name: cart_item.product_name,
          platform: cart_item.platform,
          price: cart_item.price,
          images: cart_item.images,
          status: cart_item.status,
          type: cart_item.type
        })

  }
  return (
    <>

      {/* <div>{localStorage.getItem('user-data')}</div>
      <Link to="/test"><button>login</button></Link>
      <div>{sample}</div> */}
      {/* header line section */}
      <div class='header'>
                <Link to="/home"><img id="logo_h" src={logo} alt="logo"></img></Link>
                <Link to="/cart"><img id="sell_h" src={cart} alt="sell"></img></Link>
                <Link to="/"><img id="account_h" src={account}></img></Link>
                <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
      </div>
      <div id="search_bar">
      <input id="search_input" value={filter} placeholder="seach...." onChange={searchText.bind(this)}></input>
      {/* <img id="search_logo"src={logo}></img> */}
      </div>
      
      <div>

        {/* using local json files */}





        
        {/* filter section */}
        <div class='product'>


 
        {Object.keys(dataSearch1).map((id,index)=>{
          return (
            <div className="product_border">
              {dataSearch1[id].status === "sold"? <div style={{width:"100px",backgroundColor:"red",textAlign:"center",transform: "rotate(-45deg)",position:"relative",left:"-25px",top:"10px",color:"white"}}>sold out</div>:<div>"</div>}
              <img id="game_pic" src={dataSearch1[id].images} alt="game_pic"></img>
              <img id="platform_pic" src={dataSearch1[id].platform === "pc" ? windows:dataSearch1[id].platform === "playstation"?ps_logo:dataSearch1[id].platform === "xbox"?xbox_logo:book_logo} alt="platform_pic"></img>
            <div id="game_title">{dataSearch1[id].product_name}</div>
            <div id="game_price">price:{dataSearch1[id].price}</div>
            <Link to="/buy" state={{"id":dataSearch1[id].product_name}}><button style={{padding:"10px",width:"50%",borderRadius:"30px"}}>buy</button></Link>
            <button style={{padding:"10px",width:"50%",borderRadius:"30px",position:"relative"}} onClick={()=>{
              let cart_item = testdata.filter(item =>{
                return Object.keys(item).some(key=>
                  item[key].toString().toLowerCase().includes(dataSearch1[id].product_name.toLowerCase())
                  )
              });
              console.log(cart_item);
              const timestamp = Date.now();
                  set(ref(db, "users/"+var_user_email+"/cart/"+timestamp),{
                    product_id: cart_item[0].product_id,
                    product_name: cart_item[0].product_name,
                    platform: cart_item[0].platform,
                    price: cart_item[0].price,
                    images: cart_item[0].images,
                    status: cart_item[0].status,
                    type: cart_item[0].type
                  })
            }}>add to cart</button>
          </div>
          )
        })}
        </div>


        {/* <div class='filter'>{testdata[0]}</div> */}
        {/* <div>{product_data}</div> */}
        {/* {testdata.map((prod)=>(
              <div>
                <div>{prod}</div>
            </div>
            ))} */}
        

      </div>
      
  
    </>
  );
}

export default App;

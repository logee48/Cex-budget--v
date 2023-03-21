import { useState, useEffect } from 'react';
import { db } from './config';
import { set,ref,onValue } from 'firebase/database';
// import { uid } from 'uid';
import './App.css';
import logo from './images/logo.png';
import account from './images/account_logo.png';
import cart from './images/cart_logo.png';
import sell from './images/selling.png';
import product_data from './sample.json';
import windows from './images/windows.png';
import ps_logo from './images/ps_logo.png';
import xbox_logo from './images/xbox_logo.png';
import Navbar from './Sell';
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
  let dataSearch = product_data.filter(item =>{
    return Object.keys(item).some(key=>
      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  });

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
  console.log(sample);
  return (
    <>
      <div>{sample}</div>
      {/* header line section */}
      <div className='header'>
      <div class='header'>
                <img id="logo_h" src={logo} alt="logo"></img>
                {/* <div class="header_title">Cex 2.0</div> */}
                <Link to="/sell"><img id="sell_h" src={sell} alt="sell"></img></Link>
            </div>
        {/* <button onClick={write_data}>sample</button> */}
      </div>
      <div id="search_bar">
      <input value={filter} placeholder="seach...." onChange={searchText.bind(this)}></input>
      <img id="search_logo"src={logo}></img>
      </div>
      
      <div>
        <div class='product'>
            {/* product display section */}
            {dataSearch.map((prod)=>(
              <div className="product_border">
              {/* <AwesomeSlider> */}
                <img id="game_pic" src={prod.images.url1} alt="game_pic"></img>
                {/* <img id="game_pic" src={prod.images.url2} alt="game_pic"></img>
                <img id="game_pic" src={prod.images.url3} alt="game_pic"></img>
                <img id="game_pic" src={prod.images.url4} alt="game_pic"></img>
              </AwesomeSlider> */}
              <div id="game_title">{prod.product_name}</div>
              <div id="game_price">price:{prod.price}</div>
              {/* <img id="platform_pic" src={for_platform(prod.platform)} alt="platform_pic"></img> */}
              <img id="platform_pic" src={prod.platform === "pc" ? windows:prod.platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
              <Link to="/buy" state={{"id":prod.product_id}}><button>buy</button></Link>
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
        <div>PRoducs</div>
        {/* <Link to="/profile" state={{"id":product_data}}><button>submit</button></Link> */}



        {Object.keys(dataSearch1).map((id,index)=>{
          return (
            // <>
            //   <div>{testdata[id].platform}</div>
            //   <img src={testdata[id].images.url1}></img>


            // </>
            <div className="product_border">
            {/* <AwesomeSlider> */}
              <img id="game_pic" src={dataSearch1[id].images.url1} alt="game_pic"></img>
              {/* <img id="game_pic" src={prod.images.url2} alt="game_pic"></img>
              <img id="game_pic" src={prod.images.url3} alt="game_pic"></img>
              <img id="game_pic" src={prod.images.url4} alt="game_pic"></img>
            </AwesomeSlider> */}
            <div id="game_title">{dataSearch1[id].product_name}</div>
            <div id="game_price">price:{dataSearch1[id].price}</div>
            {/* <img id="platform_pic" src={for_platform(prod.platform)} alt="platform_pic"></img> */}
            <img id="platform_pic" src={dataSearch1[id].platform === "pc" ? windows:dataSearch1[id].platform === "playstation"?ps_logo:xbox_logo} alt="platform_pic"></img>
          </div>
          )
        })}


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

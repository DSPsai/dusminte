import logo from './logo.svg';
import './App.css';
import {
  Routes, Route,
  BrowserRouter,
  useNavigate, Switch,
} from 'react-router-dom';
import Home from './Modules/Home/Home';
import Profile from './Modules/Profile/Profile';
import Search from './Modules/Home/Search';
import ProfileInfo from './Modules/Profile/ProfileInfo';
import Orders from './Modules/Profile/Orders';
import Essentials from './Modules/Essentials/Essentials';
import Products from './Modules/Products';
import CartItems from './Modules/CommonComponents/CartItems';
import { useEffect, useState } from 'react';
import Cart from './Modules/Cart';
import Products2 from './Modules/Products2';
import Dropdown from './Modules/CommonComponents/Dropdown';
import Dropdown2 from './Modules/CommonComponents/Dropdown2';
import Aboutus from './Modules/Profile/Aboutus';
import Help from './Modules/Profile/Help';
import Query from './Modules/Profile/Query';
import Faq from './Modules/Profile/Faq';
import Products3 from './Modules/Product3';
import DM24 from './Modules/DM-24';
import 'react-photo-view/dist/react-photo-view.css';
import { getMasterBanner } from './Apis globals/HomepageApi';
import { getCartData } from './Apis globals/cartAPI';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Coupons from './Modules/Profile/Coupons';
import LoadingAnim from './Modules/CommonComponents/LoadingAnim';
import PlacesOrder from './Modules/CommonComponents/PlacesOrder';
function App() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    let loc = window.location.href.split('/').pop()
    setUrl(loc)
  }, [])
  const [items, setItems] = useState(0)
  const [price, setPrice] = useState(0)
  const Every = () => {
    useEffect(() => {
      console.log('boomerag')
      let cart = getCartData()
      setItems(cart.totalItems);
      setPrice(cart.totalPrice);
    })
  }
  // useEffect(() => {
  //   let last = document.getElementsByClassName('HomeSection3container')
  //   last[last.length - 1].style.paddingBottom = 100
  // }, [items])
  return (
    <div className="App">
      {/* <div id="Transition"></div> */}
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        icon={false}
        draggable
      />
      <LoadingAnim />
      <BrowserRouter >
        <Routes>
          <Route exact path="/" element={<><Home setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Home" element={<><Home setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Search" element={<><Search setBottom={() => { }} bottom={'0vh'} /> <Every /></>} />
          <Route exact path="/Profile" element={<><Profile setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/ProfileEdit" element={<><ProfileInfo /> <Every /></>} />
          <Route exact path="/OrderPlaced" element={<><PlacesOrder setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Orders" element={<><Orders setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Groceries" element={<><Essentials /> <Every /></>} />
          <Route exact path="/Products/:id" element={<><Products setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Product3/:id" element={<><Products3 setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/AboutUs" element={<><Aboutus /> <Every /></>} />
          <Route exact path="/MyCart" element={<><Cart setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/FAQ" element={<><Faq /> <Every /></>} />
          <Route exact path="/DM%2024x7" element={<><DM24 /> <Every /></>} />
          <Route exact path="/Help/Query" element={<><Query /> <Every /></>} />
          <Route exact path="/Help" element={<><Help /> <Every /></>} />
          <Route exact path="/SingleProducts/:id" element={<><Products2 setItems={setItems} setPrice={setPrice} /> <Every /></>} />
          <Route exact path="/Dropdown1/:text" element={<><Dropdown /> <Every /></>} />
          <Route exact path="/Dropdown2/:text" element={<><Dropdown2 /> <Every /></>} />
          <Route exact path="/Coupon" element={<><Coupons /> <Every /></>} />
        </Routes>
        <CartItems items={items} price={price} />
      </BrowserRouter >
      <Search setItems={setItems} setPrice={setPrice} />
    </div >
  );
}

export default App;

/*
how to copy icons from invision?

how to send auth user name and password in postman?
whose that user and pass belongs  to? either company or a single user?
if we send username and password with a api call, doesn't it make your app
 venerable to attackers?
*/




/*
out of stock -> quantity case
ordercalc api not working
coupon apply not working






completed
- operation: "homeSectionByCommunityCityId"->Home page 6 cards
- operation: "listProductByTags" -> 3 rows (recommendations,sales,popular)
- operation: "categoryList" -> grocery page
- operation: "productListByCategory" -> single grocery products (onclick on grocery item)
- operation: "faqList" 
- Home page banner api
- Grocery page banner api
- Home page card click -> page banner api
- Search api

  - 6 cards on click-> popular items data
  - in stock or not api
  - on edit -> get cities,ids api
  {
    "operation": "cityList"
  }
  - get user details api{
    "operation": "userDetail",
    "params":{
        "userId":"5c3f9a7bd22061002f0d31f4"
    }
}

incomplete
- Home page 
  - recommended->view all
  - popular->view all
  - sale->view all
- user cart items checkout apis
  - order calculation api
  - coupon api (get and check apply)
  - checkout api
- profile 
  - general queries api
didn't tested yet
- previously ordered api
*/




/*
incomplete frontend
  - no  products page -> top labels
  - help -> radio button
  - search -> as it in app
  - remove sections on home page->(according to data)
  - filter popular products from "pop" tag api and show on home page onCardClick        
  -- rest of them after api work
*/
/*
extra added 
  -> loading screens
  -> image full view



  
*/










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
        position="top-center"
        autoClose={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
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
incomplete frontend
  - help -> radio button
*/
/*
extra added 
  -> loading screens
  -> image full view


-1.When clicking on fruits & vegetables, 
  the heading inside the page has a spelling mistake. 
  While it should take directly from front tile. 
  Please check if this is not hard coded
2.inside fruits & vegetables, UI mistake in “popular products”- 
  no margin and it should start with the capital letter(same for other tiles)
-3. Inside grocery Sub category are in capital letters but they are being edited 
  as small letters eg> ground spices and masalas etc.
-4. Inside grocery, if one category is expanded, other one should collapse
-5. Also your UI is off. Margins between images / products and size of box is 
   different than original UI
6. Sale tile also as list of “subcategory” as filters. Those are absent
7. DM 24*& UI is absent- header and footer should never disappears. Illustration missing
8. Profile:
  1.Please make the params you are getting from app as non editable- game. 
    Mobile, city, community, and even flat and tower you would be getting from API
  2.Check that all fields are compulsory in profile
  3.Help centre integration is missing. 
    I am unable to click on any of the option except FAQ
3. UI is off. NO top margin is left here
- 4. Hide DM 24*7 orders sections as there are none
- 5. Orders need to be expanded by default.
- 6.Under orders, Need help and reorder tab are visible on the first page itself- 
  checked invasion for the same too
- 7. Reorder is of orange colour
- 8 In orders, need help is not working
- 9.Disable Logout
10- Delivery time is coming as NaN
9. Cart:
*- 1. Already shared the discount issue with you
*- 2. Adding qty is not updating the cart
*- 3. Even adding products from recommendation is not update the cart total. 
  I believe you need to check this. 
  In our UAT app this is not the problem
*- 4 Not able to click on “apply coupon”
*- 5. Not able to click on “proceed” and complete payment in the first go
6. When it did happen, it didn’t take by phone and email 
*- 7. Discount is double minus in some cases- sending you screenshot





    things to do:
        - popular products top padding.
        - Sale -> tags (filters).
        - cart dont proceed unless profile is completed.
        - cart out of stock section.
    Queries:
        for ankitha -
            - DM 24/7 Illustration missing in figma and invision
            - cant understand "UI is off. NO top margin is left here" 
            - in app except faq and queries top two not working
            - mentioned "Not able to click on “apply coupon”" but in 
                api they are all coming 'isActive' as false
            - cant understand "When it did happen, it didn’t take by phone 
                and email" in cart payment
        for kavya -
            - Profile details completed or not - api
            - in Profile details tower name and flat number not coming
            - in "emailSupport" api body -> title value?
            - Expected Delivery time cant find in "orderListByUser" api

*/










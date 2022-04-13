import logo from './logo.svg';
import './App.css';
import {
  Routes, Route,
  BrowserRouter,
  useNavigate,
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
function App() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    let loc = window.location.href.split('/').pop()
    setUrl(loc)
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ThemeProvider theme={AppTheme}> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Search" element={<Search setBottom={() => { }} bottom={'0vh'} />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/ProfileEdit" element={<ProfileInfo />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route exact path="/Groceries" element={<Essentials />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/Product3/:id" element={<Products3 />} />
          <Route exact path="/AboutUs" element={<Aboutus />} />
          <Route exact path="/MyCart" element={<Cart />} />
          <Route exact path="/FAQ" element={<Faq />} />
          <Route exact path="/DM%2024x7" element={<DM24 />} />
          <Route exact path="/Help/Query" element={<Query />} />
          <Route exact path="/Help" element={<Help />} />
          <Route exact path="/SingleProducts" element={<Products2 />} />
          <Route exact path="/Dropdown1" element={<Dropdown />} />
          <Route exact path="/Dropdown2/:text" element={<Dropdown2 />} />
        </Routes>
        <CartItems items={5} price={1000} />
        {/* </ThemeProvider> */}
      </BrowserRouter >
      <Search />
    </div>
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
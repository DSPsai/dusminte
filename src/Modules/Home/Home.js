import React, { useState, useEffect } from 'react'
import '../Styles/Home.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Bottom from '../Bottom'
import Search from './Search';
import { useHistory, useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Home() {
  let name = 'afstst'
  const images = [
    { url: "https://rukminim1.flixcart.com/flap/750/350/image/34da8c2d1bec1851.jpg?q=20" },
    { url: "https://rukminim1.flixcart.com/flap/750/350/image/208c836282c59f1e.jpeg?q=20" },
  ];
  const HomeSection2Card = (data) => {
    return <div onClick={() => go(`/${data.goto}`)} style={{ backgroundImage: `url('${data.img}')` }} className="HomeS2Card">
      <span>{data.name}</span>
    </div>
  }
  const go = useNavigate()
  const S3bottomCard = (data) => {
    const addToCart = () => {
      let temp = dat;
      temp[data.index].isInCart = true;
      temp[data.index].incart = 1
      setDat([...temp])
    }
    function change(bol) {
      let temp = dat;
      if (!temp[data.index].isInCart)
        temp[data.index].isInCart = true
      if (!bol && temp[data.index].incart == 1) {
        temp[data.index].incart = 0;
        temp[data.index].isInCart = false
      } else {
        temp[data.index].incart = bol ? temp[data.index].incart + 1 : temp[data.index].incart - 1
      }
      setDat([...temp])
    }

    return <div className="ProductCard">
      <div style={{ opacity: data.data.off ? 1 : 0 }} className="PCoff">{data.data.off} OFF</div>
      <img src={data.data.src} />
      <div className="crtText lightText">{data.data.brand}</div>
      <span style={{ whiteSpace: 'normal', color: 'rgba(50, 59, 76, 1)' }}>{data.data.name}</span>
      <div style={{ marginTop: 'auto' }} className="crtText lightText">{data.data.capacity}</div>
      <div className="Price"><i class="fa-solid fa-indian-rupee-sign"></i> {data.data.price}
        <span style={{ color: '#5F5F5F', fontSize: '12px' }}>&ensp;<s>{data.data.price}</s></span>
      </div>
      {
        data.data.isInCart ? <>
          <div className="PCBrow ProductAdd">
            <i onClick={() => change(false)} class="fa-solid fa-minus"></i>
            <span>{data.data.incart}</span>
            <i onClick={() => change(true)} class="fa-solid fa-plus"></i>
          </div>
        </> : <button onClick={() => addToCart()} className='ProductAdd'>Add</button>
      }

    </div >
  }
  const [dat, setDat] = useState([
    { name: 'Potato Mixed Fruit Juice', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '30%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '40%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '50%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '60%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '70%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '80%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'Mixed Fruit Juice', incart: 2, isInCart: false, off: '90%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
  ])
  let history = useNavigate();
  const [search, setSearch] = useState('100vh')
  const [data, setData] = useState('')
  async function call() {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL1}`,
      data: {
        "operation": "homepageSectionTile"
      },
      headers: {
        'Authentication': `Bearer ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
    }).then(async response => {
      console.log(response)
      setData(response)
      if (response.data.data == null) {
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL1}`,
          data: {
            "operation": "userLoginAdmin",
            "params":
            {
              "email": "admin@dusminute.com",
              "password": "aDm1n@nk202!",
              "deviceToken": ""
            }
          },
        }).then(async response => {
          console.log(response)
          localStorage.setItem("access", response.data.data.token)
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
              "operation": "homepageSectionTile"
            },
            headers: {
              'Authentication': `Bearer ${response.data.data.token}`,
              'Accept': 'application/json'
            },
          }).then(response => {
            console.log(response)
          }).catch(err => { })
        }).catch(err => {

        })
      }
    }).catch(async err => {
    })
  }
  useEffect(() => {
    document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
    document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60;
    // await axios.post('http://13.232.100.48:8000', {
    //   "operation": "homepageSectionTile"
    // });
    // call()
  }, [])
  return (
    <div className="HomeBap">
      <div className='HomeTop'>
        <span className='HomeTopLocation'>
          <svg width="30" height="30" viewBox="0 0 191 151" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M179.062 75.4981C179.062 74.2467 178.434 73.0464 177.314 72.1615C176.195 71.2766 174.677 70.7794 173.094 70.7794H32.3147L69.8821 41.089C70.437 40.6503 70.8772 40.1294 71.1775 39.5562C71.4779 38.983 71.6325 38.3686 71.6325 37.7481C71.6325 37.1277 71.4779 36.5133 71.1775 35.9401C70.8772 35.3669 70.437 34.846 69.8821 34.4073C69.3271 33.9685 68.6683 33.6205 67.9432 33.3831C67.2181 33.1456 66.441 33.0234 65.6562 33.0234C64.8714 33.0234 64.0942 33.1456 63.3691 33.3831C62.6441 33.6205 61.9852 33.9685 61.4303 34.4073L13.6803 72.1573C13.1245 72.5956 12.6834 73.1163 12.3825 73.6896C12.0816 74.2629 11.9268 74.8775 11.9268 75.4981C11.9268 76.1188 12.0816 76.7334 12.3825 77.3067C12.6834 77.88 13.1245 78.4007 13.6803 78.839L61.4303 116.589C61.9852 117.028 62.6441 117.376 63.3691 117.613C64.0942 117.851 64.8714 117.973 65.6562 117.973C66.441 117.973 67.2181 117.851 67.9432 117.613C68.6683 117.376 69.3271 117.028 69.8821 116.589C70.437 116.15 70.8772 115.629 71.1775 115.056C71.4779 114.483 71.6325 113.869 71.6325 113.248C71.6325 112.628 71.4779 112.013 71.1775 111.44C70.8772 110.867 70.437 110.346 69.8821 109.907L32.3147 80.2169H173.094C174.677 80.2169 176.195 79.7197 177.314 78.8348C178.434 77.9499 179.062 76.7496 179.062 75.4981Z" fill="black" fill-opacity="0.8" />
          </svg>
          <i class="fa-solid fa-location-dot"></i></span>
        <span ><b style={{ fontSize: '18px' }} className='fontcolor'>Brigade Xanadu</b>&ensp;<i style={{ fontSize: '14px' }} onClick={() => history('/ProfileEdit')} class="fontcolor fa-solid fa-chevron-down"></i></span>
        <span style={{ textAlign: 'end' }}><i onClick={() => { history('/'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
      </div>
      <div className="HomeHelloContainer fontcolor">
        <span className='HomeHelloText'> Hello, Ankita
          !</span><br />
        <span style={{ fontSize: '14px' }}>Anything I can help you with ?</span>
      </div>
      <div>
        <Slide arrows={false} easing="ease">
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${images[0].url})` }}>
              {/* <span>Slide 1</span> */}
            </div>
          </div>
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${images[1].url})` }}>
              {/* <span>Slide 2</span> */}
            </div>
          </div>
        </Slide>
      </div>
      <div className="HomeSection2">
        <div style={{ color: 'rgb(54 134 99)', fontSize: '18px', marginTop: '10px', marginBottom: '10px', fontWeight: '600' }} className="">GET ESSENTIALS HOME DELIVERED</div>
        <hr />
        <div className="HomeS2container">
          <HomeSection2Card goto='Products' name='Fruits & Vegitables' img='Images/veggis.png' />
          <HomeSection2Card goto='Groceries' name='Grocery' img='Images/grocery.png' />
          <HomeSection2Card goto='Products' name='Personal care' img='Images/personal.png' />
          <HomeSection2Card goto='Products' name='Cleaning and household' img='Images/clean.png' />
        </div>
      </div>
      <div className="HomeSection3container">
        <div className="S3Top">
          <span style={{ fontWeight: '550', color: '#323B4C', fontSize: '20px' }}> Recommendations </span>
          <div className="S3Right" onClick={() => go('/Product3/Recommendations')}>
            View all &ensp;<i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className="S3Bottom">
          {dat.map((item, index) => {
            return <S3bottomCard index={index} data={item} />
          })}
        </div>
      </div>
      <div style={{ paddingBottom: '100px' }} className="HomeSection3container">
        <div className="S3Top">
          <span style={{ fontWeight: '550', color: '#323B4C', fontSize: '20px' }}> Popular in your society </span>
          <div className="S3Right" onClick={() => go('/Product3/Popular in your society')}>
            View all &ensp;<i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className="S3Bottom">
          {dat.map((item, index) => {
            return <S3bottomCard index={index} data={item} />
          })}
        </div>
      </div>
      {/* <Search setBottom={setSearch} bottom={search} /> */}
      <Bottom show='Home' />
      <pre>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </pre>
    </div>
  )
}

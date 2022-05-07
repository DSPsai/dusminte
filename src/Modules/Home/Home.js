import React, { useState, useEffect } from 'react'
import '../Styles/Home.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Bottom from '../Bottom'
import Search from './Search';
import { useHistory, useNavigate } from "react-router-dom";
import axios from 'axios';
import { getBanner, getHomePageData, getMasterBanner, RecommendedCall } from '../../Apis globals/HomepageApi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { getCartData, getCartDataX, setCartData, setCartDataX } from '../../Apis globals/cartAPI';
import { toast } from 'react-toastify';
import { Authentication } from '../../Apis globals/AuthAPI';
export default function Home(props) {
  let name = 'afstst'
  const [images, setImages] = useState([]);
  const HomeSection2Card = (data) => {
    // console.log(data)
    return <div onClick={() => data.name == 'Grocery' ? go('/Groceries') : data.navLink == 'SALE' ? go(`/Product3/SALE`) : go(`/Products/${data.navLink}`)} style={{ backgroundImage: `url('${data.img}')` }} className="HomeS2Card">
      <span>{data.name}</span>
    </div>
  }
  const go = useNavigate()
  const S3bottomCard = (data) => {
    const addToCart = () => {
      let temp = data.Odata;
      temp[data.index].isInCart = true;
      temp[data.index].incart = 1
      let e = getCartData()
      let another = data.data.id.toString()
      setCartDataX(data.data)
      // let temper = {}
      // temper = 
      e[another] = { name: data.data.id.toString(), cprice: data.data.cprice, quantity: 1 }
      console.log(e, Object.keys(e).length)
      e.totalItems = Object.keys(e).length - 2
      if (e.totalItems <= 1) {
        e.totalItems = 1
      }
      let total = 0
      for (let i in e) {
        try {
          if (e[i].cprice != undefined || e[i].cprice != null)
            total = (e[i].cprice * e[i].quantity) + total
          console.log(i)
        } catch (e) {
          console.log(e)
        }
      }
      e.totalPrice = total
      props.setItems(e.totalItems)
      props.setPrice(total)
      setCartData(e)
      data.setData([...temp])
      console.log({ ...e }.length)
      // document.getElementById('cartItemNumber').innerText = e.length
      // document.getElementsByClassName("CartPopUthop")[0].style.opacity = 1
      // document.getElementsByClassName("CartPopUthop")[0].style.zIndex = 10
    }
    const change = (sum) => {
      let temp = data.Odata;
      let cart = getCartData()
      if (!sum && temp[data.index].incart == 1) {
        getCartDataX().then(cd => {
          let cdx = cd
          delete cdx[data.data.id.toString()]
          console.log(cdx)
          console.log(data.data)
          setCartDataX(cdx)
        })
        temp[data.index].incart = 0;
        temp[data.index].isInCart = false
        cart.totalItems = cart.totalItems - 1
        delete cart[data.data.id.toString()];
        let total = 0
        for (let i in cart) {
          try {
            if (cart[i].cprice != undefined || cart[i].cprice != null)
              total = (cart[i].cprice * cart[i].quantity) + total
            console.log(i)
          } catch (e) {
            console.log(e)
          }
        }
        cart.totalPrice = total
        console.log(cart)
        props.setItems(cart.totalItems)
        props.setPrice(total)
        setCartData(cart)
      } else {
        if (sum) {
          if ((temp[data.index].incart + 1) > data.data.stock) {
            if (document.getElementsByClassName('Toastify')[0].getElementsByClassName('Toastify__toast').length <= 0)
              toast.error(`Stock available only ${data.data.stock}`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
          } else {
            temp[data.index].incart = temp[data.index].incart + 1;
            cart["" + data.data.id].quantity += 1
          }
        } else {
          temp[data.index].incart = temp[data.index].incart - 1
          cart["" + data.data.id].quantity -= 1
        }
        // document.getElementById('cartItemNumber').innerText = cart.length
        cart.totalItems = Object.keys(cart).length - 2
        let total = 0
        for (let i in cart) {
          try {
            if (cart[i].cprice != undefined || cart[i].cprice != null)
              total = (cart[i].cprice * cart[i].quantity) + total
            console.log(i)
          } catch (e) {
            console.log(e)
          }
        }
        cart.totalPrice = total
        props.setItems(cart.totalItems)
        props.setPrice(total)
        setCartData(cart)
        console.log(cart)
        // temp[props.index].incart = sum ? temp[props.index].incart + 1 : temp[props.index].incart - 1
      }
      data.setData([...temp])
    }
    // let masterCart = getCartData()

    return data.data.name == 'test' ? <div class="card">
      <div class="card__image loading"></div>
      <div class="card__title loading"></div>
      <div class="card__description loading"></div>
    </div> : <div className="ProductCard">
      <div style={{ opacity: data.data.off ? 1 : 0 }} className="PCoff"><i style={{ fontSize: '10px' }} class="fa-solid fa-indian-rupee-sign"></i> {data.data.off} OFF</div>
      {/* <img src={data.data.img} /> */}
      <PhotoProvider>
        <PhotoView src={data.data.img} >
          <img src={data.data.img} alt="" />
        </PhotoView>
      </PhotoProvider>
      <div className="crtText lightText">{data.data.brand}</div>
      <span className='NameElipse' style={{ whiteSpace: 'normal', color: 'rgba(50, 59, 76, 1)' }}>{data.data.name}</span>
      <div style={{ marginTop: 'auto' }} className="crtText lightText">{data.data.quantity}</div>
      <div className="Price"><i class="fa-solid fa-indian-rupee-sign"></i> {data.data.cprice}
        <span style={{ color: '#5F5F5F', fontSize: '12px' }}>&ensp;<s>{data.data.cprice == data.data.price ? "" : data.data.price}</s></span>
      </div>
      {
        data.data.isInCart ? <>
          <div style={{ marginTop: 5, marginBottom: 5, padding: '0px !important' }} className="PCBrow ProductAdd">
            <i onClick={() => {
              console.log(data.data.incart, data.data.stock)
              if ((data.data.incart + 1) > data.data.stock) {
                // setDis(true)
              }
              else {
                // setDis(false)
              }
              change(false)
            }} class="fa-solid fa-minus"></i>
            <span>{data.data.incart}</span>
            <i style={{
              borderRadius: '0 10px 10px 0',
              backgroundColor: (data.data.incart + 1) > data.data.stock ? '#bbd7cf' : ''
            }}
              onClick={() => {
                console.log(data.data.incart, data.data.stock)
                if ((data.data.incart + 1) <= data.data.stock) {
                  change(true)
                  // setDis(false)

                } else {
                  // setDis(true)
                  if (document.getElementsByClassName('Toastify')[0].getElementsByClassName('Toastify__toast').length <= 0)
                    toast.error(`Stock available only ${data.data.stock}`, {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                }
              }} class="fa-solid fa-plus"></i>
          </div>
        </> : <button onClick={() => addToCart()} className='ProductAdd'>Add</button>
      }

    </div >
  }
  const [dat, setDat] = useState([
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
  ])
  const [rec, serRec] = useState([
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
  ])
  const [pop, serPop] = useState([
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
  ])
  const [sale, serSale] = useState([
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
    { name: 'test', incart: 2, isInCart: false, off: '10%', src: 'Images/corn.png', capacity: '1L', cutprice: 150, price: '110', brand: 'TROPICANA' },
  ])
  let masterCart = getCartData()
  let history = useNavigate();
  const [search, setSearch] = useState('100vh')
  const [data, setData] = useState('')
  async function call() {
    async function callAuth() {
      // if (localStorage.getItem('UserData') == undefined) {
        // console.log('one')
        return await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL1}`,
          data: {
            "operation": "userLoginMobile",
            "params": {
              "mobile": "7760838386"
            }
          },
        }).then(async response => {
          // console.log('two')
          localStorage.setItem("access", response.data.data.userData.token)
          // console.log('three')
          console.log(response.data)
          if (response.data.data.userData.user._id != undefined)
            return await axios({
              method: "post",
              url: `${process.env.REACT_APP_API_URL1}`,
              data: {
                "operation": "userDetail",
                "params": {
                  "userId": response.data.data.userData.user._id
                }
              },
              headers: {
                'Authentication': `Bearer ${response.data.data.userData.token}`,
                'Accept': 'application/json'
              },
            }).then(async response => {
              console.log('executed')
              // localStorage.setItem("access", response.data.data.userData.token)
              localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
              setUser({ ...response.data.data.user })
              return response.data.data.user
            }).catch(e => { })
          // localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
          // return response.data.data.user
        }).catch(e => { })
      // }
    }
    await callAuth().then(async (er) => {
      console.log(er)
      await getHomePageData().then(async easd => {
        if (easd == null) {
          await callAuth().then(() => {
            getHomePageData().then(async ea => {
              setCate([...ea])
            })
          })
          try {
            let da = JSON.parse(localStorage.getItem('UserData'))
            setLoc(da.communityId.name)
          } catch (er) { setLoc('') }
        } else {
          setCate([...easd])
          setUser({ ...JSON.parse(localStorage.getItem('UserData')) })
        }
      }
      );

      RecommendedCall("rec").then(e => {
        let temp = []
        for (let i of e) {
          temp.push({
            isInCart: masterCart[i._id] != undefined ? true : false,
            img: i.image,
            brand: i.brand,
            incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity : 0,
            name: i.name,
            quantity: i.unit,
            price: i.price,
            stock: i.quantity,
            off: i.priceDiscount,
            cprice: i.priceDiscounted,
            id: i._id
          })
        }
        serRec([...temp])
      })
      RecommendedCall("pop").then(e => {
        let temp = []
        for (let i of e) {
          temp.push({
            isInCart: masterCart[i._id] != undefined ? true : false,
            img: i.image,
            brand: i.brand,
            incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity : 0,
            name: i.name,
            quantity: i.unit,
            stock: i.quantity,
            price: i.price,
            off: i.priceDiscount,
            cprice: i.priceDiscounted,
            id: i._id
          })
        }
        serPop([...temp])
      })
      RecommendedCall("sale").then(e => {
        let temp = []
        for (let i of e) {
          temp.push({
            isInCart: masterCart[i._id] != undefined ? true : false,
            img: i.image,
            brand: i.brand,
            incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity : 0,
            name: i.name,
            quantity: i.unit,
            price: i.price,
            off: i.priceDiscount,
            cprice: i.priceDiscounted,
            id: i._id
          })
        }
        serSale([...temp])
      })
      getBanner().then(e => {
        // console.log(e)
        let temp = []
        for (let i of e) {
          try {
            temp.push({ url: i.image, isSingle: true, to: i.redirect.categoryId.name, goUrl: i.redirect.url, screen: i.redirect.screen })
          } catch (e) {
            temp.push({ url: i.image, isSingle: false, to: i.redirect.productId.parentCategory, goUrl: i.redirect.url, screen: i.redirect.screen })
          }
        }
        setImages(temp)
        document.getElementById('loadme').style.display = 'none'
      })
    })

    // await axios({
    //   method: "post",
    //   url: `${process.env.REACT_APP_API_URL1}`,
    //   data: {
    //     "operation": "homepageSectionTile"
    //   },
    //   headers: {
    //     'Authentication': `Bearer ${localStorage.getItem('access')}`,
    //     'Accept': 'application/json'
    //   },
    // }).then(async response => {
    //   console.log(response)
    //   if (response.data.data == null) {
    //     await axios({
    //       method: "post",
    //       url: `${process.env.REACT_APP_API_URL1}`,
    //       data: {
    //         "operation": "userLoginAdmin",
    //         "params":
    //         {
    //           "email": "admin@dusminute.com",
    //           "password": "aDm1n@nk202!",
    //           "deviceToken": ""
    //         }
    //       },
    //     }).then(async response => {
    //       console.log(response)
    //       localStorage.setItem("access", response.data.data.token)
    //       await axios({
    //         method: "post",
    //         url: `${process.env.REACT_APP_API_URL1}`,
    //         data: {
    //           "operation": "homeSectionByCommunityCityId",
    //           "params": {
    //             "cityId": 1,
    //             "communityId": 1004
    //           }
    //         },
    //         headers: {
    //           'Authentication': `Bearer ${response.data.data.token}`,
    //           'Accept': 'application/json'
    //         },
    //       }).then(response => {
    //         // HomePageByCommunity().then(e => { setData(e); console.log(e) })
    //         setCate([...response.data.data[1].tile])
    //       }).catch(err => { })
    //     }).catch(err => {

    //     })
    //   } else {
    //     setCate([...response.data.data[1].tile])
    //   }
    // }).catch(err => {
    // })
  }
  useEffect(() => {
    document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
    document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60;
    document.getElementById('loadme').style.display = 'flex'
    localStorage.removeItem("community")
    localStorage.removeItem("location")
    localStorage.removeItem('tower')
    localStorage.removeItem('flat')
    if (document.getElementsByClassName('CartPopUthop')[0].style.opacity == 0)
      setPadding('50px')
    else
      setPadding('100px')
    // await axios.post('http://13.232.100.48:8000', {
    //   "operation": "homepageSectionTile"
    // });
    call()
    try {
      let da = JSON.parse(localStorage.getItem('UserData'))
      setLoc(da.communityId.name)
    } catch (er) { setLoc('') }
  }, [])
  const [UserLoc, setLoc] = useState('')
  const [cate, setCate] = useState([])
  const [userDat, setUser] = useState({
    name: ''
  })
  const [padding, setPadding] = useState('100px')
  return (
    <div className="HomeBap">
      <div style={{ gridTemplateColumns: '60px auto 40px' }} className='HomeTop'>
        <span className='HomeTopLocation'>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
          </svg>
          <i style={{ marginLeft: '15px' }} class="fa-solid fa-location-dot"></i></span>
        <span ><b style={{ fontSize: '18px' }} onClick={() => history('/ProfileEdit')} className='fontcolor'>{UserLoc}</b>&ensp;
          {/* <i style={{ fontSize: '14px' }} class="fontcolor fa-solid fa-chevron-down"></i> */}
        </span>
        <span style={{ textAlign: 'end' }}><i onClick={() => { history('/'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
      </div>
      <div className="HomeHelloContainer fontcolor">
        <span className='HomeHelloText'> Hello, {userDat.name}
          !</span><br />
        <span style={{ fontSize: '14px' }}>Anything I can help you with ?</span>
      </div>
      <div>
        <Slide arrows={false} easing="ease">
          {images.map(img => {
            return <div onClick={() => {
              if (img.goUrl == "") {
                if (img.screen == "") {
                  localStorage.setItem('labels', JSON.stringify([]))
                  if (!img.isSingle) localStorage.setItem('isBanner', true)
                  go(`/SingleProducts/${img.to.replaceAll("/", ".").replaceAll(" ", "-")}`)
                } else {
                  go(`/Groceries`)
                }
              } else {
                window.location.href = img.goUrl
              }
            }} className="each-slide">
              <div style={{ 'backgroundImage': `url(${img.url})` }}>
              </div>
            </div>
          })}
        </Slide>
      </div>
      <div className="HomeSection2">
        <div style={{ color: 'rgb(54 134 99)', fontSize: '18px', marginTop: '10px', marginBottom: '10px', fontWeight: '600' }} className="">GET ESSENTIALS HOME DELIVERED</div>
        <hr />
        <div className="HomeS2container">
          {cate.map(item => {
            return <HomeSection2Card navLink={item.navLink} goto={item.title == 'Grocery' ? 'Groceries' : item.title == 'SALE' ? "Product3" : 'Products'} name={item.title} img={item.bgImg} />
          })}
          {/* <HomeSection2Card goto='Products' name='Fruits & Vegitables' img='Images/veggis.png' />
          <HomeSection2Card goto='Groceries' name='Grocery' img='Images/grocery.png' />
          <HomeSection2Card goto='Products' name='Personal care' img='Images/personal.png' />
          <HomeSection2Card goto='Products' name='Cleaning and household' img='Images/clean.png' /> */}
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
          {rec.map((item, index) => {
            return <S3bottomCard Odata={rec} setData={serRec} index={index} data={item} />
          })}
        </div>
      </div>
      <div style={{ paddingBottom: padding }} className="HomeSection3container">
        <div className="S3Top">
          <span style={{ fontWeight: '550', color: '#323B4C', fontSize: '20px' }}> Popular in your society </span>
          <div className="S3Right" onClick={() => go('/Product3/Popular in your society')}>
            View all &ensp;<i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className="S3Bottom">
          {pop.map((item, index) => {
            return <S3bottomCard Odata={pop} setData={serPop} index={index} data={item} />
          })}
        </div>
      </div>
      {/* <div style={{ paddingBottom: '100px' }} className="HomeSection3container">
        <div className="S3Top">
          <span style={{ fontWeight: '550', color: '#323B4C', fontSize: '20px' }}> Sale </span>
          <div className="S3Right" onClick={() => go('/Product3/Popular in your society')}>
            View all &ensp;<i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className="S3Bottom">
          {sale.map((item, index) => {
            return <S3bottomCard Odata={sale} setData={serSale} index={index} data={item} />
          })}
        </div>
      </div> */}
      {/* <Search setBottom={setSearch} bottom={search} /> */}
      <Bottom show='Home' />
      <pre>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </pre>
    </div>
  )
}

/*

1. Order Calculation
2. Coupon Apply
3. Recommended and popular "View All" api
4. Banner navigation and call api

*/
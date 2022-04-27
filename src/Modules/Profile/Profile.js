import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../Apis globals/AuthAPI';
import Bottom from '../Bottom'
import Search from '../Home/Search';
import ScrollTop from '../ScrollTop';
import '../Styles/Profle.css'
import { setCartData as setCart } from '../../Apis globals/cartAPI'
export default function Profile(props) {
  let history = useNavigate();
  const [search, setSearch] = useState('-100vh')
  const orderData = [
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
    {
      id: '#2321321', status: 'In-transit', Odate: '12 Aug', Ddate: '14 Aug', items: 'House audit Package x1, Full house deep cleaning x1', payment: 'Pay on Delivery',
    },
  ]
  const go = useNavigate()

  const [OrderDatas, setOdata] = useState([
    {
      id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
      data: [
        { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
        { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
        { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
        { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
      ],
      subtotal: '1250', Discount: '1250', deliveryFee: '1250',
      total: '12500', Rew: '1250', expand: false
    },
  ])
  const cancel = async (id) => {
    document.getElementById('loadme').style.display = 'flex'
    console.log(id)
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL1}`,
      data: {
        "operation": "orderCancel",
        "params": {
          'orderId': id
        }
      },
      headers: {
        'Authentication': `Bearer ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
    }).then(async response => {
      // razorPay(response.data.data.id)
      console.log(response)
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: {
          "operation": "orderListByUser",
        },
        headers: {
          'Authentication': `Bearer ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        },
      }).then(response => {
        // razorPay(response.data.data.id)
        /*{
        id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
        data: [
            { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
            { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
            { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
            { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
        ],
        subtotal: '1250', Discount: '1250', deliveryFee: '1250',
        total: '12500', Rew: '1250', expand: false
    }, */
        let temp = []
        for (let i of response.data.data) {
          let isServ = i.order == undefined
          if (!isServ) {
            let temp2 = {}
            temp2.id = i.order.id;
            temp2.Pdate = i.order.createdAt
            temp2.status = i.order.isDelivered ? 'Delivered' : i.order.isCancelled ? 'Cancelled' : 'Ordered'
            let totP = 0
            temp2.data = i.orderItems.map(item => {
              totP += item.productId.priceDiscounted
              return {
                name: item.productId.name,
                capacity: item.productId.unit,
                quantity: item.quantity,
                _id: item.productId._id,
                price: item.productId.priceDiscounted
              }
            })
            temp2.totP = totP
            temp2.subtotal = i.order.cartrequest.total
            temp2.Discount = i.order.discount
            temp2.deliveryFee = i.order.cartrequest.deliveryCharges
            temp2.total = i.order.amountTotal
            temp2.isDelivered = i.order.isDelivered
            temp2.isCancelled = i.order.isCancelled
            console.log(i.order)
            temp2._id = i.order._id
            temp2.Rew = "0"
            temp2.expand = false
            temp.push(temp2)
          }
        }
        console.log(temp)
        setOdata([...temp])
        document.getElementById('loadme').style.display = 'none'
      }).catch(err => {
        console.log(err)
        document.getElementById('loadme').style.display = 'none'
      })
    }).catch(err => {
      console.log(err)
      document.getElementById('loadme').style.display = 'none'
    })
  }
  const getOrders = async () => {
    document.getElementById('loadme').style.display = 'flex'
    return await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL1}`,
      data: {
        "operation": "orderListByUser",
      },
      headers: {
        'Authentication': `Bearer ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
    }).then(response => {
      let temp = []
      for (let i of response.data.data) {
        let isServ = i.order == undefined
        if (!isServ) {
          let temp2 = {}
          temp2.id = i.order.id;
          temp2.Pdate = i.order.createdAt
          temp2.status = i.order.isDelivered ? 'Delivered' : i.order.isCancelled ? 'Cancelled' : 'Ordered'
          let totP = 0
          temp2.data = i.orderItems.map(item => {
            totP += item.productId.priceDiscounted
            return {
              name: item.productId.name,
              capacity: item.productId.unit,
              quantity: item.quantity,
              _id: item.productId._id,
              price: item.productId.priceDiscounted
            }
          })
          temp2.totP = totP
          temp2.subtotal = i.order.cartrequest.total
          temp2.Discount = i.order.discount
          temp2.deliveryFee = i.order.cartrequest.deliveryCharges
          temp2.total = i.order.amountTotal
          temp2.isDelivered = i.order.isDelivered
          temp2.isCancelled = i.order.isCancelled
          console.log(i.order)
          temp2._id = i.order._id
          temp2.Rew = "0"
          temp2.expand = false
          temp.push(temp2)
        }
      }
      console.log(temp)
      document.getElementById('loadme').style.display = 'none'
      setOdata([...temp])
    }).catch(err => {
      console.log(err)
      document.getElementById('loadme').style.display = 'none'
    })
  }
  const LeftRight = (data) => {
    return <div className="row">
      <span>{data.dat.name + " (" + data.dat.capacity + ") " + data.dat.quantity} </span>
      <span>{data.dat.price}</span>
    </div>
  }
  // const OrderData = (dat) => {
  //   return <><div className="POrderContainer">
  //     <div className="row POrderS1">
  //       <div className="PorderIcon">
  //         <i class="fa-solid fa-briefcase"></i>
  //       </div>
  //       <div className="PorderID">Order ID {dat.data.id}</div>
  //       <div className="PorderStatus"><b>{dat.data.status}</b></div>
  //     </div>
  //     <div className="row POrderS2">
  //       <div className="lightText">Ordered</div>
  //       <input type="range" min="1" max="100" value="50" />
  //       <div className="lightText">Expected</div>
  //     </div>
  //     <div className="row POrderS2">
  //       <div className="span">{dat.data.Pdate}</div>
  //       <div className="span">{dat.data.Ddate}</div>
  //     </div>
  //     <hr />
  //     {dat.data.expand ?
  //       <div className="OPCRows">
  //         {dat.data.data.map(item => {
  //           return <LeftRight dat={item} />
  //         })}
  //         <div className="row">
  //           <span><b>Subtotal</b> </span>
  //           <span><b>{dat.data.subtotal}</b></span>
  //         </div>
  //         <div className="row">
  //           <span>Discount </span>
  //           <span><div className="greentext">-{dat.data.Discount}</div></span>
  //         </div>
  //         <div className="row">
  //           <span>Delivery fee </span>
  //           <span>{dat.data.deliveryFee}</span>
  //         </div>
  //         <div className="row">
  //           <span><b>Total</b> </span>
  //           <span><b>{dat.data.total}</b></span>
  //         </div>
  //         <div style={{ marginLeft: '-20px', marginRight: '-20px', padding: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'rgba(244, 244, 244, 1)' }} className="row">
  //           <span style={{ opacity: '0.8' }}> <b>Reward Points Used</b> </span>
  //           <span>{dat.data.Rew}</span>
  //         </div>
  //         <div style={{ marginBottom: '-10px', marginTop: '10px' }} className="row">
  //           <span className='greentext'> <b>Need Help?</b> </span>
  //           <span style={{ color: 'orange' }}>Re-Order</span>
  //         </div>
  //       </div >
  //       :
  //       <div className="row POrderItems">
  //         <span>{
  //           dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
  //           dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
  //           dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
  //         } <div onClick={() => {
  //           let temp = OrderDatas;
  //           console.log(dat.index)
  //           temp[dat.index].expand = true;
  //           setOdata([...temp])
  //         }} className="greentext">
  //             <u>+4 others</u>
  //           </div>
  //         </span>
  //         <span><b>{dat.data.payment}</b></span>
  //       </div>
  //     }
  //     <div className="row PorderLast">
  //       <div className="greentext">Need help?</div>
  //       <div className="redtext">Cancel Booking</div>
  //     </div>
  //   </div>
  //     <div className="backgroundgrey"></div>
  //   </>
  // }
  const [showOrders, setShowOrders] = useState(false)
  useEffect(() => {
    localStorage.removeItem("community")
    localStorage.removeItem("location")
    localStorage.removeItem('tower')
    localStorage.removeItem('flat')
    document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    SuData({ ...JSON.parse(localStorage.getItem('UserData')) })
    getOrders().then(or => {
      // setOdata([...or])
    })
    try {
      if (JSON.parse(localStorage.getItem('UserData')).name == null) {
        Authentication().then(e => {
          let temp = {}
          temp.name = e.name == undefined ? "" : e.name
          temp.mobile = e.mobile == undefined ? "" : e.mobile
          temp.email = e.email == undefined ? "" : e.email
          temp.communityId.name = e.communityId.name == undefined ? "" : e.communityId.name
          temp.communityId.address = e.communityId.address == undefined ? "" : e.communityId.address
          SuData({ ...temp })
          setLoad(true)
        })
        try {
          let da = JSON.parse(localStorage.getItem('UserData'))
          setLoc(da.communityId.name)
        } catch (er) { setLoc('') }
      } else {
        setLoad(true)
      }
    } catch (er) {
      Authentication().then(e => {
        console.log(e.communityId.name)
        let temp = {}
        temp.name = e.name == undefined ? "" : e.name
        temp.mobile = e.mobile == undefined ? "" : e.mobile
        temp.email = e.email == undefined ? "" : e.email
        temp.communityId.name = e.communityId.name == undefined ? "" : e.communityId.name
        temp.communityId.address = e.communityId.address == undefined ? "" : e.communityId.address
        SuData({ ...temp })
        setLoad(true)
        try {
          let da = JSON.parse(localStorage.getItem('UserData'))
          setLoc(da.communityId.name)
        } catch (er) { setLoc('') }
      })
    };
    try {
      let da = JSON.parse(localStorage.getItem('UserData'))
      setLoc(da.communityId.name)
    } catch (er) { setLoc('') }
  }, [])
  const [uData, SuData] = useState({})
  const [load, setLoad] = useState(false)
  const OrderTemplate = (dat) => {
    let date = new Date(dat.data.Pdate)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return <div className="OrderCard">
      <div className="OPC1 row">
        <i class="fa-solid fa-briefcase"></i>
        <div className="OPC11 column">
          <div className=""><b>Order ID {dat.data.id}</b></div>
          <div className="OPDates">placed {date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()}</div>
        </div>
        <div className="column">
          <div className={dat.data.isCancelled ? "redtext" : "greentext"}>{dat.data.status}</div>
          <div className="OPDates OPC12">{dat.data.Ddate}</div>
        </div>
      </div>
      <hr />
      <br />
      {dat.data.expand ?
        <div className="OPCRows">
          {dat.data.data.map(item => {
            return <LeftRight dat={item} />
          })}
          <div className="row">
            <span><b>Subtotal</b> </span>
            {/* <span><b>{dat.data.subtotal}</b></span> */}
            <span><b>{dat.data.totP}</b></span>
          </div>
          <div className="row">
            <span>Discount </span>
            <span><div className="greentext">-{dat.data.totP - dat.data.subtotal}</div></span>
          </div>
          <div className="row">
            <span>Delivery fee </span>
            <span>{dat.data.deliveryFee}</span>
          </div>
          <div className="row">
            <span><b>Total</b> </span>
            <span><b>{dat.data.subtotal}</b></span>
          </div>
          <div style={{ marginLeft: '-20px', marginRight: '-20px', padding: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'rgba(244, 244, 244, 1)' }} className="row">
            <span style={{ opacity: '0.8' }}> <b>Reward Points Used</b> </span>
            <span>{dat.data.Rew}</span>
          </div>
          <div style={{ marginBottom: '-10px', marginTop: '10px' }} className="row">
            <span className='greentext'> <b>Need Help?</b> </span>
            <span
              onClick={() => { dat.data.isCancelled || dat.data.isDelivered ? reOrder(dat.data.data) : cancel(dat.data._id); console.log(dat.data) }}
              style={{ color: dat.data.isDelivered ? 'orange' : 'red' }}>{!dat.data.isDelivered ? dat.data.isCancelled ? "Re-Order" : "Cancel Order" : "Re-Order"}</span>
          </div>
        </div >
        :
        <div className="row POrderItems">
          <span>{
            dat.data.data.slice(0, 4).map((i, ind) => {
              return i.name + " ( " + i.capacity + " ) x" + i.quantity + `${ind != dat.data.data.length - 1 ? " , " : ""}`
            })
            // dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
            // dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
            // dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
          } <div onClick={() => {
            let temp = OrderDatas;
            temp[dat.index].expand = true;
            console.log([...temp])
            setOdata([...temp])
          }} className="greentext">
              <u>see more</u>
            </div>
          </span>
          <span><b>{dat.data.payment}</b></span>
        </div>
      }
    </div >
  }
  const reOrder = async (dat) => {
    let temp = {}
    let price = 0
    for (let i of dat) {
      temp[i._id] = { name: i._id, cprice: i.price, quantity: i.quantity }
      price += i.price * i.quantity
    }
    temp.totalItems = dat.length
    temp.totalPrice = price
    console.log(temp)
    setCart(temp)
    // localStorage.setItem('CartData', JSON.stringify(temp))
    props.setItems(dat.length)
    props.setPrice(price)
    go("/MyCart")
    /**
     [
        {
            "name": "BATTER - IDLI DOSA",
            "capacity": "1 KG",
            "quantity": 1,
            "price": 75,
            "_id": "62657d4f5717a4263e9a46fe"
        },
    ]
     */
    // console.log(dat)
  }
  const [UserLoc, setLoc] = useState('')
  return (
    <div className='ProfileContainer'>
      <div className='HomeTop'>
        <span className='HomeTopLocation'><i class="fa-solid fa-location-dot"></i></span>
        <span ><b style={{ fontSize: '18px' }} onClick={() => history('/ProfileEdit')}
          className='fontcolor'>{UserLoc}</b>&ensp;
        </span>
        <span style={{ textAlign: 'end' }}><i onClick={() => { history('/Profile'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
      </div>
      <div style={{ marginTop: '60px' }} className="profileNameCard">
        <div className="profileName"><b>{load && uData.name}</b></div>
        <div className="profileMail"> {load && uData.mobile} <i style={{ fontSize: '5px', margin: '0 5px' }} class="fa-solid fa-circle"></i> {load && uData.email}</div>
      </div>
      <div style={{ fontWeight: '500', fontSize: '16.5px' }} onClick={() => go('/ProfileEdit')} className="S3Right">
        Edit
      </div>
      <div style={{ paddingTop: '0px' }} className="profileNameCard">
        <div style={{ fontSize: '14px', marginTop: '-10px' }} className="profileName"><b>Address</b></div>
        <div className="profileMail">
          {load && uData.name + ", " + uData.mobile}<br />
          {load && uData.communityId.name + ", " + uData.communityId.address}
        </div>
      </div>
      <div className="ProfileCard">
        <div className="ProfileCardIcon">
          <i class="fa-solid fa-comments"></i>
        </div>
        <div onClick={() => go('/Help')} className="column">
          <div className="profileCardName">Help Center</div>
          <div className="ProfileCardInfo">Contact us for any Queries</div>
        </div>
        <div className="ProfileCardLast">
          <div className="S3Right">

          </div>
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
      {/* <div className="ProfileCard">
        <div className="ProfileCardIcon">
          <i class="fa-solid fa-circle-dollar-to-slot"></i>
        </div>
        <div className="column">
          <div className="profileCardName">My Subscriptions</div>
          <div className="ProfileCardInfo">Lorem Ipusm Here</div>
        </div>
        <div className="ProfileCardLast row">
          <div className="S3Right">
            01 Active
          </div>
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>*/}
      <div className="ProfileCard">
        <div className="ProfileCardIcon">
          <i class="fa-solid fa-qrcode"></i>
        </div>
        <div className="column">
          <div className="profileCardName">DM 24x7 Orders</div>
          <div className="ProfileCardInfo">Here you'll see all DM 24x7 Orders</div>
        </div>
        <div className="ProfileCardLast row">
          {/* <div className="S3Right">
            $234
          </div> */}
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
      <div style={{ fontSize: '19px', marginLeft: '20px', marginBottom: '14px', marginTop: '28px', textAlign: 'initial' }}>Orders</div>
      <div
        onClick={(e) => {
          // console.log(e)
          if (showOrders) {
            document.getElementsByClassName('iasd')[0].style.transform = 'rotate(0deg)';
            setShowOrders(false)
          } else {
            document.getElementsByClassName('iasd')[0].style.transform = 'rotate(180deg)';
            // e.target.style.transform = 'rotate(180deg)';
            setShowOrders(true)
          }
        }} className="ProfileCard">
        <div className="ProfileCardIcon">
          <i class="fa-solid fa-circle-dollar-to-slot"></i>
        </div>
        <div className="column">
          <div className="ProfileCardInfo"></div>
          <div className="profileCardName">Orders</div>
        </div>
        <div
          className="ProfileCardLast row">
          {/* <div className="S3Right">
            $234
          </div> */}
          <i onClick={(e) => {
            // if (showOrders) {
            //   e.target.style.transform = 'rotate(0deg)';
            //   setShowOrders(false)
            // } else {
            //   e.target.style.transform = 'rotate(180deg)';
            //   setShowOrders(true)
            // }
          }} class="fa-solid fa-angle-down iasd"></i>
        </div>
      </div>
      <div className="POrderDataContainer" style={{ height: showOrders ? 'auto' : '0px' }}>
        {OrderDatas.map((item, index) => {
          return <OrderTemplate index={index} data={item} />
        })}

        <div style={{ backgroundColor: 'rgba(244, 244, 244, 1)', paddingBottom: '20px' }} className="kali">
          <u onClick={() => go('/Orders')} style={{ opacity: '0.8', padding: '5px', width: '100%', textAlign: 'center', marginBottom: '100px' }}>See More Orders</u>
        </div>
      </div>
      {/* <div className=" ProfileOrderShow row ProfileCard">
        <i style={{ fontSize: '35px', textAlign: 'center' }} class="fa-solid fa-receipt"></i>
        <span style={{ marginLeft: '25px' }}>Orders</span>
        <i onClick={(e) => {
          if (showOrders) {
            e.target.style.transform = 'rotate(0deg)';
            setShowOrders(false)
          } else {
            e.target.style.transform = 'rotate(180deg)';
            setShowOrders(true)
          }
        }} class="fa-solid fa-angle-down"></i>
      </div>
      <div className="POrderDataContainer" style={{ height: showOrders ? 'auto' : '0px' }}>
        {OrderDatas.map((item, index) => {
          return <OrderData index={index} data={item} />
        })}

        <div style={{ backgroundColor: 'rgba(244, 244, 244, 1)', paddingBottom: '200px' }} className="kali">
          <u onClick={() => go('/Orders')} style={{ opacity: '0.8', padding: '5px', width: '100%', textAlign: 'center', marginBottom: '100px' }}>See More Orders</u>
        </div>
      </div> */}
      {/* <div className="PtofileBottomFixed">
        <div className="row">
          <i class="fa-solid fa-circle-info"></i>
          <span className='initial'><b>About Us</b></span>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div className="row">
          <i style={{ color: 'red' }} class="fa-solid fa-power-off"></i>
          <span className='initial redtext'>Logout</span>
        </div>
      </div> */}
      <div className="ProfileCard">
        <div className="ProfileCardIcon">
          <i class="fa-solid fa-circle-info"></i>
        </div>
        <div onClick={() => go('/AboutUs')} className="column">
          <div className="ProfileCardInfo"></div>
          <div className="profileCardName">About Us</div>
        </div>
        <div className="ProfileCardLast row">
          {/* <div className="S3Right">
            01 Active
          </div> */}
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
      <div style={{ borderBottom: 'none' }} className="ProfileCard">
        <div className="ProfileCardIcon">
          <i style={{ color: 'red' }} class="fa-solid fa-power-off"></i>
        </div>
        <div className="column">
          <div className="ProfileCardInfo"></div>
          <div
            onClick={() => {
              localStorage.removeItem('UserData')
              localStorage.removeItem('access')
              localStorage.removeItem('loaction')
              localStorage.removeItem('community')
              localStorage.removeItem('CartData')
              go('/home')
            }}

            style={{ color: 'red' }} className="profileCardName">Logout</div>
        </div>
        <div className="ProfileCardLast row">
          {/* <div className="S3Right">
            01 Active
          </div> */}
          {/* <i class="fa-solid fa-angle-right"></i> */}
        </div>
      </div>
      {/* <Search setBottom={setSearch} bottom={search} /> */}
      <Bottom show='Profile' />
      <ScrollTop />
    </div>
  )
}

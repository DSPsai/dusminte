import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../Apis globals/AuthAPI';
import Bottom from '../Bottom'
import Search from '../Home/Search';
import ScrollTop from '../ScrollTop';
import '../Styles/Profle.css'
export default function Profile() {
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
  const LeftRight = (data) => {
    return <div className="row">
      <span>{data.dat.name + " (" + data.dat.capacity + ") " + data.dat.quantity} </span>
      <span>{data.dat.price}</span>
    </div>
  }
  const OrderData = (dat) => {
    return <><div className="POrderContainer">
      <div className="row POrderS1">
        <div className="PorderIcon">
          <i class="fa-solid fa-briefcase"></i>
        </div>
        <div className="PorderID">Order ID {dat.data.id}</div>
        <div className="PorderStatus"><b>{dat.data.status}</b></div>
      </div>
      <div className="row POrderS2">
        <div className="lightText">Ordered</div>
        <input type="range" min="1" max="100" value="50" />
        <div className="lightText">Expected</div>
      </div>
      <div className="row POrderS2">
        <div className="span">{dat.data.Pdate}</div>
        <div className="span">{dat.data.Ddate}</div>
      </div>
      <hr />
      {dat.data.expand ?
        <div className="OPCRows">
          {dat.data.data.map(item => {
            return <LeftRight dat={item} />
          })}
          <div className="row">
            <span><b>Subtotal</b> </span>
            <span><b>{dat.data.subtotal}</b></span>
          </div>
          <div className="row">
            <span>Discount </span>
            <span><div className="greentext">-{dat.data.Discount}</div></span>
          </div>
          <div className="row">
            <span>Delivery fee </span>
            <span>{dat.data.deliveryFee}</span>
          </div>
          <div className="row">
            <span><b>Total</b> </span>
            <span><b>{dat.data.total}</b></span>
          </div>
          <div style={{ marginLeft: '-20px', marginRight: '-20px', padding: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'rgba(244, 244, 244, 1)' }} className="row">
            <span style={{ opacity: '0.8' }}> <b>Reward Points Used</b> </span>
            <span>{dat.data.Rew}</span>
          </div>
          <div style={{ marginBottom: '-10px', marginTop: '10px' }} className="row">
            <span className='greentext'> <b>Need Help?</b> </span>
            <span style={{ color: 'orange' }}>Re-Order</span>
          </div>
        </div >
        :
        <div className="row POrderItems">
          <span>{
            dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
            dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
            dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
          } <div onClick={() => {
            let temp = OrderDatas;
            console.log(dat.index)
            temp[dat.index].expand = true;
            setOdata([...temp])
          }} className="greentext">
              <u>+4 others</u>
            </div>
          </span>
          <span><b>{dat.data.payment}</b></span>
        </div>
      }
      <div className="row PorderLast">
        <div className="greentext">Need help?</div>
        <div className="redtext">Cancel Booking</div>
      </div>
    </div>
      <div className="backgroundgrey"></div>
    </>
  }
  const [showOrders, setShowOrders] = useState(false)
  useEffect(() => {
    document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    SuData({ ...JSON.parse(localStorage.getItem('UserData')) })
    try {
      if (JSON.parse(localStorage.getItem('UserData')).customer.name == null) {
        Authentication().then(e => {
          SuData({ ...e })
          setLoad(true)
        })
      } else {
        setLoad(true)
      }
    } catch (e) {
      Authentication().then(e => {
        console.log(e)
        SuData({ ...e })
        setLoad(true)
      })
    };
  }, [])
  const [uData, SuData] = useState({})
  const [load, setLoad] = useState(false)
  return (
    <div className='ProfileContainer'>
      <div className='HomeTop'>
        <span className='HomeTopLocation'><i class="fa-solid fa-location-dot"></i></span>
        <span ><b style={{ fontSize: '18px' }} className='fontcolor'>Brigade Xanadu</b>&ensp;<i style={{ fontSize: '14px' }} onClick={() => history('/ProfileEdit')} class="fontcolor fa-solid fa-chevron-down"></i></span>
        <span style={{ textAlign: 'end' }}><i onClick={() => { history('/Profile'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
      </div>
      <div style={{ marginTop: '60px' }} className="profileNameCard">
        <div className="profileName"><b>{load && uData.customer.name}</b></div>
        <div className="profileMail"> {load && uData.customer.contact} <i style={{ fontSize: '5px', margin: '0 5px' }} class="fa-solid fa-circle"></i> {load && uData.customer.email}</div>
      </div>
      <div style={{ fontWeight: '500', fontSize: '16.5px' }} onClick={() => go('/ProfileEdit')} className="S3Right">
        Edit
      </div>
      <div style={{ paddingTop: '0px' }} className="profileNameCard">
        <div style={{ fontSize: '14px', marginTop: '-10px' }} className="profileName"><b>Address</b></div>
        <div className="profileMail">
          {load && uData.customer.name + ", " + uData.customer.contact}<br />
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
          return <OrderData index={index} data={item} />
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
          <div style={{ color: 'red' }} className="profileCardName">Logout</div>
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

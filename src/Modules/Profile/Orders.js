import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Order.css'
import { setCartData as setCart } from '../../Apis globals/cartAPI'
export default function Orders(props) {
    const OrderCart = () => {
        return <div className="">
        </div>
    }
    const [OrderData, setOdata] = useState([
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
            <span className='left'>{data.dat.name + " (" + data.dat.capacity + ") " + data.dat.quantity} </span>
            <span>{data.dat.price}</span>
        </div>
    }
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
                        let temp = OrderData;
                        console.log(dat.index)
                        temp[dat.index].expand = true;
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
    const go = useNavigate()
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
    const CardCdata = (dat) => {
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
                {/* <input type="range" min="1" max="100" value="50" /> */}
                <div className="lightText">Expected</div>
            </div>
            <div className="row POrderS2">
                <div className="span">{dat.data.Pdate}</div>
                <div className="span">{dat.data.Ddate}</div>
            </div>
            <hr />
            <div className="row POrderItems">
                <span>{
                    dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
                    dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
                    dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
                } <div className="greentext">
                        <u>+4 others</u>
                    </div>
                </span>
                <span><b>{dat.data.payment}</b></span>
            </div>
            <div className="row PorderLast">
                <div className="greentext">Need help?</div>
                <div className="redtext">Cancel Booking</div>
            </div>
        </div>
            <div className="backgroundgrey"></div>
        </>
    }
    const getOrders = async () => {
        document.getElementById('loadme').style.display = 'flex'
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
        })
    }
    useEffect(() => {
        getOrders()
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    }, [])
    return (
        <div className='OrdersContainer'>
            <div className="ProfileInfoContainerTop">
                <div className="row">
                    <span onClick={() => go(-1)} style={{ margin: '20px' }} className='BackButton'><i class="fa-solid fa-left-long"></i></span>
                    <span style={{ marginTop: '20px', marginBottom: '20px' }}>Orders</span>
                </div>
            </div>
            <div>
                {OrderData.map((item, index) => {
                    return <OrderTemplate index={index} data={item} />
                })}
            </div>
        </div>
    )
}

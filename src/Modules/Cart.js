import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCartData, getCartDataX, getCartItems } from '../Apis globals/cartAPI'
import { getRecommend } from '../Apis globals/CartRecommend'
import CartCard from './CommonComponents/CartCard'
import ProductLongCard from './CommonComponents/ProductLongCard'
import './Styles/Cart.css'
import { setCartData as setCart } from '../Apis globals/cartAPI'
import { toast } from 'react-toastify'
import { setCouponApi } from '../Apis globals/store'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
export default function Cart(prop) {
    useEffect(() => {
        // document.getElementsByClassName('CartPopUthop')[0].getElementsByClassName('CartPopUpright')[0].innerHTML = 'Select Payment &emsp;<i class="fa-solid fa-credit-card"></i>'
        // document.getElementsByClassName('CartPopUthop')[0].style.bottom = 0
    }, [])
    const userData = JSON.parse(localStorage.getItem('UserData'))
    const razorPay = async (orderId) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('Payment not available, Please try after sometime ')
            return
        }
        const options = {
            key: 'rzp_test_voMJUqe57ZpZjL',
            amount: prices.toPay * 100,
            currency: 'INR',
            name: Udata.name && Udata.name,
            description: `Order Id - ${orderId}`,
            image: 'http://localhost:3000/static/images/user-profile.png',
            // order_id: orderId,
            handler: async function (response) {
                // var postdat = {
                //     razorpay_payment_id: response.razorpay_payment_id,
                //     razorpay_order_id: response.razorpay_order_id,
                //     razorpay_signature: response.razorpay_signature
                // }
                document.getElementById('loadme').style.display = 'flex'
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL1}`,
                    data: {
                        "operation": "orderMakePayment",
                        "params": {
                            orderId: orderId,
                            paymentType: 'online',
                            onlinePaymentId: response.razorpay_payment_id
                        }
                    },
                    headers: {
                        'Authentication': `Bearer ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    },
                }).then(response => {
                    // razorPay(response.data.data.id)
                    if (response.data.data == null)
                        toast.error('Order Not Placed', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    else {
                        console.log(response)
                        let temp = []
                        for (let i of items) {
                            temp.push({ name: i.name, unit: i.quantity, quantity: i.incart })
                        }
                        localStorage.setItem('OrderData', JSON.stringify(temp))
                        document.getElementById('loadme').style.display = 'none'
                        go('/OrderPlaced')
                    }
                }).catch(err => {
                    document.getElementById('loadme').style.display = 'none'
                    console.log(err)
                })
                console.log(response)
                // axios.post(`${process.env.REACT_APP_API_URL1}/main/pay/success`, postdat, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `JWT ${localStorage.getItem('access')}`,
                //         'Accept': 'application/json',
                //     }
                // }).then(response => {
                //     console.log(response)
                //     alert('order received')
                //     window.location.href = '/mycart'
                // }).catch(error => {
                //     console.log(error)
                // })
            },
            theme: {
                color: "#3399cc"
            },
            "prefill": {
                "name": Udata.name && Udata.name,
                "email": Udata.email && Udata.email,
                "contact": Udata.mobile && Udata.mobile
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }
    let go = useNavigate()
    const [items, setItems] = useState([
        { img: 'Images/corn.png', price: 25, name: '24 Mantra - Organic Mustard Big', quantity: '100 G', number: 2 },
        { img: 'Images/corn.png', price: 25, name: '24 Mantra - Organic Mustard Big', quantity: '100 G', number: 2 },
    ])
    const [productCardData, setCartData] = useState([
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
    ])
    useEffect(() => {
        // localStorage.removeItem('coupon')
        localStorage.removeItem("community")
        localStorage.removeItem("location")
        localStorage.removeItem('tower')
        localStorage.removeItem('flat')
        let masterCart = getCartData()
        getED().then(era => {
            getOos().then(oos => {
                getRecommend().then(e => {
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
                    setCartData([...temp])
                })
                getCartItems().then(e => {
                    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                    const d = new Date();
                    let day = weekday[d.getDay()];
                    let temp = []
                    let calc = {}
                    let quantities = []
                    let oos = {}
                    let isAnyOos = false
                    getCartDataX().then(cdDat => {

                        let tempOos = []
                        // for (let i of Object.keys(cdDat)) {
                        //     let xyz = e.filter(asd => asd._id == i)
                        //     if (xyz.length < 0) {
                        //         tempOos.push(i)
                        //     }
                        //     console.log(tempOos, xyz)
                        // }
                        for (let i of e) {
                            calc[i._id] = {
                                "product": { ...i },
                                "count": masterCart[i._id].quantity > Math.floor(i.quantity) ? Math.floor(i.quantity) : masterCart[i._id].quantity,
                                "purchasedQuantity": masterCart[i._id].quantity > Math.floor(i.quantity) ? Math.floor(i.quantity) : masterCart[i._id].quantity,
                                "frequency": 'daily',
                                "frequencyDays": [day]
                            }
                            if (masterCart[i._id].quantity > i.quantity)
                                quantities.push({ id: i._id, quantity: masterCart[i._id].quantity > Math.floor(i.quantity) ? Math.floor(i.quantity) : masterCart[i._id].quantity })
                            temp.push({
                                isInCart: masterCart[i._id] != undefined ? true : false,
                                img: i.image,
                                brand: i.brand,
                                incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity > Math.floor(i.quantity) ? Math.floor(i.quantity) : masterCart[i._id].quantity : 0,
                                name: i.name,
                                quantity: i.unit,
                                stock: i.quantity,
                                price: i.price,
                                off: i.priceDiscount,
                                cprice: i.priceDiscounted,
                                id: i._id
                            })
                            oos[i._id] = i._id
                        }
                        if (quantities.length > 0) {
                            let car = masterCart
                            for (let i of quantities) {
                                car[i.id].quantity = i.quantity
                            }
                            let total = 0
                            for (let i in car) {
                                try {
                                    if (car[i].cprice != undefined || car[i].cprice != null)
                                        total = (car[i].cprice * car[i].quantity) + total
                                    console.log(i)
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                            car.totalPrice = total
                            localStorage.setItem('CartData', JSON.stringify(car))
                            toast.error(`Cart Item Quantity changed based on stock`, {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                        let bol = false
                        let car = masterCart;
                        console.log(oos)
                        for (let i in masterCart)
                            if (masterCart[i].name != undefined && oos[i] == undefined) {
                                // delete car[i]
                                bol = true
                                console.log(oos[i], i)
                                tempOos.push(cdDat[i])
                            }
                        console.log("final oos", tempOos)
                        if (bol) {
                            // let total = 0
                            // let count = 0
                            // for (let i in car) {
                            //     try {
                            //         if (car[i].cprice != undefined || car[i].cprice != null) {
                            //             total = (car[i].cprice * car[i].quantity) + total
                            //             count += 1
                            //         }
                            //         console.log(i)
                            //     } catch (e) {
                            //         console.log(e)
                            //     }
                            // }
                            toast.error(`Cart Items removed based on stock`, {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            // car.totalPrice = total
                            // car.totalItems = count
                            // localStorage.setItem('CartData', JSON.stringify(car))
                        }
                        console.log(e)
                        console.log(isAnyOos)
                        setItems(temp)
                        setOos([...tempOos])
                        orderCalculation(calc, era)
                    })
                })
            })

        })

    }, [])
    const getOos = async () => {
        let ids = []
        for (let i in masterCart) {
            if (i.name != undefined) {
                ids.push(parseInt(i.name))
            }
        }
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "productOutOfStock",
                "params": {
                    "storeId": JSON.parse(localStorage.getItem('UserData')).communityId._id,
                    "productIds": ids
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            // setOosID([...response.data.data.out_of_stock_products])
            return response.data.data.out_of_stock_products
        }).catch(err => {
        })
    }
    const [OosID, setOosID] = useState([])
    const orderConfirm = async () => {
        if (Udata.addressFlat == "" || Udata.addressWing == "")
            toast.error(`Complete Your Profile Details in app`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        else {
            let tot = 0
            for (let i in masterCart) {
                if (i.quantity != undefined)
                    tot += i.quantity
            }
            console.log(tot)
            console.log(pD.params)
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "orderCheckout",
                    "params": { "cart": pD.params }
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                razorPay(response.data.data._id)
            }).catch(err => {
            })
        }
    }
    let masterCart = getCartData()
    const [pD, setPd] = useState({})
    const orderCalculation = async (dat, dates) => {
        console.log(dates, date)
        var tot = 0
        let pr = 0
        for (let i in dat) {
            if (masterCart[i].quantity != undefined) {
                tot += masterCart[i].quantity
                pr += (masterCart[i].quantity * masterCart[i].cprice)
            }
        }
        // for (let i in masterCart) {

        // }
        console.log(date)
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data:
            {
                "operation": "orderCalculation",
                "params": {
                    "cart": {
                        "orderType": "oneTime",
                        "items": dat,
                        "outOfStock": {},
                        "countTotal": tot,
                        "amountTotal": pr,
                        "amountTotalWeekly": 0,
                        "deliveries": 0,
                        "deliveryDates": [
                            dates || date
                        ],
                        "deliveryCharges": 0,
                        "couponDiscount": 0,
                        "couponName": coupon
                    }

                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log(response.data.data)
            // let pr = 0
            // for (let i in dat) {
            //     pr += dat[i].product.priceDiscounted
            // }
            setPrices({
                itemTotal: pr,
                toPay: response.data.data.amountTotal,
                discount: pr - response.data.data.amountTotal,
                delivery_fee: response.data.data.deliveryCharges
            })
            // prop.setPrice(100)
            console.log(getCartData())
            prop.setItems(dat.length)
            // prop.setPrice(masterCart.totalPrice)
            // prop.setPrice(pr)
            // setCart({ ...masterCart, totalPrice: response.data.data.amountTotal })
            console.log('setted')
            setPd({
                "params": response.data.data
            })
            setCouponApi({
                "operation": "orderCalculation",
                "params": {
                    "cart": {
                        "orderType": "oneTime",
                        "items": dat,
                        "outOfStock": {},
                        "countTotal": tot,
                        "amountTotal": pr,
                        "amountTotalWeekly": 0,
                        "deliveries": 0,
                        "deliveryDates": [
                            dates || date
                        ],
                        "deliveryCharges": 0,
                        "couponDiscount": 0,
                        "couponName": coupon
                    }

                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    const [prices, setPrices] = useState({
        itemTotal: masterCart.totalPrice,
        discount: 0,
        delivery_fee: 0,
        toPay: masterCart.totalPrice,
    })
    const [coupon, setCoupon] = useState(localStorage.getItem('coupon') == undefined ? null : localStorage.getItem('coupon'))
    const getED = async () => {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "getOrderExpectedDelivery",
                "params": {
                    "orderTime": new Date(),
                    "storeType": 1
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(async response => {
            // razorPay(response.data.data.id)
            try {
                let d = new Date(response.data.data)
                console.log(d)
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                d = d.getDate() + " " + days[d.getDay()] + " " + new Date(new Date(response.data.data).getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
                setDate(d)
                return d
            } catch (e) { console.log(e) }
        }).catch(err => {
            console.log(err)
        })
    }
    const [date, setDate] = useState("")
    const Udata = JSON.parse(localStorage.getItem('UserData'))
    const updateData = () => {
        document.getElementById('loadme').style.display = 'flex'

        getED().then(era => {
            getCartItems().then(e => {
                const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                const d = new Date();
                let day = weekday[d.getDay()];
                let temp = []
                let calc = {}
                for (let i of e) {
                    calc[i._id] = {
                        "product": { ...i },
                        "count": masterCart[i._id].quantity,
                        "purchasedQuantity": masterCart[i._id].quantity,
                        "frequency": 'daily',
                        "frequencyDays": [day]
                    }
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
                console.log(e)
                setItems(temp)
                orderCalculation(calc)
                document.getElementById('loadme').style.display = 'none'
            })
        })
    }
    const [bol, setBol] = useState(false)
    useEffect(() => {
        updateData()
        if (items.length == 0)
            go(-1)
    }, [bol, coupon])
    const [ooS, setOos] = useState([])
    return (
        <div className='cartPage'>
            <div className='CommonTop'>
                <svg onClick={() => { go(-1) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
                </svg>
                <div className="commonHeading">Cart</div>
                {/* <span><i
                    onClick={() => {
                        setCart([])
                        setItems([])
                        setBol(!bol)
                        go(-1)
                        localStorage.removeItem('CartData')
                    }}
                    class="fa-solid fa-trash"></i></span> */}
            </div>
            <div className="CartPage">
                <div className="leftright">
                    <b>Shipment 1 of 1</b>
                    <div className="greentext">
                        Delivery by {date}
                    </div>
                </div>
            </div>
            {items.map((item, index) => {
                return <CartCard bol={bol} setBol={setBol} setItems={prop.setItems} setPrice={prop.setPrice} index={index} Odata={items} setData={setItems} data={item} />
            })}
            {
                ooS.length > 0 ? <>
                    <div
                        style={{
                            fontSize: '20px',
                            padding: '10px',
                            textAlign: 'initial',
                            fontWeight: '600',
                            opacity: '0.8',
                            paddingTop: '20px'
                        }}
                        className="">Out of Stock</div>
                    {ooS.map((item, index) => {
                        return <CartCard isDisabled={true} bol={bol} setItems={prop.setItems} setPrice={prop.setPrice} setBol={setBol} index={index} Odata={ooS} setData={setOos} data={item} />
                    })}
                </> : <></>
            }

            <div className="applycoupon row">
                <div onClick={() => { go('/Coupon') }} style={{ display: 'flex', whiteSpace: coupon == null ? 'nowrap' : 'unset' }} className="">
                    <i style={{ display: 'flex', fontSize: '20px', marginRight: '10px', justifyContent: 'center', alignItems: 'center' }} class="fa-solid fa-tag"></i>
                    <b style={{ whiteSpace: coupon == null ? 'nowrap' : 'unset' }}>
                        {coupon == null ? "Apply Coupon" :
                            <span>
                                <div style={{ textAlign: 'initial' }} className="column">
                                    <span className='greentext'>{coupon}</span>
                                    <small style={{ fontSize: '12px', fontWeight: 'normal' }}>Applied</small>
                                </div>
                                {/* {coupon}&emsp;
                                <small>Applied</small> */}
                            </span>}
                    </b>
                </div>
                {coupon == null ? <i style={{
                    width: '100%',
                    textAlign: 'end'
                }} onClick={() => { go('/Coupon') }} class="fa-solid fa-angle-right"></i> : <i
                    onClick={() => {
                        setCoupon(null)
                        localStorage.removeItem('coupon')
                    }}
                    style={{ fontSize: '20px', color: '#b8b8b8', display: 'flex', justifyContent: 'center', alignItems: 'center' }} class="fa-solid fa-circle-xmark"></i>}
            </div>
            <div className="CartAddress">
                <div style={{ paddingLeft: '0px' }} className="leftright">
                    <b>Address</b>
                    {/* <div onClick={() => go('/ProfileEdit')} className="greentext">Change</div> */}
                </div>
                <div className="lightText">
                    {Udata.name && Udata.name}, {Udata.mobile && Udata.mobile}<br />
                    {Udata.communityId.name && Udata.communityId.name}, {Udata.communityId.address && Udata.communityId.address}
                </div>
            </div>
            <div className="itemTotal">
                <div className="leftright">
                    <div className="lightText">
                        ItemTotal
                    </div>
                    <div className="lightText">
                        <i class="fa-solid fa-indian-rupee-sign"></i> {prices.itemTotal}
                    </div>
                </div>
                <div className="leftright">
                    <div className="lightText">
                        Discount
                    </div>
                    <div className="lightText">
                        <div className="greentext">-<i class="fa-solid fa-indian-rupee-sign"></i> {prices.discount}</div>
                    </div>
                </div>
                <div className="leftright">
                    <div className="lightText">
                        Delivery Fee
                    </div>
                    <div className="lightText">
                        <i class="fa-solid fa-indian-rupee-sign"></i> {prices.delivery_fee}
                    </div>
                </div>
                <div className="leftright">
                    <div className="">
                        <b>To Pay</b>
                    </div>
                    <div className="">
                        <b><i class="fa-solid fa-indian-rupee-sign"></i> {prices.toPay}</b>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '10px' }} className="commonHeading">
                Recommended for you
            </div>
            <div className="CartRproduct">
                {productCardData.map((item, index) => {
                    return <ProductLongCard bol={bol} setBol={setBol} Cdata={items} setCitems={setItems} setItems={prop.setItems} setPrice={prop.setPrice} Odata={productCardData} setData={setCartData} index={index} data={item} />
                })}
            </div>
            <div onClick={() => orderConfirm()} style={{ zIndex: 20, bottom: 0 }} className="CartPopUthop"><div className='CartPopUp'>
                <div className="CartPopUpleft">
                    <span id="cartItemNumber">{items.length}</span> Items | <i class="fa-solid fa-indian-rupee-sign"></i> <span id="cartItemPrice">{prices.toPay}</span>
                </div>
                <div className="CartPopUpright">
                    <span> Proceed</span> <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
            </div>
            {/* <button>Checkout</button> */}
        </div>
    )
}
/*
1. admin seat cover get
2. battery master db error
3. batter change in post req.

*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCartData, getCartItems } from '../Apis globals/cartAPI'
import { getRecommend } from '../Apis globals/CartRecommend'
import CartCard from './CommonComponents/CartCard'
import ProductLongCard from './CommonComponents/ProductLongCard'
import './Styles/Cart.css'
import { setCartData as setCart } from '../Apis globals/cartAPI'

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
            amount: '100000',
            currency: 'INR',
            name: "name",
            description: 'nothing but a fake money transfer',
            image: 'http://localhost:3000/static/images/user-profile.png',
            order_id: orderId,
            handler: function (response) {
                // var postdat = {
                //     razorpay_payment_id: response.razorpay_payment_id,
                //     razorpay_order_id: response.razorpay_order_id,
                //     razorpay_signature: response.razorpay_signature
                // }
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
            }
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
        let masterCart = getCartData()
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
                    off: i.priceDiscount,
                    cprice: i.priceDiscounted,
                    id: i._id
                })
            }
            setCartData([...temp])
        })
        getCartItems().then(e => {
            let temp = []
            let calc = {}
            for (let i of e) {
                calc[i._id] = {
                    "product": { ...e },
                    "count": masterCart[i._id].quantity,
                    "purchasedQuantity": masterCart[i._id].quantity,
                    "frequency": 'daily',
                    "frequencyDays": ['tuesday']
                }
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
            console.log(e)
            setItems(temp)
            orderCalculation(calc)
        })
    }, [])
    const orderConfirm = async () => {
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
    let masterCart = getCartData()
    const [pD, setPd] = useState({})
    const orderCalculation = async (dat) => {
        var tot = 0
        for (let i in masterCart) {
            if (masterCart[i].quantity != undefined) {
                tot += masterCart[i].quantity
            }
        }
        console.log(tot)
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "orderCalculation",
                "params": {
                    "cart": {
                        "orderType": "oneTime",
                        "items": dat,
                        "outOfStock": {},
                        "countTotal": tot,
                        "amountTotal": masterCart.totalPrice,
                        "amountTotalWeekly": 0,
                        "deliveries": 0,
                        "deliveryDates": [],
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
            setPrices({
                itemTotal: masterCart.totalPrice,
                toPay: response.data.data.amountTotal,
                discount: masterCart.totalPrice - response.data.data.amountTotal,
                delivery_fee: response.data.data.deliveryCharges
            })
            // prop.setPrice(100)
            console.log(getCartData())
            // setCart({ ...masterCart, totalPrice: response.data.data.amountTotal })
            console.log('setted')
            setPd({
                "params": response.data.data
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
    let coupon = localStorage.getItem('coupon') == undefined ? null : localStorage.getItem('coupon')
    return (
        <div className='cartPage'>
            <div className='CommonTop'>
                <svg onClick={() => { go(-1) }} width="30" height="30" viewBox="0 0 191 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M179.062 75.4981C179.062 74.2467 178.434 73.0464 177.314 72.1615C176.195 71.2766 174.677 70.7794 173.094 70.7794H32.3147L69.8821 41.089C70.437 40.6503 70.8772 40.1294 71.1775 39.5562C71.4779 38.983 71.6325 38.3686 71.6325 37.7481C71.6325 37.1277 71.4779 36.5133 71.1775 35.9401C70.8772 35.3669 70.437 34.846 69.8821 34.4073C69.3271 33.9685 68.6683 33.6205 67.9432 33.3831C67.2181 33.1456 66.441 33.0234 65.6562 33.0234C64.8714 33.0234 64.0942 33.1456 63.3691 33.3831C62.6441 33.6205 61.9852 33.9685 61.4303 34.4073L13.6803 72.1573C13.1245 72.5956 12.6834 73.1163 12.3825 73.6896C12.0816 74.2629 11.9268 74.8775 11.9268 75.4981C11.9268 76.1188 12.0816 76.7334 12.3825 77.3067C12.6834 77.88 13.1245 78.4007 13.6803 78.839L61.4303 116.589C61.9852 117.028 62.6441 117.376 63.3691 117.613C64.0942 117.851 64.8714 117.973 65.6562 117.973C66.441 117.973 67.2181 117.851 67.9432 117.613C68.6683 117.376 69.3271 117.028 69.8821 116.589C70.437 116.15 70.8772 115.629 71.1775 115.056C71.4779 114.483 71.6325 113.869 71.6325 113.248C71.6325 112.628 71.4779 112.013 71.1775 111.44C70.8772 110.867 70.437 110.346 69.8821 109.907L32.3147 80.2169H173.094C174.677 80.2169 176.195 79.7197 177.314 78.8348C178.434 77.9499 179.062 76.7496 179.062 75.4981Z" fill="black" fill-opacity="0.8" />
                </svg>
                <div className="commonHeading">Cart</div>
                <span><i class="fa-solid fa-trash"></i></span>
            </div>
            <div className="CartPage">
                <div className="leftright">
                    <b>Shipment 1 of 1</b>
                    <div className="greentext">
                        Delivery by 10 Apr, 02:13 pm
                    </div>
                </div>
            </div>
            {items.map((item, index) => {
                return <CartCard setItems={prop.setItems} setPrice={prop.setPrice} index={index} Odata={items} setData={setItems} data={item} />
            })}
            <div className="applycoupon row">
                <div onClick={() => { go('/Coupon') }} style={{ whiteSpace: 'nowrap' }} className="">
                    <i class="fa-solid fa-tag"></i>
                    <b style={{ whiteSpace: 'nowrap' }}>{coupon == null ? "Apply Coupon" : <span className='greentext'>{coupon}&emsp;<small>Applied</small></span>}</b>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div className="CartAddress">
                <div style={{ paddingLeft: '0px' }} className="leftright">
                    <b>Address</b>
                    <div className="greentext">Change</div>
                </div>
                <div className="lightText">
                    jay, 8140599075<br />
                    C 1013,C1,ASSETZ 63 DEGREE EAST
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
                    return <ProductLongCard Cdata={items} setCitems={setItems} setItems={prop.setItems} setPrice={prop.setPrice} Odata={productCardData} setData={setCartData} index={index} data={item} />
                })}
            </div>
            <div onClick={() => orderConfirm()} style={{ zIndex: 20, bottom: 0 }} className="CartPopUthop"><div className='CartPopUp'>
                <div className="CartPopUpleft">
                    <span id="cartItemNumber">{masterCart.totalItems}</span> Items | <i class="fa-solid fa-indian-rupee-sign"></i> <span id="cartItemPrice">{prices.toPay}</span>
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

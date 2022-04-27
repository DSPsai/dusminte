import React, { useState } from 'react'

import { PhotoProvider, PhotoView } from 'react-photo-view';
import { toast } from 'react-toastify';
import { getCartData, setCartData } from '../../Apis globals/cartAPI';
export default function ProductLongCard(props) {
    const addToCart = () => {
        let temp = props.Odata;
        temp[props.index].isInCart = true;
        temp[props.index].incart = 1
        let e = getCartData()
        let another = props.data.id.toString()
        // let temper = {}
        // temper = 
        e[another] = { name: props.data.id.toString(), cprice: props.data.cprice, quantity: 1 }
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
        props.setData([...temp])
        if (props.setBol) props.setBol(!props.bol)
        if (props.setCitems) props.setCitems([...props.Cdata, props.data])
        console.log({ ...e }.length)
        // document.getElementById('cartItemNumber').innerText = e.length
        // document.getElementsByClassName("CartPopUthop")[0].style.opacity = 1
        // document.getElementsByClassName("CartPopUthop")[0].style.zIndex = 10
    }
    const change = (sum) => {
        let temp = props.Odata;
        let cart = getCartData()
        console.log(props.data.stock)
        if (!sum && temp[props.index].incart == 1) {
            temp[props.index].incart = 0;
            temp[props.index].isInCart = false
            cart.totalItems = cart.totalItems - 1
            delete cart[props.data.id.toString()];
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
                if ((temp[props.index].incart + 1) > props.data.stock) {
                    if (document.getElementsByClassName('Toastify')[0].getElementsByClassName('Toastify__toast').length <= 0)
                        toast.error(`Stock available only ${props.data.stock}`, {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                } else {
                    temp[props.index].incart = temp[props.index].incart + 1;
                    cart["" + props.data.id].quantity += 1
                }
            } else {
                temp[props.index].incart = temp[props.index].incart - 1
                cart["" + props.data.id].quantity -= 1
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
        props.setData([...temp])
        if (props.setCitems) {
            props.setCitems([...props.Cdata, props.data])
        }
        if (props.setBol) props.setBol(!props.bol)
    }
    let masterCart = getCartData()
    const [dis, setDis] = useState((props.data.incart + 1) > props.data.stock)
    return (
        <div className='CommonPC'>
            {/* <img src={props.data.img} alt="" /> */}
            <PhotoProvider>
                <PhotoView src={props.data.img} >
                    <img src={props.data.img} alt="" />
                </PhotoView>
            </PhotoProvider>
            <div className="CPCR">
                <div style={{ opacity: props.data.off ? 1 : 0 }} className="PCoff"><i style={{ fontSize: '10px' }} class="fa-solid fa-indian-rupee-sign"></i> {props.data.off} OFF</div>
                <div className="lightText crtText">{props.data.brand}</div>
                <div className="CPCRName">{props.data.name}</div>
                <div className="lightText crtText">{props.data.quantity}</div>
                <div className="pricerow row">
                    <div style={{ color: '#DB6027', fontWeight: '500' }} className="redtext">
                        <i class="fa-solid fa-indian-rupee-sign"></i> {props.data.cprice}
                        &ensp;<s style={{ color: 'rgba(50, 59, 76,0.5)', fontSize: '12px' }}>{props.data.cprice == props.data.price ? "" : props.data.price}</s>
                    </div>
                    {masterCart[props.data.id] != undefined && props.data.isInCart ? <>
                        <div className="PCBrow ProductAdd">
                            <i onClick={() => {
                                console.log(props.data.incart, props.data.stock)
                                if ((props.data.incart + 1) > props.data.stock) {
                                    setDis(true)
                                }
                                else
                                    setDis(false)
                                change(false)
                            }} class="fa-solid fa-minus"></i>
                            <span>{props.data.incart}</span>
                            <i style={{ borderRadius: '0 10px 10px 0', backgroundColor: (props.data.incart + 1) > props.data.stock ? '#bbd7cf' : '' }} onClick={() => {
                                console.log(props.data.incart, props.data.stock)
                                if ((props.data.incart + 1) <= props.data.stock) {
                                    change(true)
                                    setDis(false)

                                } else {
                                    setDis(true)
                                    toast.error(`Stock available only ${props.data.stock}`, {
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
                    </> : <button onClick={() => addToCart()} className='ProductAdd'>Add</button>}
                </div>
            </div>
        </div>
    )
}

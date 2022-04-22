import React from 'react'
import { getCartData, setCartData } from '../../Apis globals/cartAPI';

export default function CartCard(props) {
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
        console.log({ ...e }.length)
        // document.getElementById('cartItemNumber').innerText = e.length
        // document.getElementsByClassName("CartPopUthop")[0].style.opacity = 1
        // document.getElementsByClassName("CartPopUthop")[0].style.zIndex = 10
    }
    const change = (sum) => {
        let temp = props.Odata;
        let cart = getCartData()
        if (!sum && temp[props.index].incart == 1) {
            pop()
        } else {
            if (sum) {
                temp[props.index].incart = temp[props.index].incart + 1;
                cart["" + props.data.id].quantity += 1
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
            props.setData([...temp])
            // temp[props.index].incart = sum ? temp[props.index].incart + 1 : temp[props.index].incart - 1
        }
    }
    let masterCart = getCartData()
    function pop() {
        let temp = props.Odata;
        let cart = getCartData()
        // temp[props.index].incart = 0;
        // temp[props.index].isInCart = false
        cart.totalItems = cart.totalItems - 1
        delete cart[props.data.id.toString()]
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
        let filter = temp.filter(item => props.data.id != item.id)
        console.log(filter)
        props.setData([...filter])
    }
    return (
        <div className='CPTitem column'>
            <div className="">
                <div className="row CPTitemTop">
                    <img src={props.data.img} alt="" />
                    <div className="column">
                        <i onClick={() => { pop() }} class="end fa-solid fa-xmark"></i>
                        <b>{props.data.name}</b>
                        <div className="lightText">{props.data.quantity}</div>
                    </div>
                </div>
            </div>
            <div className="row leftright">
                <div className="redtext"><i class="fa-solid fa-indian-rupee-sign"></i> {props.data.cprice}
                    &ensp;<s style={{ color: 'rgba(50, 59, 76,0.5)', fontSize: '12px' }}>{props.data.cprice == props.data.price ? "" : props.data.price}</s>
                </div>

                <div className="PCBrow ProductAdd">
                    <i onClick={() => change(false)} class="fa-solid fa-minus"></i>
                    <span>{props.data.incart}</span>
                    <i onClick={() => change(true)} class="fa-solid fa-plus"></i>
                </div>
            </div>

        </div>
    )
}

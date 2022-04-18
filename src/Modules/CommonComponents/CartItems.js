import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCartData } from '../../Apis globals/cartAPI'

export default function CartItems(props) {
    const go = useNavigate()
    let loca = window.location.href
    let loc = loca.split('/').pop()
    let cart = getCartData()
    let [items, setItems] = useState(cart.totalItems);
    let [price, setPrice] = useState(cart.totalPrice);
    // .then(cart => {

    // setItems(cart.totalItems);
    // setPrice(cart.totalPrice);
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60
        let cart = getCartData()
        // .then(cart => {
        setItems(cart.totalItems);
        setPrice(cart.totalPrice);
        // })
    }, [])
    // useLayoutEffect(() => {
    //     console.log('hiiiiiiiiiiiiiiiiiiiiiii')
    //     setItems(cart.totalItems);
    //     setPrice(cart.totalPrice);

    // }, [])

    return (
        <><div style={{ zIndex: props.items > 0 ? 10 : -1, opacity: props.items > 0 ? 1 : 0, bottom: loc == 'MyCart' || loc == 'Products' || loc == 'Recommendations' || loca.search(/SingleProducts/) >= 0 || loc == 'SingleProducts' ? 0 : 65 }} onClick={() => go('/MyCart')} className="CartPopUthop"><div className='CartPopUp'>
            <div className="CartPopUpleft">
                <span id="cartItemNumber">{props.items}</span> Items | <i class="fa-solid fa-indian-rupee-sign"></i> <span id="cartItemPrice">{props.price}</span>
            </div>
            <div className="CartPopUpright">
                <span> Select Payment</span> <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
        </div>
        </>
    )
}

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
    useEffect(() => {
        try {
            let last = document.getElementsByClassName('HomeSection3container')
            if (props.items > 0) {
                last[last.length - 1].style.paddingBottom = '100px'
            } else {
                last[last.length - 1].style.paddingBottom = '50px'
            }
        } catch (er) { console.log(er) }
        // try {
        //     let last = document.getElementsByClassName('EssentialsCardContianer')
        //     if (props.items > 0) {
        //         last[last.length - 1].style.paddingBottom = '170px'
        //     } else {
        //         last[last.length - 1].style.paddingBottom = '130px'
        //     }
        // } catch (er) { console.log(er) }
    }, [props.items])
    return (
        <><div style={{ zIndex: props.items > 0 ? 10 : -1, opacity: props.items > 0 ? 1 : 0, bottom: loc == 'MyCart' || loca.search(/Product/) >= 0 || loc == 'Recommendations' ? 0 : 65 }} onClick={() => go('/MyCart')} className="CartPopUthop"><div className='CartPopUp'>
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

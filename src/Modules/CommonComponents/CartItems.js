import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CartItems(props) {
    const go = useNavigate()
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60
    }, [])
    let loc = window.location.href.split('/').pop()
    return (
        <>{props.items > 0 ? <div style={{ bottom: loc == 'MyCart' || loc == 'Products' || loc == 'Recommendations' || loc == 'Popular%20in%20your%20society' || loc == 'SingleProducts' ? 0 : 65 }} onClick={() => go('/MyCart')} className="CartPopUthop"><div className='CartPopUp'>
            <div className="CartPopUpleft">
                {props.items} Items | <i class="fa-solid fa-indian-rupee-sign"></i> {props.price}
            </div>
            <div className="CartPopUpright">
                <span> Select Payment</span> <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
        </div> : <></>}
        </>
    )
}

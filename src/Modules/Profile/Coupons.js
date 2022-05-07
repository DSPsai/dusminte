import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCoupons } from '../../Apis globals/cartAPI'
import { couponDataAPI } from '../../Apis globals/store'
export default function Coupons() {
    const go = useNavigate()
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
        getCoupons().then(dat => {
            setData([...dat])
        })
    }, [])
    const [data, setData] = useState([])
    const CouponCard = (dat) => {
        return <div style={{ opacity: dat.dat.isActive ? 1 : 0.5 }} className="CouponCard">
            <div className="leftright">
                <div className="PCoff">{dat.dat.couponName}</div>
                <div onClick={() => {
                    if (dat.dat.isActive) {
                        localStorage.setItem('coupon', dat.dat.couponName)
                        go(-1)
                    } else {
                        if (document.getElementsByClassName('Toastify')[0].getElementsByClassName('Toastify__toast').length <= 0)
                            toast.error(`Minimum Cart Value is ${dat.dat.minimumValue}`, {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                    }
                }} className="greentext">Apply</div>
            </div>
            <div className="CouponCardDesc">{dat.dat.description}</div>
            <div className="CouponCardNote">{dat.dat.notes}</div>
        </div>
    }
    const applyCoupon = async () => {
        let coupon = document.getElementById('couponText').value
        if (coupon.length == 0)
            toast.error("Enter a coupon", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        else
            couponDataAPI(coupon)
    }
    return (
        <div className='CouponPage'>
            <div className="ProfileInfoContainerTop">
                <div className="row">
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }} className='BackButton'>
                        <svg onClick={() => { go(-1) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
                        </svg>
                    </span>
                    <span style={{ color: '#323B4C', fontSize: '18px', marginTop: '20px', marginBottom: '20px' }}>Apply Coupon</span>
                </div>
            </div>
            <div className="CouponBody">
                <div className="CouponSearchBar">
                    <input id='couponText' placeholder='Enter Coupon Code' className='CouponSearch' /> <button onClick={() => applyCoupon()} className='CouponBut'>Apply</button>
                </div>
                <div className="CouponContent">
                    {data.map(coupon => {
                        return <CouponCard dat={coupon} />
                    })}
                </div>
            </div>
        </div>
    )
}

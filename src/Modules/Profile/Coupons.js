import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCoupons } from '../../Apis globals/cartAPI'
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
                        toast.error(`Minimum Cart Value is ${dat.dat.minimumValue}`, {
                            position: "top-center",
                            autoClose: 2000,
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

    return (
        <div className='CouponPage'>
            <div className="ProfileInfoContainerTop">
                <div className="row">
                    <span onClick={() => go(-1)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }} className='BackButton'>
                        <svg width="30" height="30" viewBox="0 0 191 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M179.062 75.4981C179.062 74.2467 178.434 73.0464 177.314 72.1615C176.195 71.2766 174.677 70.7794 173.094 70.7794H32.3147L69.8821 41.089C70.437 40.6503 70.8772 40.1294 71.1775 39.5562C71.4779 38.983 71.6325 38.3686 71.6325 37.7481C71.6325 37.1277 71.4779 36.5133 71.1775 35.9401C70.8772 35.3669 70.437 34.846 69.8821 34.4073C69.3271 33.9685 68.6683 33.6205 67.9432 33.3831C67.2181 33.1456 66.441 33.0234 65.6562 33.0234C64.8714 33.0234 64.0942 33.1456 63.3691 33.3831C62.6441 33.6205 61.9852 33.9685 61.4303 34.4073L13.6803 72.1573C13.1245 72.5956 12.6834 73.1163 12.3825 73.6896C12.0816 74.2629 11.9268 74.8775 11.9268 75.4981C11.9268 76.1188 12.0816 76.7334 12.3825 77.3067C12.6834 77.88 13.1245 78.4007 13.6803 78.839L61.4303 116.589C61.9852 117.028 62.6441 117.376 63.3691 117.613C64.0942 117.851 64.8714 117.973 65.6562 117.973C66.441 117.973 67.2181 117.851 67.9432 117.613C68.6683 117.376 69.3271 117.028 69.8821 116.589C70.437 116.15 70.8772 115.629 71.1775 115.056C71.4779 114.483 71.6325 113.869 71.6325 113.248C71.6325 112.628 71.4779 112.013 71.1775 111.44C70.8772 110.867 70.437 110.346 69.8821 109.907L32.3147 80.2169H173.094C174.677 80.2169 176.195 79.7197 177.314 78.8348C178.434 77.9499 179.062 76.7496 179.062 75.4981Z" fill="black" fill-opacity="0.8" />
                        </svg>
                    </span>
                    <span style={{ color: '#323B4C', fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>Apply Coupon</span>
                </div>
            </div>
            <div className="CouponBody">
                <div className="CouponSearchBar">
                    <input placeholder='Enter Coupon Code' className='CouponSearch' /> <button className='CouponBut'>Apply</button>
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

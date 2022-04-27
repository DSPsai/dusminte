import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PlacesOrder(props) {
    let dat = JSON.parse(localStorage.getItem('OrderData'))
    const [data, setData] = useState([])
    useEffect(() => {
        let temp = []
        console.log(dat)
        for (let i of dat) {
            if (i.name != undefined) {
                temp.push(i)
            }
        }
        console.log(temp)
        setData([...temp])
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    }, [])
    const go = useNavigate()
    return (
        <div style={{ backgroundColor: 'rgba(232, 232, 232, 0.439)', minHeight: '100vh', color: '#323B4C' }} className='Placed_order'>
            <center style={{ padding: '10vh 10vw' }}>
                <div style={{ textAlign: 'end', fontSize: '34px', color: 'rgb(50 59 76 / 61%)' }} className="">
                    <i onClick={() => {
                        localStorage.removeItem('CartData')
                        props.setItems(0)
                        props.setPrice(0)
                        window.location.href = '/'
                    }} class="fa-solid fa-xmark"></i>
                </div>
                <img src="/Images/logo.png" alt="" />
                <div style={{ padding: '20px 0', fontSize: '20px', fontWeight: '600' }} className="">Order Placed Successfully</div>
                <div className="lighttext">{data.map((item, ind) => {
                    return <span>{item.name + " (" + item.unit + ") x " + item.quantity + (ind == data.length - 1 ? "" : ", ")}</span>
                })}</div>
                <br />
                <div style={{ textAlign: 'center', fontSize: '16px', marginBottom: '30px' }} className="lighttext">Please check the order status at profile page</div>
                <button onClick={() => go('/Orders')} className='ProfileEditSave ProductAdd'>Orders</button>
            </center>
        </div>
    )
}

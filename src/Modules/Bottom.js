import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Styles/Bottom.css'
export default function Bottom(props) {
    const Icon = (dat) => {
        return <>
            <div onClick={() => go(`/${dat.data.name}`)} style={{ color: dat.highlit ? 'rgba(76, 173, 144, 1)' : '' }} className="BottomIconCard">
                <i style={{ color: dat.highlit ? 'rgba(76, 173, 144, 1)' : '' }} class={dat.data.icon}></i><br />
                {dat.data.name}
            </div>
        </>
    }
    const data = [
        { icon: 'fa-solid fa-house', name: 'Home' },
        { icon: 'fa-solid fa-bag-shopping', name: 'Groceries' },
        // { icon: 'fa-solid fa-briefcase', name: 'services' },
        { icon: 'fa-solid fa-qrcode', name: 'DM 24x7' },
        { icon: 'fa-solid fa-user', name: 'Profile' },
    ]
    const go = useNavigate()
    return (
        <div className='BottomBap'>
            {data.map(item => {
                return <Icon highlit={props.show == item.name ? true : false} data={item} />
            })}
        </div>
    )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Top(props) {
    const go = useNavigate()
    return (
        <div className='CommonTop'>
            <svg onClick={() => { go(-1) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
            </svg>
            <div style={{ color: '#323B4C' }} className="commonHeading">{props.head}</div>
            <span><i onClick={() => { document.getElementById('SearchBottom').style.top = '0' }} class="fa-solid fa-magnifying-glass"></i></span>
        </div>
    )
}

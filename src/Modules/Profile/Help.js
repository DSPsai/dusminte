import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Help() {
    const go = useNavigate()
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    }, [])
    return (
        <div className='HelpPage'>
            <div className="TopHeadP row">
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }} className='BackButton'>
                    <svg onClick={() => { go(-1) }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
                    </svg>
                </span>

                <span className='commonHeading' style={{ fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>Help Center</span>
            </div>
            <div className="HelpItemCard leftright">
                <span>Have Issues with home delivery orders or services</span>
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div style={{ marginBottom: '28px' }} className="HelpItemCard leftright">
                <span>Have Issues with DM 24/7 store orders</span>
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div style={{ fontWeight: '500', fontSize: '17.5px', textAlign: 'initial', marginLeft: 10, color: 'rgba(0, 0, 0, 0.516)', marginBottom: '9px' }} className="lightText">Help with other Queries</div>
            <div onClick={() => go('/Help/Query')} className="HelpItemCard leftright">
                <span>General Queries</span>
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => go('/FAQ')} style={{ marginBottom: '20px' }} className="HelpItemCard leftright">
                <span>FAQs</span>
                <i class="fa-solid fa-angle-right"></i>
            </div>
        </div>
    )
}

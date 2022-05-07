import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bottom from './Bottom'

export default function DM24() {
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
        try {
            let da = JSON.parse(localStorage.getItem('UserData'))
            setLoc(da.communityId.name)
        } catch (er) { setLoc('') }
    }, [])
    const history = useNavigate()
    const [UserLoc, setLoc] = useState('')
    return (
        <div style={{
            // backgroundImage: 'url("/Images/DM24x7.png")',
            // backgroundSize: 'cover',
            // minHeight: '100vh'
        }}>
            <div className='HomeTop'>
                <span className='HomeTopLocation'><i class="fa-solid fa-location-dot"></i></span>
                <span ><b style={{ fontSize: '18px' }} onClick={() => history('/ProfileEdit')} className='fontcolor'>{UserLoc}</b>&ensp;
                </span>
                <span style={{ textAlign: 'end' }}><i onClick={() => { history('/DM%2024x7'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div style={{ paddingTop: '50px' }} className="">
                <h3 style={{ fontWeight: '500', color: '#323B4C' }}>Sorry, Looks like DM-24 <br /> is not active for your community <br />Coming Soon !</h3>
            </div>
            <img style={{ width: '100vw' }} src="/Images/DM24x7.png" alt="DM 24x7 IMG" />
            <Bottom show='DM 24x7' />
        </div>
    )
}

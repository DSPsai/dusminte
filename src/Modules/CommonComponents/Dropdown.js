import React, { useEffect } from 'react'

export default function Dropdown() {
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    }, [])
    return (
        <div className='dropdownpage1'>
            <b>Select your location</b>
            <div className="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input placeholder='Search for your location' />
            </div>
            <div className="dropdownitem">Banglore</div>
            <div className="dropdownitem">Chennai</div>
        </div>
    )
}

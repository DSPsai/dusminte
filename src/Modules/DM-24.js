import React, { useEffect } from 'react'

export default function DM24() {
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
    }, [])
    return (
        <div>
            <h3>Sorry, Looks like DM-24 is not active for your community <br />Coming Soon !</h3>

        </div>
    )
}

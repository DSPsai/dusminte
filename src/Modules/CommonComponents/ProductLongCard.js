import React from 'react'

export default function ProductLongCard(props) {
    const addToCart = () => {
        let temp = props.Odata;
        temp[props.index].isInCart = true;
        temp[props.index].incart = 1
        props.setData([...temp])
    }
    const change = (sum) => {
        let temp = props.Odata;
        if (!sum && temp[props.index].incart == 1) {
            temp[props.index].incart = 0;
            temp[props.index].isInCart = false
        } else {
            temp[props.index].incart = sum ? temp[props.index].incart + 1 : temp[props.index].incart - 1
        }
        props.setData([...temp])
    }
    return (
        <div className='CommonPC'>
            <img src={props.data.img} alt="" />
            <div className="CPCR">
                <div  className="lightText crtText">{props.data.brand}</div>
                <div className="">{props.data.name}</div>
                <div className="lightText crtText">{props.data.quantity}</div>
                <div className="pricerow row">
                    <div style={{ color: '#DB6027', fontWeight: '500' }} className="redtext"><i class="fa-solid fa-indian-rupee-sign"></i> {props.data.price}</div>
                    {props.data.isInCart ? <>
                        <div className="PCBrow ProductAdd">
                            <i onClick={() => change(false)} class="fa-solid fa-minus"></i>
                            <span>{props.data.incart}</span>
                            <i onClick={() => change(true)} class="fa-solid fa-plus"></i>
                        </div>
                    </> : <button onClick={() => addToCart()} className='ProductAdd'>Add</button>}
                </div>
            </div>
        </div>
    )
}

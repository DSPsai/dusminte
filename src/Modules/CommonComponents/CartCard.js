import React from 'react'

export default function CartCard(props) {
    const change = (sum) => {
        let temp = props.Odata;
        temp[props.index].number = sum ? temp[props.index].number + 1 : temp[props.index].number - 1
        props.sData([...temp])
    }
    const pop = () => {
        let temp = props.Odata;
        temp.splice(props.index, 1)
        props.sData([...temp])
    }
    return (
        <div className='CPTitem column'>
            <div className="">
                <div className="row CPTitemTop">
                    <img src={props.data.img} alt="" />
                    <div className="column">
                        <i onClick={() => { pop() }} class="end fa-solid fa-xmark"></i>
                        <b>{props.data.name}</b>
                        <div className="lightText">{props.data.quantity}</div>
                    </div>
                </div>
            </div>
            <div className="row leftright">
                <div className="redtext"><i class="fa-solid fa-indian-rupee-sign"></i> {props.data.price}</div>
                <div className="PCBrow ProductAdd">
                    <i onClick={() => change(false)} class="fa-solid fa-minus"></i>
                    <span>{props.data.number}</span>
                    <i onClick={() => change(true)} class="fa-solid fa-plus"></i>
                </div>
            </div>
            
        </div>
    )
}

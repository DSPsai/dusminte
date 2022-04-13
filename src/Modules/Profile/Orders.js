import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Order.css'
export default function Orders() {

    const OrderCart = () => {
        return <div className="">
        </div>
    }
    const [OrderData, setOdata] = useState([
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
        {
            id: '#2321321', Pdate: 'Tue 3rd Dec', status: 'Delivered', Ddate: 'Thu 5th Dec',
            data: [
                { name: 'Tamato', capacity: '1kg', quantity: '2', price: '1250' },
                { name: 'onion', capacity: '1kg', quantity: '12', price: '1250' },
                { name: 'Potato', capacity: '1kg', quantity: '1', price: '1250' },
                { name: 'Chili', capacity: '1kg', quantity: '2', price: '1250' },
            ],
            subtotal: '1250', Discount: '1250', deliveryFee: '1250',
            total: '12500', Rew: '1250', expand: false
        },
    ])
    const LeftRight = (data) => {
        return <div className="row">
            <span>{data.dat.name + " (" + data.dat.capacity + ") " + data.dat.quantity} </span>
            <span>{data.dat.price}</span>
        </div>
    }
    const OrderTemplate = (dat) => {
        return <div className="OrderCard">
            <div className="OPC1 row">
                <i class="fa-solid fa-briefcase"></i>
                <div className="OPC11 column">
                    <div className=""><b>Order ID {dat.data.id}</b></div>
                    <div className="OPDates">placed{dat.data.Pdate}</div>
                </div>
                <div className="column">
                    <div className="greentext">{dat.data.status}</div>
                    <div className="OPDates OPC12">{dat.data.Ddate}</div>
                </div>
            </div>
            <hr />
            <br />
            {dat.data.expand ?
                <div className="OPCRows">
                    {dat.data.data.map(item => {
                        return <LeftRight dat={item} />
                    })}
                    <div className="row">
                        <span><b>Subtotal</b> </span>
                        <span><b>{dat.data.subtotal}</b></span>
                    </div>
                    <div className="row">
                        <span>Discount </span>
                        <span><div className="greentext">-{dat.data.Discount}</div></span>
                    </div>
                    <div className="row">
                        <span>Delivery fee </span>
                        <span>{dat.data.deliveryFee}</span>
                    </div>
                    <div className="row">
                        <span><b>Total</b> </span>
                        <span><b>{dat.data.total}</b></span>
                    </div>
                    <div style={{ marginLeft: '-20px', marginRight: '-20px', padding: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'rgba(244, 244, 244, 1)' }} className="row">
                        <span style={{ opacity: '0.8' }}> <b>Reward Points Used</b> </span>
                        <span>{dat.data.Rew}</span>
                    </div>
                    <div style={{ marginBottom: '-10px', marginTop: '10px' }} className="row">
                        <span className='greentext'> <b>Need Help?</b> </span>
                        <span style={{ color: 'orange' }}>Re-Order</span>
                    </div>
                </div >
                :
                <div className="row POrderItems">
                    <span>{
                        dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
                        dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
                        dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
                    } <div onClick={() => {
                        let temp = OrderData;
                        console.log(dat.index)
                        temp[dat.index].expand = true;
                        setOdata([...temp])
                    }} className="greentext">
                            <u>+4 others</u>
                        </div>
                    </span>
                    <span><b>{dat.data.payment}</b></span>
                </div>
            }


        </div >
    }
    const go = useNavigate()
    const CardCdata = (dat) => {
        return <><div className="POrderContainer">
            <div className="row POrderS1">
                <div className="PorderIcon">
                    <i class="fa-solid fa-briefcase"></i>
                </div>
                <div className="PorderID">Order ID {dat.data.id}</div>
                <div className="PorderStatus"><b>{dat.data.status}</b></div>
            </div>
            <div className="row POrderS2">
                <div className="lightText">Ordered</div>
                {/* <input type="range" min="1" max="100" value="50" /> */}
                <div className="lightText">Expected</div>
            </div>
            <div className="row POrderS2">
                <div className="span">{dat.data.Pdate}</div>
                <div className="span">{dat.data.Ddate}</div>
            </div>
            <hr />
            <div className="row POrderItems">
                <span>{
                    dat.data.data[0].name + ' (' + dat.data.data[0].capacity + ') x' + dat.data.data[0].quantity + ', ' +
                    dat.data.data[1].name + ' (' + dat.data.data[1].capacity + ') x' + dat.data.data[1].quantity + ', ' +
                    dat.data.data[2].name + ' (' + dat.data.data[2].capacity + ') x' + dat.data.data[2].quantity
                } <div className="greentext">
                        <u>+4 others</u>
                    </div>
                </span>
                <span><b>{dat.data.payment}</b></span>
            </div>
            <div className="row PorderLast">
                <div className="greentext">Need help?</div>
                <div className="redtext">Cancel Booking</div>
            </div>
        </div>
            <div className="backgroundgrey"></div>
        </>
    }
    return (
        <div className='OrdersContainer'>
            <div className="ProfileInfoContainerTop">
                <div className="row">
                    <span onClick={() => go(-1)} style={{ margin: '20px' }} className='BackButton'><i class="fa-solid fa-left-long"></i></span>
                    <span style={{ marginTop: '20px', marginBottom: '20px' }}>Orders</span>
                </div>
            </div>
            <div>
                {OrderData.map((item, index) => {
                    return <OrderTemplate index={index} data={item} />
                })}
            </div>
        </div>
    )
}

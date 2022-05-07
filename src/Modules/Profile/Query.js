import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Query() {
    const go = useNavigate()
    const [id, setId] = useState(localStorage.getItem('QueryOid'))
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
        getPh()
        if (id != undefined)
            localStorage.removeItem('QueryOid')
    }, [])
    const [bol, setBol] = useState(1)
    const [ph, setPh] = useState('')
    const getPh = async () => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "settingDetail"
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            if (response.data.data.phoneLine1 != undefined)
                setPh(response.data.data.phoneLine1)
        }).catch(err => {
        })
    }
    const sendQuery = () => {
        let type = ''
        switch (bol) {
            case 1: type = 'OrderRelated'; break;
            case 2: type = 'PaymentRelated'; break;
            case 3: type = 'ItemRelated'; break;
            case 4: type = 'others'; break;
        }
        console.log(type, document.getElementById('textBox').value)
        if (id == undefined)
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "emailSupport",
                    "params": {
                        "comment": document.getElementById('textBox').value,
                        "title": type,
                        "type": type
                    }
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                // console.log(response)
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
            })
        else {
            localStorage.removeItem('QueryOid')
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "createTicket",
                    "params": {
                        "comment": document.getElementById('textBox').value,
                        "title": type,
                        "orderId": id
                    }
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                // console.log(response)
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => {
            })
        }
    }
    return (
        <div className='Querypage'>
            <div style={{ backgroundColor: 'white', marginBottom: '10px' }} className="TopHeadP row">

                <svg onClick={() => { go(-1) }} style={{ margin: '20px', marginRight: 0 }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
                </svg>
                <span className='commonHeading' style={{ fontSize: '18px', marginTop: '20px', marginBottom: '20px' }}>Help</span>
            </div>
            <div style={{ width: 'calc(100% - 40px)', borderRadius: '10px', backgroundColor: 'white', margin: '10px', padding: '10px' }} className="">
                <div className=""><img width={80} src='/Images/logo.png'></img></div><br />
                <b style={{ fontSize: '19px' }} className='commonHeading'>Hi, how can we help you today?</b><br /><br />
                <div
                    onClick={() => {
                        window.location.href = "tel:+91" + ph
                    }}
                    style={{ justifyContent: 'center', marginBottom: '10px' }} className="CartPopUp highlighter12"><i class="fa-solid fa-phone"></i>&ensp; Click to call Customer Support</div>
                <small style={{ opacity: '0.7' }}>We are available every <b style={{ fontWeight: 500 }}>Mon - Sat</b> from <b style={{ fontWeight: 500 }}> 9 am - 7 pm</b></small>
                <br /><br />
                <div style={{
                    color: 'rgba(76, 173, 144, 1)',
                    border: '1px solid rgba(76, 173, 144, 0.3)', borderRadius: '4px'
                }} className="">
                    <div style={{ padding: '10px', alignItems: 'center', justifyContent: 'center' }} className="row">
                        <i style={{ marginBottom: '-3px', fontSize: '24px' }} class="fa-solid fa-envelope"></i>&emsp;
                        <b style={{ fontSize: '20px', fontWeight: 500 }}>or drop us query </b>

                    </div>
                    <div style={{ height: '1px', backgroundColor: 'rgba(76, 173, 144, 0.5)' }}></div>
                    <div style={{ lineHeight: '30px', textAlign: 'initial', padding: '10px', color: '#323B4C' }} className="">
                        <b style={{ fontWeight: 500, marginBottom: '6px' }}>Select Category*</b><br />
                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                            <div
                                onClick={() => {
                                    setBol(1)
                                }}
                                style={{ display: 'flex', alignItems: 'center' }} className="">
                                <input checked={bol == 1 ? true : false} type="checkbox" id="OR" name="OR" />&ensp;
                                <label for="OR"> Order Related</label><br></br>
                            </div>
                            <div
                                onClick={() => {
                                    setBol(2)
                                }}
                                style={{ display: 'flex', alignItems: 'center' }} className="">
                                <input checked={bol == 2 ? true : false} type="checkbox" id="PR" name="PR" />&ensp;
                                <label for="PR"> Payment Related</label><br></br>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                            <div
                                onClick={() => {
                                    setBol(3)
                                }}
                                style={{ display: 'flex', alignItems: 'center' }} className="">
                                <input checked={bol == 3 ? true : false} type="checkbox" id="IR" name="IR" />&ensp;
                                <label for="IR"> Item Related</label><br></br>
                            </div>
                            <div
                                onClick={() => {
                                    setBol(4)
                                }}
                                style={{ display: 'flex', alignItems: 'center' }} className="">
                                <input checked={bol == 4 ? true : false} type="checkbox" id="Oth" name="Oth" />&ensp;
                                <label for="Oth"> Others</label><br></br>
                            </div>
                        </div>
                        <br />
                        <b style={{ fontWeight: 500, marginBottom: '6px' }}>Enter Message*</b><br />
                        <textarea id='textBox' rows='5' style={{
                            width: 'calc(100% - 20px)',
                            borderRadius: '6px',
                            marginTop: '10px',
                            border: '1px solid rgba(102, 102, 102, 0.504)',
                            padding: 10
                        }} />
                        <center><button
                            onClick={() => sendQuery()}
                            style={{
                                margin: '2px',
                                backgroundColor: '#ff8400c9',
                                border: 'none',
                                padding: '8px 15px',
                                color: 'white', fontSize: '18px', borderRadius: '5px'
                            }}>Submit</button></center>
                    </div>
                </div>
            </div>
        </div>
    )
}

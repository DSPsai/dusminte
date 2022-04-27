import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Authentication } from '../../Apis globals/AuthAPI'
import ScrollTop from '../ScrollTop'

export default function ProfileInfo() {
    const Row = (dat) => {
        return <div className="ProfileEditRow">
            <b>{dat.data.name}</b><br />
            <input disabled={dat.data.name == 'Mobile Number' ? true : false} onChange={(e) => { }} defaultValue={dat.data.value} type="text" placeholder={dat.data.value} />
        </div>
    }
    const Rdata = [
        { name: 'Name', value: 'Akansh Bindal' },
        { name: 'Email Id', value: 'xyz@gmail.com' },
        { name: 'Mobile Number', value: '6303125378' },
    ]
    const go = useNavigate()
    const saveDetails = async () => {
        /*
        {
    "operation": "userProfileUpdate",
    "params": {
        "name" : "Adm",
        "email" : "gauravmishra1991@gmail.com",
        "mobile": "7760838386",
        "communityId": 1003,
        "addressFlat": "Tower",
        "addressWing": "Wing"
    }
}
        */
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "userProfileUpdate",
                "params": {
                    "name": uData[0].value,
                    "email": uData[1].value,
                    "mobile": uData[2].value,
                    "communityId": localStorage.getItem('community') != undefined ? JSON.parse(localStorage.getItem('community'))[0].id : "",
                    "addressFlat": "Tower",
                    "addressWing": "Wing"
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            // let city = response.data.data.filter(city => city.cityId == temp.communityId.cityId)
            console.log(response.data)
            localStorage.removeItem('UserData')
            localStorage.removeItem('access')
            Authentication().then(er => {
                go(-1)
            })
            // SuDdata({
            //     com: temp.communityId.name,
            //     loc: city[0].cityName
            // })
            // return response.data.data
        }).catch(err => {
        })
    }
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
        let temp = JSON.parse(localStorage.getItem('UserData'))
        /*
        {
    "operation": "cityList"
}
        */
        // let temp5 = {}
        // temp5.name = temp.name == undefined ? "" : temp.name
        // temp5.mobile =temp.mobile == undefined ? "" : temp.mobile
        // temp5.email = temp.email == undefined ? "" : temp.email
        // temp5.communityId.name = temp.communityId.name == undefined ? "" : temp.communityId.name
        // temp5.communityId.address = temp.communityId.address == undefined ? "" : temp.communityId.address
        let temp1 = [
            { name: 'Name', value: temp.name },
            { name: 'Email Id', value: temp.email },
            { name: 'Mobile Number', value: temp.mobile },
        ]
        SuData([...temp1]);
        let loc = localStorage.getItem('location');
        let com = localStorage.getItem('community')
        let tow = localStorage.getItem('tower')
        let flat = localStorage.getItem('flat')
        if (loc != undefined && com != undefined && tow != undefined && flat != undefined)
            SuDdata({
                loc: JSON.parse(loc)[0].name,
                com: JSON.parse(com)[0].name,
                tow: JSON.parse(tow).name,
                flat: JSON.parse(flat).name,
            });
        else if (loc != undefined && com != undefined && tow != undefined)
            SuDdata({
                loc: JSON.parse(loc)[0].name,
                com: JSON.parse(com)[0].name,
                tow: JSON.parse(tow).name,
                flat: ''
            });
        else if (loc != undefined && com != undefined)
            SuDdata({
                loc: JSON.parse(loc)[0].name,
                com: JSON.parse(com)[0].name,
                tow: "",
                flat: ''
            });
        else if (loc != undefined)
            SuDdata({
                loc: JSON.parse(loc)[0].name,
                com: "",
                tow: "",
                flat: ''
            });
        else
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "cityList"
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                let city = response.data.data.filter(city => city.cityId == temp.communityId.cityId)
                console.log(city)
                SuDdata({
                    com: temp.communityId.name,
                    loc: city[0].cityName
                })
                return response.data.data
            }).catch(err => {
            })
        // try {
        //     if (JSON.parse(localStorage.getItem('UserData')).name == null) {
        //         Authentication().then(e => {
        //             let temp = e
        let main = [
            { name: 'Name', value: temp.name },
            { name: 'Email Id', value: temp.email },
            { name: 'Mobile Number', value: temp.mobile },
        ]
        console.log(main)
        //             let temp2 = {
        //                 loc: temp.communityId.address,
        //                 com: temp.communityId.name
        //             }
        SuData([...main]);

        //             if (localStorage.getItem('location') != undefined && localStorage.getItem('community') != undefined)
        //                 SuDdata({
        //                     loc: localStorage.getItem('location'),
        //                     com: localStorage.getItem('community'),
        //                 });
        //             else if (localStorage.getItem('location') != undefined)
        //                 SuDdata({
        //                     loc: localStorage.getItem('location'),
        //                     com: "",
        //                 });
        //             else
        //                 axios({
        //                     method: "post",
        //                     url: `${process.env.REACT_APP_API_URL1}`,
        //                     data: {
        //                         "operation": "cityList"
        //                     },
        //                     headers: {
        //                         'Authentication': `Bearer ${localStorage.getItem('access')}`,
        //                         'Accept': 'application/json'
        //                     },
        //                 }).then(response => {
        //                     let city = response.data.data.filter(city => city.cityId == temp.communityId.cityId)
        //                     console.log(city)
        //                     SuDdata({
        //                         com: temp.communityId.name,
        //                         loc: city[0].cityName
        //                     })
        //                     return response.data.data
        //                 }).catch(err => {
        //                 })
        setLoad(true)

        //         })
        //     } else {
        //         setLoad(true)
        //     }
        // } catch (e) {
        //     Authentication().then(e => {
        //         let temp = e
        //         let temp1 = [
        //             { name: 'Name', value: temp.name },
        //             { name: 'Email Id', value: temp.email },
        //             { name: 'Mobile Number', value: temp.mobile },
        //         ]
        //         let temp2 = {
        //             loc: temp.communityId.address,
        //             com: temp.communityId.name
        //         }
        //         SuData([...temp1]);
        //         console.log({
        //             loc: localStorage.getItem('location'),
        //             com: localStorage.getItem('community'),
        //         })
        //         if (localStorage.getItem('location') != undefined && localStorage.getItem('community') != undefined)
        //             SuDdata({
        //                 loc: localStorage.getItem('location'),
        //                 com: localStorage.getItem('community'),
        //             });
        //         else if (localStorage.getItem('location') != undefined)
        //             SuDdata({
        //                 loc: localStorage.getItem('location'),
        //                 com: "",
        //             });
        //         else
        //             axios({
        //                 method: "post",
        //                 url: `${process.env.REACT_APP_API_URL1}`,
        //                 data: {
        //                     "operation": "cityList"
        //                 },
        //                 headers: {
        //                     'Authentication': `Bearer ${localStorage.getItem('access')}`,
        //                     'Accept': 'application/json'
        //                 },
        //             }).then(response => {
        //                 let city = response.data.data.filter(city => city.cityId == temp.communityId.cityId)
        //                 console.log(city)
        //                 SuDdata({
        //                     com: temp.communityId.name,
        //                     loc: city[0].cityName
        //                 })
        //                 return response.data.data
        //             }).catch(err => {
        //             })

        //         setLoad(true)
        //     })
        // };

    }, [])
    const [uData, SuData] = useState({})
    const [uDdata, SuDdata] = useState({
        loc: localStorage.getItem('location'),
        com: localStorage.getItem('community')
    })
    const [load, setLoad] = useState(false)
    const showNotEdit = () => {
        toast.error('You can Edit your details through App', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div className='ProfileInfoContainer'>
            <div className="ProfileInfoContainerTop">
                <div className="row">
                    <span onClick={() => {
                        localStorage.removeItem("community")
                        localStorage.removeItem("location")
                        localStorage.removeItem('tower')
                        localStorage.removeItem('flat')
                        go(-1)
                    }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }} className='BackButton'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.96875H4.69969L10.4644 2.20406L9 0.75L0.75 9L9 17.25L10.4541 15.7959L4.69969 10.0312H17.25V7.96875Z" fill="#1D1D1D" />
                        </svg>
                    </span>
                    <span style={{ color: '#323B4C', fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>Information</span>
                </div>
            </div>
            <div className="ProfileInfoContainerData">
                {load && uData.map((item, index) => {
                    return <Row index={index} data={item} />
                })}
                <div
                    //  onClick={() => {go('/Dropdown1/location')}}
                    onClick={() => {
                        showNotEdit()
                    }}
                    className="ProfileEditRow">
                    <b>Location</b><br />
                    <div className='CustomSelect leftright'>
                        <span>{uDdata.loc}</span>
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>
                <div
                    onClick={() => {
                        showNotEdit()
                    }}
                    //  onClick={() => go('/Dropdown1/community')} 
                    className="ProfileEditRow">
                    <b>Community</b><br />
                    <div className='CustomSelect leftright'>
                        <span> {uDdata.com}</span>
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>
                <div className="row">
                    <div
                        onClick={() => {
                            showNotEdit()
                        }}
                        //  onClick={() => go('/Dropdown2/Tower')} 
                        className="nopaddTop ProfileEditRow">
                        <b>Tower / Block</b><br />
                        <div style={{ width: '100%' }} className='CustomSelect leftright'>
                            <span> {uDdata.tow}</span>
                            <i class="fa-solid fa-sort-down"></i>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            showNotEdit()
                        }}
                        //  onClick={() => go('/Dropdown2/Flat or House')}
                        className="ProfileEditRow">
                        <b>Flat/ House no.</b><br />
                        <div style={{ width: '100%' }} className='CustomSelect leftright'>
                            <span>{uDdata.flat}</span>
                            <i class="fa-solid fa-sort-down"></i>
                        </div>

                    </div>
                </div>
                <button onClick={() => { saveDetails() }} className='ProfileEditSave ProductAdd'>Save</button>
                <center style={{ fontSize: '17px', opacity: '0.6', padding: '15px', paddingTop: '20px' }}>
                    *if you are unable to find your flat details, please write to us at support@dusminute.com
                </center>
            </div>
            <ScrollTop />
        </div>
    )
}

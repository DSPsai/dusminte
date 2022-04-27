import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
                    "communityId":localStorage.getItem('community')!=undefined?JSON.parse(localStorage.getItem('community'))[0].id:"",
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
                        <svg width="30" height="30" viewBox="0 0 191 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M179.062 75.4981C179.062 74.2467 178.434 73.0464 177.314 72.1615C176.195 71.2766 174.677 70.7794 173.094 70.7794H32.3147L69.8821 41.089C70.437 40.6503 70.8772 40.1294 71.1775 39.5562C71.4779 38.983 71.6325 38.3686 71.6325 37.7481C71.6325 37.1277 71.4779 36.5133 71.1775 35.9401C70.8772 35.3669 70.437 34.846 69.8821 34.4073C69.3271 33.9685 68.6683 33.6205 67.9432 33.3831C67.2181 33.1456 66.441 33.0234 65.6562 33.0234C64.8714 33.0234 64.0942 33.1456 63.3691 33.3831C62.6441 33.6205 61.9852 33.9685 61.4303 34.4073L13.6803 72.1573C13.1245 72.5956 12.6834 73.1163 12.3825 73.6896C12.0816 74.2629 11.9268 74.8775 11.9268 75.4981C11.9268 76.1188 12.0816 76.7334 12.3825 77.3067C12.6834 77.88 13.1245 78.4007 13.6803 78.839L61.4303 116.589C61.9852 117.028 62.6441 117.376 63.3691 117.613C64.0942 117.851 64.8714 117.973 65.6562 117.973C66.441 117.973 67.2181 117.851 67.9432 117.613C68.6683 117.376 69.3271 117.028 69.8821 116.589C70.437 116.15 70.8772 115.629 71.1775 115.056C71.4779 114.483 71.6325 113.869 71.6325 113.248C71.6325 112.628 71.4779 112.013 71.1775 111.44C70.8772 110.867 70.437 110.346 69.8821 109.907L32.3147 80.2169H173.094C174.677 80.2169 176.195 79.7197 177.314 78.8348C178.434 77.9499 179.062 76.7496 179.062 75.4981Z" fill="black" fill-opacity="0.8" />
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
                 onClick={() => {go('/Dropdown1/location')}}
                  className="ProfileEditRow">
                    <b>Location</b><br />
                    <div className='CustomSelect leftright'>
                        <span>{uDdata.loc}</span>
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>
                <div
                 onClick={() => go('/Dropdown1/community')} 
                 className="ProfileEditRow">
                    <b>Community</b><br />
                    <div className='CustomSelect leftright'>
                        <span> {uDdata.com}</span>
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>
                <div className="row">
                    <div
                     onClick={() => go('/Dropdown2/Tower')} 
                     className="nopaddTop ProfileEditRow">
                        <b>Tower / Block</b><br />
                        <div style={{ width: '100%' }} className='CustomSelect leftright'>
                            <span> {uDdata.tow}</span>
                            <i class="fa-solid fa-sort-down"></i>
                        </div>
                    </div>
                    <div
                     onClick={() => go('/Dropdown2/Flat or House')}
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

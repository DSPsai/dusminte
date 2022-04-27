import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { setCity } from '../../Apis globals/profileAPI'
import { useNavigate } from 'react-router-dom'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { toast } from 'react-toastify'
export default function Dropdown() {
    let location = window.location.href.split('/').pop()
    const [id, setLoc] = useState(localStorage.getItem('location'))
    const getCities = async () => {
        if (cities.length == 0)
            return await axios({
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
                setCities(response.data.data)
                return response.data.data
            }).catch(err => {
            })
        else return cities
    }
    const [cities, setCities] = useState([])
    const apiCall = async (loca) => {
        console.log(loca)
        if (location != 'community')
            return await axios({
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
                return response.data.data
            }).catch(err => {
            })
        else return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "communityByCityId",
                "params": {
                    "cityId": loca.cityId == undefined ? loca.id : loca.cityId
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            if (response.data.data.length == 0) {
                showNoData()
            }
            return response.data.data
        }).catch(err => {
        })
    }
    const showNoData = () => {
        toast.error('No data Found', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'none'
        // try {
        if (location == 'community') {
            try {
                console.log('intry')
                // setLoc(JSON.parse(id)[0].id)
                apiCall(JSON.parse(id)[0]).then(er => {
                    console.log(er)
                    let temp = []
                    for (let i of er) {
                        temp.push({
                            name: i.name.toLowerCase(), address: i.address, image: i.image, id: i._id
                        })
                    }
                    setData([...temp])
                    setCity(temp)
                })
            }
            catch (er) {
                // setLoc(JSON.parse(localStorage.getItem('UserData')).communityId.cityId)
                console.log('catch')
                // localStorage.setItem('location', JSON.parse(localStorage.getItem('UserData')).communityId.cityId)
                getCities().then(cit => {
                    let tempc = []
                    tempc = cit.filter(c => c.cityId == JSON.parse(localStorage.getItem('UserData')).communityId.cityId)
                    console.log(tempc)
                    setLoc(tempc[0].id)
                    localStorage.setItem('location', JSON.stringify([{ name: tempc[0].cityName.toLowerCase(), id: tempc[0].cityId }]))
                    apiCall(tempc[0]).then(er => {
                        console.log(er)
                        let temp = []
                        for (let i of er) {
                            temp.push({
                                name: i.name.toLowerCase(), address: i.address, image: i.image, id: i._id
                            })
                        }
                        setData([...temp])
                        setCity(temp)
                    })
                })
            }

        }
        else
            apiCall(JSON.parse(id)[0]).then(er => {
                console.log(er)
                let temp = []
                for (let i of er) {
                    temp.push({
                        name: i.cityName.toLowerCase(), id: i.cityId
                    })
                }
                setData([...temp])
                setCity(temp)
            })
        // }
        // 
    }, [])
    const search = (e) => {
        // console.log(e)
        let temp = []
        for (let i of data) {
            let spliter = i.name.toLowerCase().split(e.toLowerCase())
            console.log(spliter)
            if (spliter.length > 1) {
                if (location == 'community')
                    temp.push({ name: spliter, address: i.address, image: i.image })
                else
                    temp.push({ name: spliter, id: i.id })
                // console.log("true", temp)
            } else {
                // console.log("false", spliter)
            }
        }
        setSearch([...temp])
    }
    const [data, setData] = useState([])
    const [sear, setSearch] = useState([])
    const [si, setSi] = useState([])
    // const Join = (dat) => {
    //     // let data = dat.data
    //     let temp = []
    //     for (let i = 0; i < dat.data.length - 1; i++) {
    //         temp.push(<><span>{dat.data[i]}</span><span className='SearchedItemH'>{si}</span></>)
    //     }
    //     temp.push(<><span>{dat.data[dat.data.length]}</span></>)
    //     console.log(temp)
    //     return <>{temp}</>
    // }
    useEffect(() => {
        // const delayDebounceFn = setTimeout(() => {
        search(si)
        // }, 1000)
        // return () => clearTimeout(delayDebounceFn)
    }, [si])
    const go = useNavigate()
    return (
        <div className='dropdownpage1'>
            <b>Select your {location}</b>
            <div className="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input onChange={(e) => setSi(e.target.value)} placeholder='Search for your location' />
            </div>
            {si.length > 0 ? sear.length > 0 ? location != 'community' ? sear.map(item => {
                console.log(item.name)
                return <div onClick={() => {
                    let temp = data.filter(dat => dat.id == item.id)
                    localStorage.setItem('location', JSON.stringify([temp]))
                    localStorage.removeItem('community')
                    localStorage.removeItem('tower')
                    localStorage.removeItem('flat')
                    go(-1)
                }} className="dropdownitem">{
                        item.name.map((er, index) => {
                            return <span><span>{er}</span><span className='SearchedItemH'>{item.name.length - 1 != index ? si : ""}</span></span>
                        })
                        // <Join data={item} />
                    }</div>
            }) : sear.map(item => {
                console.log(item.name)
                return <div className="dropdownitem row">
                    <PhotoProvider>
                        <PhotoView src={item.image} >
                            <img src={item.image} />
                        </PhotoView>
                    </PhotoProvider><div onClick={() => {
                        let temp = data.filter(dat => dat.id == item.cityId)
                        localStorage.setItem('community', JSON.stringify([temp]))
                        localStorage.removeItem('tower')
                        localStorage.removeItem('flat')
                        go(-1)
                    }} className="column">
                        <div className="dropdownitem_name">{
                            item.name.map((er, index) => {
                                return <span className=''><b><span>{er}</span><span className='SearchedItemH'>{item.name.length - 1 != index ? si : ""}</span></b></span>
                            })
                            // <Join data={item} />
                        }</div>
                        <div className="dropdownitem_addr">{item.address}</div>
                    </div>
                </div>
            }) : <>
                <h3>Cannot find your city</h3>
            </> : location != 'community' ? data.map(item => {
                return <div onClick={() => {
                    // let temp = data.filter(dat => dat.id == item.id)
                    localStorage.setItem('location', JSON.stringify([item]))
                    localStorage.removeItem('community')
                    localStorage.removeItem('tower')
                    localStorage.removeItem('flat')
                    go(-1)
                }} className="dropdownitem">{item.name}</div>
            }) : data.map(item => {
                // console.log(item.name)
                return <div className="dropdownitem row">
                    <PhotoProvider>
                        <PhotoView src={item.image} >
                            <img src={item.image} />
                        </PhotoView>
                    </PhotoProvider>
                    <div onClick={() => {
                        localStorage.setItem('community', JSON.stringify([item]))
                        localStorage.removeItem('tower')
                        localStorage.removeItem('flat')
                        go(-1)
                    }} className="column">
                        <div className='dropdownitem_name'><b>{item.name}</b></div>
                        <div className="dropdownitem_addr">{item.address}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

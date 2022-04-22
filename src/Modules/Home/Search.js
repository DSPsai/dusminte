import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RecommendedCall } from '../../Apis globals/HomepageApi';
import ProductLongCard from '../CommonComponents/ProductLongCard';
import '../Styles/Search.css'
export default function Search(props) {
    const [recent, setRecent] = useState(localStorage.getItem('recent') != undefined ? JSON.parse(localStorage.getItem('recent')) : [])
    const Recent = () => {
        let temp = [];
        for (let i of recent) {
            temp.push(<>{i}<hr /></>)
        }
        return <>{temp}</>
    }
    const searchMe = async (e) => {
        setLoad(true)
        let val = e
        if (val.length > 2)
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "productListPublished",
                    "params": {
                        "filter": {
                            "search": val
                        },
                        "storeId": "1003"
                    }
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                console.log(response)
                console.log(value)
                let temp1 = response.data.data.products;
                let temp2 = []
                let tempa = []
                for (let i of temp1) {
                    temp2.push(i.description.toLocaleLowerCase().split(value))
                    console.log(i.description.toLocaleLowerCase().split(value))
                    tempa.push({
                        isInCart: false,
                        img: i.image,
                        brand: i.brand,
                        incart: 0,
                        name: i.name,
                        quantity: i.unit,
                        price: i.price
                    })
                }
                setData([...temp2])
                setTdata(response.data.data.products)
                setTdata1([...tempa])
                setTdata([...tempa])
                setLoad(false)
                // HomePageByCommunityData = response.data.data[1].tile
                // return response.data.data[1].tile
            }).catch(err => {
                setLoad(false)
            })
        RecommendedCall('pop').then(e => {
            // let temp = []
            // for (let i of e) {
            //     temp.push({
            //         name: i.name,
            //         img: i.image
            //     })
            // }
            setsCards([...e])
        })
    }
    const [value, setValue] = useState("")
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(value)
            searchMe(value)
            setPc(-1)
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [value])

    const [data, setData] = useState([])
    const [searchCards, setsCards] = useState([
        { img: '/Images/egg.png', name: 'Eggs & Diary' },
        { img: '/Images/bread.png', name: 'Bread & Bakery' },
        { img: '/Images/cool.png', name: 'Beverages' },
        { img: '/Images/fruit.png', name: 'Fresh Fruits' },
        { img: '/Images/care.png', name: 'Personal Care' },
    ])
    const services = [
        {
            img: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.947 17.5044V14.7197H21.6725C21.6029 14.1767 21.5054 13.6476 21.3662 13.1325L24.9584 11.0579L23.5661 8.64918L20.2662 10.5428C19.8764 9.87443 19.403 9.27573 18.8878 8.74665C19.0271 7.96694 19.1663 6.39361 18.0803 4.72281L20.3776 2.42547L18.4144 0.46228L16.0196 2.85709C13.6805 1.61791 11.7034 2.39762 10.8262 2.85709L8.41752 0.46228L6.45433 2.42547L8.75168 4.72281C7.66566 6.39361 7.80489 7.98087 7.94412 8.74665C7.42896 9.28966 6.95557 9.88836 6.56572 10.5428L3.26589 8.63526L1.87356 11.044L5.46578 13.1186C5.32654 13.6337 5.22908 14.1628 5.15946 14.7058H0.88501V17.4905H5.15946C5.22908 18.0335 5.32654 18.5626 5.46578 19.0777L1.87356 21.1523L3.26589 23.561L6.56572 21.6814C8.06943 24.2015 10.5756 25.8584 13.416 25.8584C16.2563 25.8584 18.7625 24.2015 20.2662 21.6814L23.5661 23.5889L24.9584 21.1802L21.3662 19.1056C21.5054 18.5904 21.6029 18.0613 21.6725 17.5183H25.947V17.5044ZM13.4159 4.97345C14.6411 4.97345 15.6715 5.76708 16.0335 6.86702C15.212 6.54678 14.3348 6.36578 13.4159 6.36578C12.4969 6.36578 11.6198 6.54678 10.7983 6.86702C11.1603 5.76708 12.1906 4.97345 13.4159 4.97345ZM7.84657 16.1121C7.84657 19.9549 10.3388 23.0737 13.4159 23.0737C16.4929 23.0737 18.9852 19.9549 18.9852 16.1121C18.9852 12.2693 16.4929 9.15044 13.4159 9.15044C10.3388 9.15044 7.84657 12.2693 7.84657 16.1121Z" fill="#FA9334"/>
        </svg>
        `, name: 'Pest Control'
        },
        {
            img: `<svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.24069 0.97345C1.87098 0.97345 0.734497 2.10993 0.734497 3.47964V8.19589C0.734497 8.58415 0.825035 8.96932 1.00127 9.31927L3.02776 13.3723C3.45088 14.218 4.32175 14.7575 5.26718 14.7575H21.2638C22.2092 14.7575 23.0801 14.218 23.5032 13.3723L25.5297 9.31927C25.7059 8.96932 25.7964 8.58415 25.7964 8.19589V3.47964C25.7964 2.10993 24.66 0.97345 23.2902 0.97345H3.24069ZM3.24073 3.47967H23.2903V7.23896H3.24073V3.47967ZM22.5144 9.74516H4.01653L5.26962 12.2514H21.2613L22.5144 9.74516ZM8.2531 17.2637C7.56103 17.2637 7 17.8247 7 18.5168C7 19.2089 7.56103 19.7699 8.2531 19.7699C8.94516 19.7699 9.5062 19.2089 9.5062 18.5168C9.5062 17.8247 8.94516 17.2637 8.2531 17.2637ZM12.0124 18.5168C12.0124 17.8247 12.5735 17.2637 13.2655 17.2637C13.9576 17.2637 14.5186 17.8247 14.5186 18.5168C14.5186 19.2089 13.9576 19.7699 13.2655 19.7699C12.5735 19.7699 12.0124 19.2089 12.0124 18.5168ZM18.2779 17.2637C17.5858 17.2637 17.0248 17.8247 17.0248 18.5168C17.0248 19.2089 17.5858 19.7699 18.2779 19.7699C18.9699 19.7699 19.5309 19.2089 19.5309 18.5168C19.5309 17.8247 18.9699 17.2637 18.2779 17.2637ZM4.49378 22.2761C4.49378 21.5841 5.05481 21.023 5.74688 21.023C6.43894 21.023 6.99997 21.5841 6.99997 22.2761C6.99997 22.9682 6.43894 23.5292 5.74688 23.5292C5.05481 23.5292 4.49378 22.9682 4.49378 22.2761ZM13.2655 21.023C12.5735 21.023 12.0124 21.5841 12.0124 22.2761C12.0124 22.9682 12.5735 23.5292 13.2655 23.5292C13.9576 23.5292 14.5186 22.9682 14.5186 22.2761C14.5186 21.5841 13.9576 21.023 13.2655 21.023ZM19.531 22.2761C19.531 21.5841 20.092 21.023 20.7841 21.023C21.4761 21.023 22.0372 21.5841 22.0372 22.2761C22.0372 22.9682 21.4761 23.5292 20.7841 23.5292C20.092 23.5292 19.531 22.9682 19.531 22.2761Z" fill="#FA9334"/>
            </svg>
        `, name: 'AC Repair'
        },
        {
            img: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7675 2.99815C15.6985 0.0684069 20.4678 0.0684069 23.4 2.99815C26.331 5.9304 26.331 10.6997 23.4 13.6319L13.3753 23.6567C11.9543 25.0765 10.0658 25.8584 8.05838 25.8584C6.05092 25.8584 4.1625 25.0765 2.74149 23.6567C1.32173 22.2357 0.539795 20.3485 0.539795 18.3398C0.539795 16.3311 1.32173 14.4439 2.74274 13.0229L12.7675 2.99815ZM17.7949 15.6921L21.4327 12.0543C23.4765 10.0105 23.5918 6.5457 21.4515 4.6034C20.4991 3.73876 19.2911 3.30644 18.0832 3.30644C16.7987 3.30644 15.5156 3.7939 14.5381 4.77131L10.7062 8.60328C10.2162 9.09199 10.2162 9.8852 10.7062 10.3752L16.0231 15.6921C16.5118 16.1808 17.305 16.1808 17.7949 15.6921Z" fill="#FA9334"/>
            </svg>
        `, name: 'Medicine Delivery'
        },
        {
            img: `<svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.0123 4.48366L19.0605 1.53192C17.9745 0.445903 16.2062 0.445903 15.1202 1.53192L11.1799 5.47222L14.1317 8.42396L17.0834 5.47222L22.0123 10.4011C23.6413 8.75811 23.6413 6.11269 22.0123 4.48366Z" fill="#FA9334"/>
            <path d="M2.81215 16.7919C3.63363 17.6133 4.95634 17.6133 5.76389 16.7919L9.20295 13.3528L6.25121 10.3871L2.81215 13.8262C1.99068 14.6477 1.99068 15.9704 2.81215 16.7919Z" fill="#FA9334"/>
            <path d="M16.1089 8.42396L15.1203 9.41251L14.1318 10.4011L9.70415 5.97345C8.88267 5.13806 7.55996 5.13806 6.75241 5.95953C5.93093 6.78101 5.93093 8.10372 6.75241 8.91127L11.18 13.3389L10.1915 14.3274L1.33624 23.1827C0.250224 24.2687 0.250224 26.0369 1.33624 27.123C2.42226 28.209 4.19052 28.209 5.27654 27.123L18.0721 14.3274C18.6151 14.8704 19.4922 14.8704 20.0352 14.3274C20.5782 13.7844 20.5782 12.9073 20.0352 12.3643L16.1089 8.42396Z" fill="#FA9334"/>
            </svg>
        `, name: 'General Plumbing Work'
        },
        {
            img: `<svg width="9" height="28" viewBox="0 0 9 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.82 0.796448V9.15043L12.4342 8.23149C12.4256 8.23149 12.4223 8.23681 12.4177 8.24416C12.4149 8.2487 12.4117 8.25402 12.4063 8.25934C14.5644 9.12258 16.1935 11.0162 16.6808 13.3274H3.03595C3.50935 11.0162 5.1523 9.12258 7.31041 8.25934C6.85094 7.89733 6.47501 7.45179 6.19654 6.93662L0.112061 5.6696V4.27727L6.19654 3.01025C6.89271 1.70146 8.27112 0.796448 9.85837 0.796448C10.833 0.796448 11.7241 1.14453 12.4342 1.71539L16.82 0.796448ZM16.82 21.6814H2.89667V14.7197H16.82V21.6814ZM16.82 23.0737H2.89667V24.4661C2.89667 25.9976 4.14977 27.2507 5.68133 27.2507H14.0353C15.5669 27.2507 16.82 25.9976 16.82 24.4661V23.0737ZM9.85836 3.58114C10.6241 3.58114 11.2089 4.152 11.2507 4.97347C11.2507 5.73925 10.6241 6.3658 9.85836 6.3658C9.09258 6.3658 8.46603 5.73925 8.46603 4.97347C8.46603 4.20769 9.09258 3.58114 9.85836 3.58114Z" fill="#FA9334"/>
            </svg>
        `, name: 'Home Disinfection'
        }
    ]
    const [load, setLoad] = useState(false)
    const [pC, setPc] = useState(-1)
    const [tData, setTdata] = useState([])
    const [tData1, setTdata1] = useState([])
    useEffect(() => {
        let temp = tData1;
        let temper = temp.splice(pC, 1)
        temp.splice(0, 0, ...temper)
        setTdata(temp)
        console.log(temp)
    }, [pC])
    const [showP,setShowp]=useState(false)
    return (
        <div
            //  style={{ top: props.bottom }}
            // onClick={() => props.setBottom('-100vh')}
            className='SearchContainer' id='SearchBottom'>
            <div className="sBMy row">
                <div className="searchbar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input onChange={(e) => {
                        setValue(e.target.value)
                    }} placeholder='Search for any product or service' />
                </div>
                <span style={{ marginLeft: '15px', fontSize: '11px' }} onClick={() => document.getElementById('SearchBottom').style.top = '100vh'} className='BackButton'>
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>
            {/* <div style={{ marginTop: '60px' }} className=""></div> */}
            {value.length > 0 ? <>
                {value.length > 2 ? load ? <i class="fa-solid fa-group-arrows-rotate"></i> : <>
                    <div style={{ marginLeft: '0px', padding: '10px' }} className='profileCardName'>Products</div>
                    <div className="ProductPageCards">
                        {pC == -1 ? data.map((e, indexer) => {
                            return <>
                                <div onClick={() => setPc(0)} className='SearchedItem leftright'><span>See all the products related to "{value}"</span><span><i class="fa-solid fa-up-right-from-square"></i></span></div>
                                <div onClick={() => {
                                    if (recent.indexOf(e.join(value) < 0)) {
                                        setRecent([...recent, e.join(value)])
                                        localStorage.setItem('recent', JSON.stringify(recent))
                                    }
                                    setPc(indexer)
                                }} className='SearchedItem'>{e.map((er, index) => {
                                    return <span >{er}<span className='SearchedItemH'>{index < e.length - 1 ? value : <></>}</span></span>
                                })}</div>
                            </>
                        }) : <>
                            {tData.map((item, index) => {
                                return <ProductLongCard Odata={tData} setData={setTdata} index={index} data={item} />
                            })}
                        </>}</div></> : <><h3>Enter 3 characters</h3></>}
            </> : <>
                <div style={{ marginLeft: 0, marginRight: 0 }} className="SearchTitle leftright">
                    <span>Recent Product Searches</span>
                    <span
                        onClick={() => {
                            setRecent([])
                            localStorage.removeItem('recent')
                        }}
                    >Clear</span>
                </div>
                <div className="recentItems">
                    <Recent />
                </div>
                <br />
                {/* <div className="backgroundgrey"></div> */}
                <div className="SearchTitle">
                    Popular Essentials
                </div>
                <div className="SearchCardContainer">
                    {searchCards.map(item => {
                        return <div onClick={() => {
                            setTdata([...searchCards])

                        }} className="SearchCard">
                            <div className="searchCardImg">
                                <img src={item.image} />
                            </div>
                            <div className="SearchCardTitle">{item.name}</div>
                        </div>
                    })}
                </div>
                {/* <div className="backgroundgrey"></div> */}
                {/* <div className="SearchTitle">
                    Popular Services
                </div>
                <div className="SearchCardContainer">
                    {services.map(item => {
                        return <div className="SearchCard">
                            <div dangerouslySetInnerHTML={{ __html: item.img }} className="searchCardImgd">
                            </div>
                            <div className="SearchCardTitle">{item.name}</div>
                        </div>
                    })}
                </div> */}
            </>
            }
        </div>
    )
}

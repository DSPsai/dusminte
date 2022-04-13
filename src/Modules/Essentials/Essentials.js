import React, { useState, useEffect } from 'react'
import { useHistory, useNavigate } from "react-router-dom";
import Bottom from '../Bottom';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Search from '../Home/Search';
import '../Styles/Ess.css'
export default function Essentials() {
    const [search, setSearch] = useState('-100vh')
    let history = useNavigate();
    const images = [
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/34da8c2d1bec1851.jpg?q=20" },
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/208c836282c59f1e.jpeg?q=20" },
    ];
    const [data, setData] = useState([
        {
            name: 'Foodgrains, Oil & Dry Fruits',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },
        {
            name: 'Masalas & More',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },
        {
            name: 'Munching Snacks',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },
        {
            name: 'Instant Foods',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },
        {
            name: 'Foodgrains, Oil & Dry Fruits',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },
        {
            name: 'Foodgrains, Oil & Dry Fruits',
            data: [
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
                { name: 'Atta, flours & soup', img: '/Images/grocery.png' },
            ],
            expand: false
        },

    ])
    const EssInnerC = (item) => {
        return <div onClick={() => history('/SingleProducts')} style={{ animationName: item.expand ? 'example' : '', animationDuration: '1s' }} className="EssIC">
            <img src={item.data.img}></img><br />
            {item.data.name}
        </div>
    }
    useEffect(() => {
      document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
      document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60;
      // await axios.post('http://13.232.100.48:8000', {
      //   "operation": "homepageSectionTile"
      // });
      // call()
    }, [])
    const [currentClick, setCurrentClick] = useState(0)
    const EssentialsCC = (dat) => {
        return <div style={{ height: dat.data.expand ? 'auto' : '33px' }} className="EssCC">
            <div className="row">
                <div className="HeadText">{dat.data.name}</div>
                <i style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => {
                    let temp = data;
                    if (temp[dat.index].expand)
                        e.target.style.transform = 'rotate(0deg)';
                    else
                        e.target.style.transform = 'rotate(180deg)';
                    setCurrentClick(dat.index)
                    temp[dat.index].expand = !temp[dat.index].expand
                    setData([...temp])
                }} class="fa-solid fa-angle-down"></i>
            </div>
            {dat.data.data.map(item => {
                return <EssInnerC data={item} expand={currentClick == dat.index ? dat.data.expand : false} />
            })}
        </div>
    }
    return (
        <div className='EssentialsPage'>
            <div className='HomeTop'>
                <span className='HomeTopLocation'><i class="fa-solid fa-location-dot"></i></span>
                <span ><b style={{ fontSize: '18px' }} className='fontcolor'>Brigade Xanadu</b>&ensp;<i style={{ fontSize: '14px' }} onClick={() => history('/ProfileEdit')} class="fontcolor fa-solid fa-chevron-down"></i></span>
                <span style={{ textAlign: 'end' }}><i onClick={() => { history('/Groceries'); document.getElementById('SearchBottom').style.top = '0' }} class="fontcolor fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div style={{ marginTop: '70px' }} className="">
                <Slide arrows={false} easing="ease">
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${images[0].url})` }}>
                            {/* <span>Slide 1</span> */}
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${images[1].url})` }}>
                            {/* <span>Slide 2</span> */}
                        </div>
                    </div>
                </Slide>
            </div>
            <div style={{ padding: '20px' }} className="EssentialsCardContianer">
                <div style={{ fontSize: '22px' }} className="HeadText">Shop by category</div>
                <br />
                {data.map((item, index) => {
                    return <EssentialsCC index={index} data={item} />
                })}
            </div>
            <Search setBottom={setSearch} bottom={search} />
            <Bottom show='Groceries' />
        </div>
    )
}

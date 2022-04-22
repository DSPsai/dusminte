import React, { useState, useEffect } from 'react'
import { useHistory, useNavigate } from "react-router-dom";
import Bottom from '../Bottom';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Search from '../Home/Search';
import '../Styles/Ess.css'
import { getGrocery } from '../../Apis globals/GroceryApi';
import { getSingleBanner } from '../../Apis globals/HomepageApi';
export default function Essentials() {
    const [search, setSearch] = useState('-100vh')
    let history = useNavigate();
    const [images, setImages] = useState([
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/34da8c2d1bec1851.jpg?q=20" },
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/208c836282c59f1e.jpeg?q=20" },
    ]);
    const [data, setData] = useState([])
    const EssInnerC = (item) => {
        return <div onClick={() => {
            history(`/SingleProducts/${item.data.name.replaceAll("/", ".").replaceAll(" ", "-")}`);
            localStorage.setItem('labels', JSON.stringify(data[item.index].data.map(e => { return e.name })))
        }}
            // style={{ animationName: item.expand ? 'example' : '', animationDuration: '1s' }} 
            className="EssIC">
            <img src={item.data.img}></img><br />
            <div className="EssIcName">{item.data.name}</div>
        </div>
    }
    async function call() {
        getGrocery().then(e => {
            let temp1 = [];
            for (let i of e) {
                let temp2 = []
                for (let j of i.subCategories) {
                    let temp3 = { name: j.name.toLowerCase(), img: j.image }
                    temp2.push(temp3)
                }
                temp1.push({ name: i.category.name, data: temp2, expand: false })
            }
            setData([...temp1])
            console.log(temp1)
        })
    }
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
        document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60;
        call()
        getSingleBanner("FOODGRAINS").then(e => {
            console.log(e)
            setImages([...e])
        })
    }, [])
    const [currentClick, setCurrentClick] = useState(0)
    const EssentialsCC = (dat) => {
        return <div style={{ height: dat.data.expand ? 'auto' : '33px' }} className="EssCC">
            <div onClick={(e) => {
                let temp = data;
                // if (temp[dat.index].expand)
                //     e.target.style.transform = 'rotate(0deg)';
                // else
                //     e.target.style.transform = 'rotate(180deg)';
                setCurrentClick(dat.index)
                temp[dat.index].expand = !temp[dat.index].expand
                console.log(temp[dat.index].expand)
                setData([...temp])
            }} className="row">
                <div className="HeadText">{dat.data.name}</div>
                <i style={{ display: 'flex', alignItems: 'center', transform: !data[dat.index].expand ? 'rotate(0deg)' : 'rotate(180deg)' }} class="fa-solid fa-angle-down"></i>
            </div>
            {dat.data.data.map((item, indexer) => {
                return <EssInnerC index={dat.index} data={item} expand={currentClick == dat.index ? dat.data.expand : false} />
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
                {data.length > 0 ? data.map((item, index) => {
                    return <EssentialsCC index={index} data={item} />
                }) : Array.from(Array(9).keys()).map((item) => (
                    <div class="card">
                        <div class="card__image loading"></div>
                        <div class="card__title loading"></div>
                        <div class="card__description loading"></div>
                    </div>
                ))}
            </div>
            <Search setBottom={setSearch} bottom={search} />
            <Bottom show='Groceries' />
        </div>
    )
}

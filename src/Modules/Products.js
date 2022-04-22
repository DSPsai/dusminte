import React, { useEffect, useState } from 'react'
import './Styles/Products.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import ProductLongCard from './CommonComponents/ProductLongCard';
import Top from './CommonComponents/Top';
import ScrollTop from './ScrollTop';
import { getMasterBanner, getSingleBanner } from '../Apis globals/HomepageApi';
import { getPopularProducts } from '../Apis globals/popularProducts';
import { getCartData } from '../Apis globals/cartAPI';
import { getGrocery, getsGrocery } from '../Apis globals/GroceryApi';
import { useNavigate } from 'react-router-dom';
export default function Products(prop) {
    let url = decodeURIComponent(window.location.href.split('/').pop().replaceAll(".", "/").replaceAll("-", " "))
    const [images, setImages] = useState([
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/34da8c2d1bec1851.jpg?q=20" },
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/208c836282c59f1e.jpeg?q=20" },
    ]);
    const [ProductTopData, setPTdata] = useState([
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
    ])
    const go = useNavigate()
    const ProductTop = (dat) => {
        return <div onClick={() => {
            go(`/SingleProducts/${dat.data.name.replaceAll("/", ".").replaceAll(" ", "-")}`);
            localStorage.setItem('labels', JSON.stringify(ProductTopData.map(e => { return e.name })))
        }} className="ProductPageTopCard">
            <img src={dat.data.image}></img>
            <div className="ProductPageTopCardName">{dat.data.name}</div>
        </div>
    }
    const [productCardData, setCartData] = useState([])
    let masterCart = getCartData()
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
        document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60
        // getMasterBanner(url).then(e => {
        //     console.log(e)
        getSingleBanner(url).then(e => {
            console.log(e)
            setImages([...e])
        })
        getPopularProducts(url.toUpperCase()).then(e => {
            let temp = []
            for (let i of e) {
                temp.push({
                    isInCart: masterCart[i._id] != undefined ? true : false,
                    img: i.image,
                    brand: i.brand,
                    incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity : 0,
                    name: i.name,
                    quantity: i.unit,
                    price: i.price,
                    off:i.priceDiscount,
                    cprice: i.priceDiscounted,
                    id: i._id
                })
            }
            console.log(temp)
            setCartData([...temp])
        })
        getsGrocery(url.toUpperCase()).then(dat => {
            console.log(dat)
            setPTdata(dat)
        })
        // })
    }, [])

    return (
        <div className='Products_Page'>
            <Top head={url} />
            <Slide className='Pslider' arrows={false} easing="ease">
                {images.map(er => {
                    return <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${er.url})` }}>
                            {/* <span>Slide 1</span> */}
                        </div>
                    </div>
                })}
            </Slide>
            <div className="ProductPageTop">
                {ProductTopData.map(item => {
                    return <ProductTop data={item} />
                })}
            </div>
            <div className="ProductPageCards EssentialsCardContianer">
                <div style={{ marginLeft: '3px' }} className='commonHeading'>popular products in your society</div>
                {/* {productCardData.map((item, index) => {
                    return <ProductLongCard Odata={productCardData} setData={setCartData} index={index} data={item} />
                })} */}
                {productCardData.length > 0 ? productCardData.map((item, index) => {
                    return <ProductLongCard setItems={prop.setItems} setPrice={prop.setPrice} Odata={productCardData} setData={setCartData} index={index} data={item} />
                }) : Array.from(Array(9).keys()).map((item) => (
                    <div class="card">
                        <div class="card__image loading"></div>
                        <div class="card__title loading"></div>
                        <div class="card__description loading"></div>
                    </div>
                ))}
            </div>
            <ScrollTop />
        </div>
    )
}

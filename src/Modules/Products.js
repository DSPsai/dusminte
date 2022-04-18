import React, { useEffect, useState } from 'react'
import './Styles/Products.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import ProductLongCard from './CommonComponents/ProductLongCard';
import Top from './CommonComponents/Top';
import ScrollTop from './ScrollTop';
import { getMasterBanner, getSingleBanner } from '../Apis globals/HomepageApi';
export default function Products() {
    let url = decodeURIComponent(window.location.href.split('/').pop().replaceAll(".", "/").replaceAll("-", " "))
    const [images, setImages] = useState([
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/34da8c2d1bec1851.jpg?q=20" },
        { url: "https://rukminim1.flixcart.com/flap/750/350/image/208c836282c59f1e.jpeg?q=20" },
    ]);
    const ProductTopData = [
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
        { name: 'Fresh Fruits', img: 'Images/corn.png' },
        { name: 'Fresh Vegetables', img: 'Images/corn.png' },
        { name: 'Herbs & Flowers', img: 'Images/corn.png' },
    ]
    const ProductTop = (dat) => {
        return <div className="ProductPageTopCard">
            <img src={dat.data.img}></img>
            <div className="ProductPageTopCardName">{dat.data.name}</div>
        </div>
    }
    const [productCardData, setCartData] = useState([
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: 'Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
    ])
    useEffect(() => {
        document.getElementsByClassName('CartPopUthop')[0].style.display = 'block'
        document.getElementsByClassName('CartPopUthop')[0].style.bottom = 60
        // getMasterBanner(url).then(e => {
        //     console.log(e)
        getSingleBanner(url).then(e => {
            console.log(e)
            setImages([...e])
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
            <div className="ProductPageCards">
                <div style={{ marginLeft: '3px' }} className='commonHeading'>popular products in your society</div>
                {productCardData.map((item, index) => {
                    return <ProductLongCard Odata={productCardData} setData={setCartData} index={index} data={item} />
                })}
            </div>
            <ScrollTop />
        </div>
    )
}

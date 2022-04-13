import React, { useState } from 'react'
import ProductLongCard from './CommonComponents/ProductLongCard'
import Top from './CommonComponents/Top'
import ScrollTop from './ScrollTop'
export default function Products3() {
    const [productCardData, setCartData] = useState([
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: true, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
        { isInCart: false, img: '/Images/corn.png', brand: 'SURF EXCEL', incart: 2, name: 'Excel Matic Frontload Det Liquid', quantity: '500 ML', price: '120' },
    ])
    const labels = [
        'Fresh Vegetables', 'Milk & curd', 'Herbs & Flowers', 'Fresh Fruits', 'Salt, Sugar & Jaggery'
    ]
    let name = decodeURIComponent(window.location.href.split('/').pop())
    return (
        <div className='ProductsPage2'>
            <Top head={name} />
            <div style={{ backgroundColor: 'rgba(232, 232, 232, 0.439)', height: '10px' }} className=""></div>
            <div className=" PIs2 product3">
                {labels.map(label => {
                    return <div className="PI2 product3PI2">{label}</div>
                })}
            </div>
            {productCardData.map((item, index) => {
                return <ProductLongCard Odata={productCardData} setData={setCartData} index={index} data={item} />
            })}
            <div style={{ height: 100, backgroundColor: 'rgba(232, 232, 232, 0.439)' }} className=""></div>
            <ScrollTop />
        </div>
    )
}

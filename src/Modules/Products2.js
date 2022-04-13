import React, { useState } from 'react'
import ProductLongCard from './CommonComponents/ProductLongCard'
import Top from './CommonComponents/Top'
import ScrollTop from './ScrollTop'
export default function Products2() {
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
    return (
        <div className='ProductsPage2'>
            <Top head='Popular in Your Society' />
            <div className="PIs2">
                {labels.map(label => {
                    return <div className="PI2">{label}</div>
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

import React, { useState, useEffect } from 'react'
import ProductLongCard from './CommonComponents/ProductLongCard'
import Top from './CommonComponents/Top'
import ScrollTop from './ScrollTop'
import { getSingleData } from '../Apis globals/SingleProductsAPI'
import { getCartData } from '../Apis globals/cartAPI'
export default function Products2(prop) {
    let url = decodeURIComponent(window.location.href.split('/').pop().replaceAll(".", "/").replaceAll("-", " "))
    const [productCardData, setCartData] = useState([])
    const labels = JSON.parse(localStorage.getItem('labels'))
    let masterCart = getCartData()
    useEffect(() => {
        getSingleData(url).then(e => {
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
                    id: i._id
                })
            }
            console.log(temp)
            setCartData([...temp])
        })
    }, [])
    return (
        <div className='ProductsPage2'>
            <Top head={url} />
            <div className="PIs2">
                {labels.map(label => {
                    return <div className="PI2">{label}</div>
                })}
            </div>
            {productCardData.map((item, index) => {
                return <ProductLongCard setItems={prop.setItems} setPrice={prop.setPrice} Odata={productCardData} setData={setCartData} index={index} data={item} />
            })}
            <div style={{ height: 100, backgroundColor: 'rgba(232, 232, 232, 0.439)' }} className=""></div>
            <ScrollTop />
        </div>
    )
}

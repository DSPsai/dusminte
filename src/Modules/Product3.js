import React, { useEffect, useState } from 'react'
import { getCartData } from '../Apis globals/cartAPI'
import { getHomeViewall } from '../Apis globals/CartRecommend'
import { RecommendedCall } from '../Apis globals/HomepageApi'
import { getPopularProducts } from '../Apis globals/popularProducts'
import ProductLongCard from './CommonComponents/ProductLongCard'
import Top from './CommonComponents/Top'
import ScrollTop from './ScrollTop'
export default function Products3(prop) {
    const [productCardData, setCartData] = useState([])
    let masterCart = getCartData()
    const labels = [
        // 'Fresh Vegetables', 'Milk & curd', 'Herbs & Flowers', 'Fresh Fruits', 'Salt, Sugar & Jaggery'
    ]
    let name = decodeURIComponent(window.location.href.split('/').pop())
    useEffect(() => {
        getHomeViewall(name == 'SALE' ? 'sale' : name == 'Popular in your society' ? 'pop' : 'rec').then(e => {
            let temp = []
            console.log(e)
            for (let i of e) {
                temp.push({
                    isInCart: masterCart[i._id] != undefined ? true : false,
                    img: i.image,
                    brand: i.brand,
                    incart: masterCart[i._id] != undefined ? masterCart[i._id].quantity : 0,
                    name: i.name,
                    quantity: i.unit,
                    price: i.price,
                    off: i.priceDiscount,
                    stock: i.quantity,
                    cprice: i.priceDiscounted,
                    id: i._id
                })
            }
            console.log(temp)
            setCartData([...temp])
        })
    }, [])
    return (
        <div className='ProductsPage2'>
            <Top head={name} />
            <div style={{ backgroundColor: 'rgba(232, 232, 232, 0.439)', height: '10px' }} className=""></div>
            <div className=" PIs2 product3">
                {labels.map(label => {
                    return <div className="PI2 product3PI2">{label}</div>
                })}
            </div>
            {productCardData.length > 0 ? productCardData.map((item, index) => {
                return <ProductLongCard setItems={prop.setItems} setPrice={prop.setPrice} Odata={productCardData} setData={setCartData} index={index} data={item} />
            }) : Array.from(Array(9).keys()).map((item) => (
                <div class="card">
                    <div class="card__image loading"></div>
                    <div class="card__title loading"></div>
                    <div class="card__description loading"></div>
                </div>
            ))}
            <div style={{ height: 100, backgroundColor: 'rgba(232, 232, 232, 0.439)' }} className=""></div>
            <ScrollTop />
        </div>
    )
}

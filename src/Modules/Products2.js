import React, { useState, useEffect } from 'react'
import ProductLongCard from './CommonComponents/ProductLongCard'
import Top from './CommonComponents/Top'
import ScrollTop from './ScrollTop'
import { getSingleData } from '../Apis globals/SingleProductsAPI'
import { getCartData } from '../Apis globals/cartAPI'
import { useNavigate } from 'react-router-dom'
import { getPopularProducts } from '../Apis globals/popularProducts'
export default function Products2(prop) {
    let url = decodeURIComponent(window.location.href.split('/').pop().replaceAll(".", "/").replaceAll("-", " "))
    const [productCardData, setCartData] = useState([])
    const labels = JSON.parse(localStorage.getItem('labels'))
    let masterCart = getCartData()
    const call = () => {
        url = decodeURIComponent(window.location.href.split('/').pop().replaceAll(".", "/").replaceAll("-", " "))
        if (localStorage.getItem('isBanner')) {
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
                        stock: i.quantity,
                        price: i.price,
                        off: i.priceDiscount,
                        cprice: i.priceDiscounted,
                        id: i._id
                    })
                }
                console.log(temp)
                setCartData([...temp])
            })
            localStorage.removeItem('isBanner')
        }
        else {
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
                        stock: i.quantity,
                        price: i.price,
                        off: i.priceDiscount,
                        cprice: i.priceDiscounted,
                        id: i._id
                    })
                }
                console.log(temp)
                setCartData([...temp])
            })

        }
    }
    useEffect(() => {
        console.log('trigger')
        call()
    }, [])
    const go = useNavigate()
    return (
        <div className='ProductsPage2'>
            <Top head={url} />
            <div className="PIs2">
                {labels.map(label => {
                    return <div onClick={() => {
                        setCartData([])
                        go(`/SingleProducts/${label.replaceAll("/", ".").replaceAll(" ", "-")}`);
                        call()
                    }} className={url == label ? "PI2 PI2H" : "PI2"}>{label}</div>
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

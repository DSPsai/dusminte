// const bol = JSON.parse(localStorage.getItem('CartData')) != null ? true : false
import axios from "axios"
var data = JSON.parse(localStorage.getItem('CartData'))
export const getCartData = () => {
    return data == null ? {} : data
}
export const setCartData = (dat) => {
    data = dat;
    localStorage.setItem('CartData', JSON.stringify(dat))
    console.log(data)
}
export const getCartItems = async () => {
    let ids = []
    for (let i in data) {
        if (data[i].name != undefined)
            ids.push(data[i].name)
    }
    console.log(ids)
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: {
            "operation": "listProductAllTypes",
            "params": {
                "storeId": JSON.parse(localStorage.getItem('UserData')).communityId.inventoryStoreId,
                "products": ids
            }
        },
        headers: {
            'Authentication': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    }).then(response => {
        return response.data.data
    }).catch(err => {
    })
}
const coupons = []
export const getCoupons = async () => {
    return await axios({
        method: "post",
        url: `http://13.235.141.2:8000`,
        data: {
            "operation": "couponList",
            "params": {
                "cartValue": JSON.parse(localStorage.getItem('CartData')).totalPrice
            }
        },
        headers: {
            'Authentication': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    }).then(response => {
        return response.data.data
    }).catch(err => {
    })
}
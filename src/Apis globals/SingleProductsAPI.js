import axios from "axios"
var singleData = []
export const getSingleData = async (cat) => {
    // if (singleData.length == 0) {
    return APItemplate({
        "operation": "productListByCategory",
        "params": {
            "filter": {
                "search": ""
            },
            "category": cat.toUpperCase(),
            "storeId": JSON.parse(localStorage.getItem('UserData')).communityId.inventoryStoreId
        }
    }).then(e => { return e })
    // } else {
    //     return singleData
    // }
}
const APItemplate = async (body) => {
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: body,
        headers: {
            'Authentication': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    }).then(response => {
        console.log(response.data)
        singleData = response.data.data
        return response.data.data
    }).catch(err => {
    })
}
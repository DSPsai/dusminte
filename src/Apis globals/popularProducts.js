import axios from "axios";
var Data = {}
let communityId = JSON.parse(localStorage.getItem('UserData')) == undefined ? "" : JSON.parse(localStorage.getItem('UserData')).communityId._id
// communityId = communityId == undefined ? "" : communityId
export const getPopularProducts = async (here) => {
    if (Data[here] == undefined) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "getPopularProductsByCategory",
                "params": {
                    "storeId": JSON.parse(localStorage.getItem('UserData')).communityId.inventoryStoreId,
                    "category": [here]
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log(response.data)
            Data[here] = response.data.data
            return response.data.data
        }).catch(err => {
        })
    } else {
        console.log(Data)
        return [...Data[here]]
    }
}

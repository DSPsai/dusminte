import axios from "axios";
var Data = []
export const getRecommend = async () => {
    if (Data.length == 0) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "cartRecommendedProducts",
                "params": {
                    "storeId": JSON.parse(localStorage.getItem('UserData')).communityId.inventoryStoreId
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log(response.data)
            Data = response.data.data
            return response.data.data
        }).catch(err => {
        })
    } else {
        console.log(Data)
        return [...Data]
    }
}
/*
{
    "operation" : "listAllProductByTags",
    "params" : {
        "storeId" : "1003",
        "tag" : ["pop"]
    }
}
*/
var aData = {}
var labels = []
export const getHomeViewall = async (cat) => {
    console.log(cat);
    console.log(aData[cat])
    if (aData[cat] == undefined) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "listAllProductByTags",
                "params": {
                    "storeId": JSON.parse(localStorage.getItem('UserData')).communityId.inventoryStoreId,
                    "tag": [cat]
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            try {
                for (let i of response.data.data.categories) {
                    labels.push({ name: i.name, highLight: false })
                }
            } catch (er) { }
            aData[cat] = response.data.data.data
            return response.data.data.data
        }).catch(err => {
        })
    } else {
        return aData[cat]
    }
}
export const getLabels = async () => {
    return labels
}
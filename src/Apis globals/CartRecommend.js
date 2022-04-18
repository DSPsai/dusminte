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
                    "storeId": "1003"
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

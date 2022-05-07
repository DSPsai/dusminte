import axios from "axios";
import { toast } from "react-toastify";
var Data = {}
let communityId;
try {
    communityId = JSON.parse(localStorage.getItem('UserData')) == undefined ? "" : JSON.parse(localStorage.getItem('UserData')).communityId._id
} catch (er) {
    toast.error(`Kindly complete your profile in app`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}
// communityId = communityId == undefined ? "" : communityId
export const getPopularProducts = async (here) => {
    try {
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
    } catch (er) {
        toast.error(`Kindly complete your profile in app`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
}

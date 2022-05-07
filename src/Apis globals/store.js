import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

var product = []
export const getSavedProducts = () => {
    return product
}
export const setSaveProducts = (set) => {
    product = set
}

var couponData = ""
export const couponDataAPI = async (dat) => {
    couponData["params"]["cart"]["couponName"] = dat
    await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: couponData,
        headers: {
            'Authentication': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    }).then(response => {
        toast.error(response.data.data.couponMessage.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        if (response.data.data.couponMessage.success)
            localStorage.setItem('coupon', dat)
    }).catch(er => {
        toast.error(`Server Busy`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    })
}
export const setCouponApi = (dat) => {
    couponData = dat
}
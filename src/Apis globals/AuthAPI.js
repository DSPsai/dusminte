import axios from "axios"
import { toast } from "react-toastify"

export const Authentication = async () => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL1}`,
    data: {
      "operation": "userLoginMobile",
      "params": {
        "mobile": "7760838386"
      }
    },
  }).then(async response => {
    localStorage.setItem("access", response.data.data.userData.token)
    if (response.data.data.userData.user._id != undefined)
      return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: {
          "operation": "userDetail",
          "params": {
            "userId": response.data.data.userData.user._id
          }
        },
        headers: {
          'Authentication': `Bearer ${response.data.data.userData.token}`,
          'Accept': 'application/json'
        },
      }).then(async response => {
        // localStorage.setItem("access", response.data.data.userData.token)
        localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
        if (response.data.data == null)
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        return response.data.data.user
      }).catch(e => {
        console.log(e)
      })
    // localStorage.setItem("UserData", JSON.stringify(response.data.data.userData.user))
    // return response.data.data.userData.user
  }).catch(e => {
    console.log(e)
  })
}

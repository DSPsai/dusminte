import axios from "axios"

export const Authentication = async () => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL1}`,
    data: {
      "operation": "userLoginMobile",
      "params": {
        "mobile": "6303125378"
      }
    },
  }).then(async response => {
    localStorage.setItem("access", response.data.data.userData.token)
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL1}`,
      data: {
        "operation": "userDetail",
        "params": {
          "userId": response.data.data.user._id
        }
      },
    }).then(async response => {
      // localStorage.setItem("access", response.data.data.userData.token)
      localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
      return response.data.data.user
    }).catch(e => {
      console.log(e) })
    localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
    return response.data.data.user
  }).catch(e => { 
    console.log(e)})
}

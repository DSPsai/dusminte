import axios from "axios"

export const Authentication = async () => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL1}`,
    data: {
      "operation": "userLoginAdmin",
      "params":
      {
        "email": "admin@dusminute.com",
        "password": "aDm1n@nk202!",
        "deviceToken": ""
      }
    },
  }).then(async response => {
    localStorage.setItem("access", response.data.data.token)
    localStorage.setItem("UserData", JSON.stringify(response.data.data.user))
    return response.data.data.user
  }).catch(e => { })
}

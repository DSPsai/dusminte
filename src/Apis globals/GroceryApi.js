import axios from "axios";
var Data = []
export const getGrocery = async () => {
    if (Data.length == 0) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "categoryList",
                "params": {
                    "filter": {
                        "search": ""
                    }
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

var sData = []
export const getsGrocery = async (cat) => {
    console.log(cat)
    if (sData[cat] == undefined) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "categoryList",
                "params": {
                    "filter": {
                        "search": ""
                    }
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            // console.log(response.data)
            let temp = {}
            for (let i of response.data.data) {
                let lab = i.category.name;
                temp[lab] = i.subCategories;
            }
            console.log(temp)
            sData = temp
            return temp[cat]
        }).catch(err => {
        })
    } else {
        console.log(sData[cat])
        return sData[cat]
    }
}

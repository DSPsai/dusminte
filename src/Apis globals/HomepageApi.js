import axios from "axios"
var HomePageByCommunityData = ""
export const HomePageByCommunity = async () => {
    return await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL1}`,
        data: {
            "operation": "homeSectionByCommunityCityId",
            "params": {
                "cityId": 1,
                "communityId": 1004
            }
        },
        headers: {
            'Authentication': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    }).then(response => {
        // console.log(response.data.data[1].tile)
        HomePageByCommunityData = [...response.data.data[1].tile]
        return response.data.data[1].tile
    }).catch(err => {
    })
}
export const getHomePageData = async () => {
    // console.log(HomePageByCommunityData)
    if (HomePageByCommunityData.length == 0) {
        return await HomePageByCommunity().then(asd => { return asd })
    } else {
        return HomePageByCommunityData
    }
}
let Recommended = {}
export const RecommendedCall = async (cat) => {
    if (Recommended[cat] == null) {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "listProductByTags",
                "params": {
                    "storeId": "1003",
                    "tag": [cat]
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            Recommended[cat] = response.data.data.data
            return response.data.data.data
            // HomePageByCommunityData = response.data.data[1].tile
            // return response.data.data[1].tile
        }).catch(err => {
        })
    } else {
        return Recommended[cat]
    }
}
var banner = []
export const getBanner = async () => {
    if (banner.length == 0)
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "bannerListPublished",
                "params": {
                    "screenType": "homepage"
                }
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            banner = response.data.data
            return response.data.data
            // HomePageByCommunityData = response.data.data[1].tile
            // return response.data.data[1].tile
        }).catch(err => {
        })
    else return banner
}
//All banner get id and place in down api
var masterBanner = {}
export const getMasterBanner = async (cat) => {
    if (masterBanner[cat] == undefined)
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL1}`,
            data: {
                "operation": "masterCategoryListAll",
            },
            headers: {
                'Authentication': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        }).then(response => {
            let temp = {}
            for (let i of response.data.data) {
                let name = i.categories[0].split(/[\s,]+/)[0].toLowerCase()
                let id = i._id
                temp[name] = id
            }
            console.log(temp)
            console.log(cat)
            masterBanner = temp
            return temp[cat]
        }).catch(err => {
            console.log(err)
        })
    else return masterBanner[cat]
}
//single page banner fetch api
var singleBanner = []
export const getSingleBanner = async (id) => {
    id = id.split(/[\s,]+/)[0].toLowerCase()
    console.log(singleBanner, id, masterBanner)
    if (singleBanner[id] == undefined) {
        return await getMasterBanner(id).then(async e => {
            console.log(e)
            return await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL1}`,
                data: {
                    "operation": "bannerListPublished",
                    "params": {
                        "screenType": `essentials-${e}`
                    }
                },
                headers: {
                    'Authentication': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                },
            }).then(response => {
                let temp = []
                for (let i of response.data.data) {
                    temp.push({ url: i.image })
                }
                singleBanner[id] = { images: temp }
                return temp
            }).catch(err => {
            })
        })

    }
    else return singleBanner[id].images
}
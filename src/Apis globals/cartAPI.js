// const bol = JSON.parse(localStorage.getItem('CartData')) != null ? true : false
var data = JSON.parse(localStorage.getItem('CartData'))
export const getCartData = () => {
    return data == null ? {} : data
}
export const setCartData = (dat) => {
    data = dat;
    localStorage.setItem('CartData', JSON.stringify(dat))
}
import store from '../../store.js'
import { updateCartInfo } from '../cartfooter/Cart.jsx'

let addItemToCart = (itemId) => {
  let data = new FormData()
  data.append("itemId", itemId)
  fetch("http://localhost:4000/addCartItem", { method: "POST", credentials: 'include', body: data }).then(headers => {
    return headers.text()
  }).then(body => {
    let result = true
    if (result) {
      updateCartInfo()
    }
  })
}

export default addItemToCart
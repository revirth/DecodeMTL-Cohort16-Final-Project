import { updateCartInfo } from '../cartfooter/Cart.jsx'
import checkUserSession from  '../login/CheckUserSession'

const addItemToCart = (itemId) => {
  let data = new FormData()
  data.append("itemId", itemId)
  let status = -1;
  fetch("/cart/addItem", { method: "POST", credentials: 'include', body: data }).then(headers => {
    status = headers.status;
    return headers.text()
  }).then(body => {
    let result = JSON.parse(body)
    if (status === 200) {
    if (result.successful) {
      updateCartInfo()
    }
  } else {
    alert("Error code: " + status + " " + result);
    checkUserSession()
  }
  })
}

export default addItemToCart
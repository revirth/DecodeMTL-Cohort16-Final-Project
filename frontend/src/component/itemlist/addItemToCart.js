import store from '../../store.js'

let addItemToCart = ( itemId ) => {
    let data = new FormData()
    data.append("itemId", itemId)
      fetch("http://localhost:4000/addCartItem", { method: "POST", body: data}).then( headers => {
        return headers.text()
      }).then( body => {
        let result = true
        if(result){
          fetch("http://localhost:4000/cartItems", { method: "GET" }).then(headers => {
             return headers.text();
                                                                                      }).then(body => {
      store.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
                                                                                                      })
        }
      })
} 

export default addItemToCart
import {
    createStore
} from "redux"
let reducer = (state, action) => {
    if (action.type === "query") {
        return {
            ...state,
            searchQuery: action.q
        }
    }

    return state
}

const store = createStore(
    reducer, {
        searchQuery: ""

    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
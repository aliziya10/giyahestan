import {combineReducers, createStore} from "redux";

// Root Reducers
const rootReducer = combineReducers({

});
// Store
export const store = createStore(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
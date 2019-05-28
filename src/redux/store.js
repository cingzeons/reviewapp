import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import api from "./middleware/api";
import rootReducer from "./modules";

let store;

/**
 * 判断 是不是 开发环境或者是生产环境
 * 使用中间件
 * @type {any}
 */
/*if( process.env.NODE_ENV !== "production" &&  window.__REDUX_DEVTOOLS_EXTENSION__){
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
} else {
    let store = createStore(rootReducer, applyMiddleware(thunk));
}*/

if( process.env.NODE_ENV !== "production" &&  window.__REDUX_DEVTOOLS_EXTENSION__){
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, api));
}

export default store;


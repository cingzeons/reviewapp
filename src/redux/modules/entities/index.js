import { combineReducers } from "redux";
import products from "./products";
import shops from "./shops";
import orders from "./orders";
import comments from "./comments";

// 合并领域状态(引入的模块进行合并)
const rootReducer = combineReducers({
    products,
    shops,
    orders,
    comments
});

export default rootReducer;


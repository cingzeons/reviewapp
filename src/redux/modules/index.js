import { combineReducers } from "redux";
import entities from "./entities";
import app from "./app";
import home from "./home";
import detail from "./detail";

/**
 * 合并成根 reducer
 * @type {Reducer<any>}
 */
const rootReducers = combineReducers({
    entities,
    home,
    detail,
    app
});

export default rootReducers;
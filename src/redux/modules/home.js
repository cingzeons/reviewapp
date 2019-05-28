import { combineReducers } from "redux";
import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { schema } from "./entities/products"

// 猜你喜欢的数据 定义一个常量
export const params = {
    PATH_LIKES: "likes",
    PATH_DISCOUNTS: "discounts",
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNTS: 3,
};

/**
 * 获取猜你喜欢请求
 * @type {{FETCH_LINKES_REQUEST: string, FETCH_LINKES_FAILURE: string, FETCH_LINKES_SUCCESS: string}}
 */
export const types = {
    FETCH_LINKES_REQUEST: "HOME/FETCH_LINKES_REQUEST", // 获取猜你喜欢请求
    FETCH_LINKES_SUCCESS: "HOME/FETCH_LINKES_SUCCESS", // 获取猜你喜欢请求 成功
    FETCH_LINKES_FAILURE: "HOME/FETCH_LINKES_FAILURE", // 获取猜你喜欢请求 失败
    FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST", // 获取超值特惠请求
    FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS", // 获取超值特惠请求 成功
    FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE", // 获取超值特惠请求 失败
};

// zeon 吉恩

const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: [],
    },
    discounts: {
        isFetching: false,
        ids: [],
    }
};

/**
 *
 * @type {{loadLikes: (function(): Function)}}
 */
export const actions = {
    // 加载猜你喜欢的数据
    loadLikes: () => {
        return (dispatch, getState) => {
            const { pageCount } = getState().home.linkes;
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
            const endpoint = url.getProductList(params.PAGE_SIZE_LIKES,  rowIndex, params.PAGE_SIZE_LIKES);
            return dispatch(fetchLikes(endpoint));
        }
    },
    // 加载特惠商品
    loadDiscounts: () => {
        return (dispatch, getState) => {

            const endpoint = url.getProductList(params.PAGE_SIZE_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
            return dispatch(fetchDiscounts(endpoint));
        }
    }
};

const fetchLikes = (endpoint, params) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LINKES_REQUEST,
            types.FETCH_LINKES_SUCCESS,
            types.FETCH_LINKES_FAILURE,
        ],
        endpoint,
        schema,
    }
});


const fetchDiscounts = (endpoint, params) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNTS_REQUEST,
            types.FETCH_DISCOUNTS_SUCCESS,
            types.FETCH_DISCOUNTS_FAILURE,
        ],
        endpoint,
        schema,
    }
});


/*const fetchLinkesRequest = () => ({
    type: types.FETCH_LINKES_FAILURE
});
const fetchLinkesSuccess = (data) => ({
    type: types.FETCH_LINKES_SUCCESS,
    data,
});
const fetchLinkesFailuret = (error) => ({
    type: types.FETCH_LINKES_FAILURE,
    error,
});*/


/**
 * 猜你喜欢 reducer
 * @param state
 * @param action
 * @returns {*}
 */
const likes = (state= initialState.linkes, action) => {
    switch(action.type){
        case types.FETCH_LINKES_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_LINKES_SUCCESS:
            return {...state, isFetching: false, pageCount: state.pageCount + 1, ids:state.ids.concat(action.response.ids)};
        case types.FETCH_LINKES_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
};

/**
 * 特惠商品 reducer
 * @param state
 * @param action
 * @returns {*}
 */
const discounts = (state= initialState.discounts, action) => {
    switch(action.type){
        case types.FETCH_DISCOUNTS_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_DISCOUNTS_SUCCESS:
            return {...state, isFetching: false, ids:state.ids.concat(action.response.ids)};
        case types.FETCH_DISCOUNTS_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
};


/**
 * 合并 reducers
 * @type {Reducer<any>}
 */
const reducer = combineReducers({
    discounts,
    likes,
});

export default reducer;
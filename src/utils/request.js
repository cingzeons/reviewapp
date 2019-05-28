const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
});

/**
 * GET 请求
 * @param url
 * @returns {Promise<Response>}
 */
function get(url){
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then(response => {
        handleResponse(url, response);
    }).catch(err => {
        // 网络连接断开时，打印异常
        console.error(`Request failed. Url = ${url}. Message=${err}`);
        return Promise.reject({
            error: {
                message: "Request failed!"
            }
        });
    });
}

/**
 * POST 请求
 * @param url
 * @param data
 */
function post(url, data){
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: data
    }).then(response => {
        handleResponse(url, response);
    }).catch(err => {
        // 网络连接断开时，打印异常
        console.error(`Request failed. Url = ${url}. Message=${err}`);
        return Promise.reject({
            error: {
                message: "Request failed!"
            }
        });
    });
}

/**
 * 处理 response 的方法
 * @param data
 */
function handleResponse(url, response){
    if(response.status === 200){
        return response.json();
    } else {
        console.error(`Request failed. Url = ${url}`);
        return Promise.reject({
            error: {
                message: "Request failed due to server error!"
            }
        });
    }
}

export {get, post};

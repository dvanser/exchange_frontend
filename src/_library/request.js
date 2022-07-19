import config from '../config';
import { toJson, parseStatus } from './responseParser';


function prepareRequestOptions(data, method = 'GET', headers = null, credentials = 'include') {

    if (headers === null) {
        headers = {'Content-Type': 'application/json'}
    }

    if(localStorage.getItem(config.accessTokenName)) {
        //TODO: michael: take care about user object in app state, load user data if token set, but user object does not exist
        headers['Authorization'] = 'Bearer ' + localStorage.getItem(config.accessTokenName);
    }

    let options = {
        method: method,
        headers: headers
    };

    // if (credentials !== null) {
    //     options['credentials'] = credentials;
    // }

    if (data !== null) {
        options['body'] = JSON.stringify(data);
    }

    return options;
}

function request(url, method, data = null) {
    const requestOptions = prepareRequestOptions(data, method);
    let link = config.baseUrl +  url;

    return fetch(link, requestOptions)
        .then(toJson)
        .then(parseStatus);
}

export function get(url) {
    return request(url, 'GET');
}

export function post(url, data) {
    return request(url, 'POST', data);
}

export function patch(url, data) {
    return request(url, 'PATCH', data);
}
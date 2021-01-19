import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_PRODUCTION_SERVER_URL
});

instance.interceptors.request.use(function (config) {
    config.baseURL = process.env.REACT_APP_PRODUCTION_SERVER_URL;
    if (document.cookie) {
        var re = new RegExp("AUTH-TOKEN=([^;]+)");
        var value = re.exec(document.cookie);
        const token = (value != null) ? unescape(value[1]) : null;
        if (token) { config.headers.auth_token = token }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
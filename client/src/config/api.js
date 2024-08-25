import axios from "axios";

const BaseUrl = "http://localhost:4000/api";

const api = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    } else {
        console.log('login first then access this');
    }

    return config
}, (error) => { return Promise.reject(error) });

export { api, BaseUrl }
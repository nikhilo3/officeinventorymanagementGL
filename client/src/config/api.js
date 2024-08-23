import axios from "axios";

const BaseUrl = "http://localhost:4000/api";

const api = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export { api, BaseUrl }
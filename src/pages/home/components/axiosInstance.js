import axios from "axios";

const API_KEY = 'a7c71da888fc8a010a3a0a91aa1c8c4a';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL : BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${API_KEY}`;
        config.params = config.params || {};
        config.params['api_key'] = API_KEY;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 401)
            console.log('login');
        else if (error.response)
            console.log(error.response.data.message || error.message);
        else
            console.log(error.message);

        return Promise.reject(error);
    }
)


export default axiosInstance;
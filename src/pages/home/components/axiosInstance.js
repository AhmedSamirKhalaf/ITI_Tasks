import axios from "axios";

const BASE_URL = '';

const axiosInstance = axios.create({
    baseURL : BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = ''
    },
    (error) => {
        return Promise.reject(error);
    }
)




axiosInstance.interceptors.response.use(
    (response) => {

    },
    (error) => {
        if(error.response.status === 401)
            console.log('login');
        else 
            console.log(error.response.message);

        return Promise.reject(error);
    }
)


export default axiosInstance;
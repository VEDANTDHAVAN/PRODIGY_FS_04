import axios from "axios";
import config from '../config/config';

const axiosInstance = axios.create({
    baseURL: config.VITE_API_URL,
    headers: {
        "Authorization": `bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance
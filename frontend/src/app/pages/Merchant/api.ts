

import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    
    // Ensure headers exist before modifying them
    // if (!config.headers) {
    //     config.headers = {};  
    // }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;


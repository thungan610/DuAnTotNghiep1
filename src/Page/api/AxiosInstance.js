import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.69:6677'
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = ''; 
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
        
        return config;
    },
    err => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
);

export default axiosInstance;

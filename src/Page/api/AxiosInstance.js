import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://server-vert-rho-94.vercel.app'
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

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api-h89c.onrender.com/'
});

// cmd -----> ipconfig -----> IPv4 Address (192.168.1.1)
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = ''; // Lưu token nếu cần
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json' // Có thể thiết lập mặc định
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

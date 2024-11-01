import axios from 'axios';

const AxiosInstanceSP = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        // baseURL: 'http://192.168.202.113:3001'
        baseURL: 'http://192.168.1.43:6677/'
    });
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = ''; 
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstanceSP;
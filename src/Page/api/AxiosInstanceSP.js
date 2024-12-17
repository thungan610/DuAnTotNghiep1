import axios from 'axios';

const AxiosInstanceSP = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'https://server-vert-rho-94.vercel.app'
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
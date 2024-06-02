import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
    })

    axiosSecure.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem('userToken');
        console.log(token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function (error) {
        const status = error.response?.status;
        console.log(error.response);
        // if (status) {
        //     await logOut()
        //     navigate('/login')
        // }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
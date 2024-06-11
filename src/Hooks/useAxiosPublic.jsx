import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://echo-mall-server.vercel.app',
    })
    return axiosPublic;
};

export default useAxiosPublic;
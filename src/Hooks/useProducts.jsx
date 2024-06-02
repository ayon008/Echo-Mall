import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: products = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['Products'],
        queryFn: () =>
            axiosPublic.get(`/data`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { products, isPending, isLoading, refetch }
};

export default useProducts;
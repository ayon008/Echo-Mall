import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: cart = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            axiosSecure.get(`/ProductAddToCart?email=${user.email}`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { cart, isPending, isLoading, refetch }
};

export default useCart;
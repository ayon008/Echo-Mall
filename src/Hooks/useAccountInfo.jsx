import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAccountInfo = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: userDetails, isPending, isLoading, refetch } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () =>
            axiosSecure.get(`/user/${user?.uid}`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { userDetails, isPending, isLoading, refetch }
};

export default useAccountInfo;
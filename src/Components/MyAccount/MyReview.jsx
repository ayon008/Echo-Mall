import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyReview = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['reviewsByEmail'],
        queryFn: () =>
            axiosPublic.get(`/data`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return (
        <div>

        </div>
    );
};

export default MyReview;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../Loader/Loader";
import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const axiosPublic = useAxiosPublic();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () =>
            axiosPublic.get(`/categories`)
                .then(response => {
                    return response.data;
                })
    })

    const array = [1, 2, 3, 4, 5, 6, 7];

    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#F5F5F5] myContainer my-4 md:py-4 py-2 px-1 rounded-md">
            <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
                Categories
            </h1>
            <div className="grid grid-cols-7 w-full gap-0">
                {
                    !isLoading ?
                        <>
                            {
                                categories?.map(category => {
                                    return (
                                        <div key={category?._id} onClick={() => navigate(`/products/${category?.name}`)}>
                                            <div className="border h-[200px] p-5 text-center bg-white hover:shadow-xl hover:-translate-y-2 duration-300">
                                                <img src={category?.image} className="w-[100px] h-[100px] mx-auto" alt="" />
                                                <p>{category?.name}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                            {
                                array.map(a => {
                                    return (
                                        <ContentLoader
                                            key={a}
                                            speed={2}
                                            height={200}
                                            viewBox="0 0 200 200"
                                            backgroundColor="#ecebeb"
                                            foregroundColor="white"
                                            className="p-5"
                                        >
                                            {/* Image placeholder */}
                                            <rect x="50" y="30" rx="5" ry="5" width="100" height="100" />
                                            {/* Text placeholder */}
                                            <rect x="25" y="150" rx="4" ry="4" width="150" height="20" />
                                        </ContentLoader>
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Categories;


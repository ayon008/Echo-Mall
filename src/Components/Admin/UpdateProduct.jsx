import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../Loader/Loader';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const data = useLoaderData();
    const { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC, quantity } = data;
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("image", data.Doc_1_PC[0]);
        // Upload the image to ImgBB using axios
        const response = await axios.post(
            "https://api.imgbb.com/1/upload",
            formData,
            {
                params: {
                    key: "9a38563b80c5197bc652b9f720cb5b06",
                },
            }
        );
        data.Doc_1_PC = response.data.data.url;
        console.log(response.data.data.url);
        const formData2 = new FormData();
        formData2.append("image", data.Doc_2_PC[0]);

        // Upload the image to ImgBB using axios
        const response2 = await axios.post(
            "https://api.imgbb.com/1/upload",
            formData2,
            {
                params: {
                    key: "9a38563b80c5197bc652b9f720cb5b06",
                },
            }
        );

        // Update the data with the uploaded image URL
        data.Doc_2_PC = response2.data.data.url;
        console.log(response2.data.data.url);
        const formData3 = new FormData();
        formData3.append("image", data.Doc_3_PC[0]);

        // Upload the image to ImgBB using axios
        const response3 = await axios.post(
            "https://api.imgbb.com/1/upload",
            formData3,
            {
                params: {
                    key: "9a38563b80c5197bc652b9f720cb5b06",
                },
            }
        );

        // Update the data with the uploaded image URL
        data.Doc_3_PC = response3.data.data.url;
        axiosSecure.patch(`/data/${id}`, data)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    navigate('/dashboard')
                }
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h3 className="text-center mt-20 text-3xl">Update Products</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] bg-slate-100 bg-gradient-to-r from-[#460eef] to-[#8d94d6] text-white mx-auto my-20 border-2 p-4 rounded-md shadow-md">
                {/* <DashboardInfoText title={'Add New Product'} /> */}
                <div className='flex gap-x-4'>
                    <section className='w-[50%] flex flex-col gap-y-[44px]'>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Product Name
                            </label>
                            <input
                                type="text"
                                value={Product_Name}
                                {...register('Product_Name', { required: true })}
                                placeholder="Product Name"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>

                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Brand Name
                            </label>
                            <input
                                type="text"
                                value={Brand_Name}
                                {...register('Brand_Name', { required: true })}
                                placeholder="Brand Name"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>

                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Product Code (If Available)
                            </label>
                            <input
                                type="text"
                                value={Description}
                                {...register('Product_Code')}
                                placeholder="Product Code"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Price
                            </label>
                            <input
                                type="number"
                                value={Price}
                                {...register('Price', { required: true })}
                                placeholder="Price"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Price Without Discount
                            </label>
                            <input
                                type="number"
                                value={Price_Without_Discount}
                                {...register('Price_Without_Discount', { required: true })}
                                placeholder="Price Without Discount"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Commission
                            </label>
                            <input
                                type="number"
                                value={Commission}
                                {...register('Commission', { required: true })}
                                placeholder="Commission (%)"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>
                    </section>
                    <section className='w-[50%] flex flex-col gap-y-5'>
                        <div className="">
                            <label className="block mb-1 font-medium">Product Description</label>
                            <textarea
                                value={Product_Description}
                                {...register("Product_Description", { required: true })}
                                placeholder="Type Your Product Description"
                                className="form-textarea w-full h-40 bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                            />
                        </div>

                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Available Sizes
                            </label>
                            <input
                                value={Available_Size}
                                type="text"
                                {...register('Available_Size')}
                                placeholder="Available Size"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>

                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Enter Color Variants
                            </label>
                            <input
                                value={Color_Variants}
                                type="text"
                                {...register('Color_Variants', { required: true })}
                                placeholder="Color Variants"
                                className="form-input w-full bg-[#fff] text-slate-600 py-3 rounded-md"
                            />
                        </div>

                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Product Picture 1
                            </label>
                            <input type="file" {...register('Doc_1_PC', { required: true })} className="file-input w-full bg-[#fff] text-slate-600" />
                        </div>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Product Picture 2
                            </label>
                            <input type="file" {...register('Doc_2_PC', { required: true })} className="file-input w-full bg-[#fff] text-slate-600" />
                        </div>
                        <div className="...">
                            <label className="block mb-1 font-medium">
                                Product Picture 3
                            </label>
                            <input type="file" {...register('Doc_3_PC', { required: true })} className="file-input w-full bg-[#fff] text-slate-600" />
                        </div>
                    </section>
                </div>
                <button type="submit" className="block btn text-white w-full px-4 py-3 text-xl font-bold awesome-btn rounded-md border-2 border-black bg-blue-950 hover:scale-105 duration-200 mt-3">Update</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const VITE_IMAGE_UPLOAD = import.meta.env.VITE_IMG_TOKEN;
const Dashboard = () => {
    const { register, handleSubmit } = useForm();

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Create a temporary URL for the selected image
            const imageUrl = URL.createObjectURL(file);

            // Update the state with the temporary URL
            setSelectedImage(imageUrl);
        }
    };
    const onSubmit = async (data) => {
        const imageFiles = data.image;

        try {
            const promises = Array.from(imageFiles).map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("key", VITE_IMAGE_UPLOAD);

                const response = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData
                );
                return response.data.data.display_url;
            });

            const uploadedImageUrls = await Promise.all(promises);

            const { ProductTitle, Brand, Price, DiscountPrice, Quantity, DiscountPercent, Description, Color, productCode, productSize, } = data;
            const summerItems = { ProductTitle, Brand, Price, DiscountPrice, Quantity, DiscountPercent, Description, Color, productCode, productSize, image: uploadedImageUrls, };

            const currentTime = new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            const currentDate = new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            const postDateTime = `${currentDate}, ${currentTime}`;

            axios
                .post(`${import.meta.env.VITE_DataHost}/data`, {
                    ...summerItems,
                    datetime: postDateTime,
                })
                .then((data) => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Product added",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        } catch (error) { }
    };

    return (
        <div>
            <>
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-[800px] bg-slate-100 bg-gradient-to-r from-[#460eef] to-[#8d94d6] text-white mx-auto my-20 border-2 p-4 rounded-md shadow-md"
                    >
                        {/* <DashboardInfoText title={'Add New Product'} /> */}
                        <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">
                                    Enter Product Title
                                </label>
                                <input
                                    type="text"
                                    {...register("ProductTitle")}
                                    placeholder="Product Title"
                                    required
                                    className="form-input w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>

                            {/* <div className="mb-2">
              <label className="block mb-1 font-medium">
                Product Image Upload*
              </label>
              <input type="file" required {...register('pImg')} className="file-input w-full max-w-xs bg-[#fff] text-slate-600" multiple />
            </div> */}

                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Brand</label>
                                <input
                                    type="text"
                                    {...register("Brand")}
                                    placeholder="Brand"
                                    required
                                    className="form-input w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Price</label>
                                <input
                                    type="number"
                                    {...register("Price")}
                                    placeholder="Price"
                                    required
                                    className="form-input w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Discount Price</label>
                                <input
                                    type="number"
                                    {...register("DiscountPrice")}
                                    placeholder="Discount Price"
                                    required
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Quantity</label>
                                <input
                                    type="number"
                                    {...register("Quantity")}
                                    placeholder="Quantity"
                                    required
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5 "
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">
                                    Discount Percent
                                </label>
                                <input
                                    type="number"
                                    {...register("DiscountPercent")}
                                    placeholder="  Discount Percent"
                                    required
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5 "
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Color</label>
                                <input
                                    type="text"
                                    {...register("Color")}
                                    placeholder="Color"
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5 "
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Product Code</label>
                                <input
                                    type="text"
                                    {...register("productCode")}
                                    placeholder="Product Code"
                                    required
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5 "
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Product Size</label>
                                <input
                                    type="text"
                                    {...register("productSize")}
                                    placeholder="Product Size"
                                    className="form-input  w-full max-w-xs bg-[#fff] text-slate-600 py-3 rounded-md pl-5 "
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    {...register("Description")}
                                    placeholder="Type Your Product Description"
                                    required
                                    className="form-textarea w-full max-w-xs h-40 bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Multiple Product Images Upload
                                </label>
                                <div>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="file-input file-input-bordered file-input-info w-full max-w-xs mb-5"
                                        {...register("image", { required: true })}
                                        multiple
                                    />
                                    {selectedImage && <img className="w-[80px] h-[80px]" src={selectedImage} alt="Selected" />}
                                </div>
                            </div>
                        </div>

                        <input
                            className="w-full bg-blue-500 text-base-100 p-3 cursor-pointer"
                            type="submit"
                        />
                    </form>
                </div>
            </>
        </div>
    );
};

export default Dashboard;

import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../Components/Loader/Loader';
import Swal from 'sweetalert2';
const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      if (data.Doc_1_PC[0]) {
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

        // Update the data with the uploaded image URL
        data.Doc_1_PC = response.data.data.url;
        // console.log(response);
      } else {

        data.Doc_1_PC = ""

      }
      if (data.Doc_2_PC[0]) {
        const formData = new FormData();
        formData.append("image", data.Doc_2_PC[0]);

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

        // Update the data with the uploaded image URL
        data.Doc_2_PC = response.data.data.url;
        // console.log(response);
      } else {

        data.Doc_2_PC = ""

      }
      if (data.Doc_3_PC[0]) {
        const formData = new FormData();
        formData.append("image", data.Doc_3_PC[0]);

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

        // Update the data with the uploaded image URL
        data.Doc_3_PC = response.data.data.url;
        // console.log(response);
      } else {

        data.Doc_3_PC = ""

      }
      axios.post(`${import.meta.env.VITE_DataHost}/data`, data)
        .then((result) => {
          if (result.data.insertedId) {
            setLoader(false)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Added",
              showConfirmButton: false,
              timer: 1500
          });
            reset();
          }
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    } catch (error) {
      console.log("Error uploading images:", error.message);
    }
  };


  if (loader) {
    return <Loader />
  }

  return (
    <>
      <div>
        <h3 className="text-center text-3xl mt-20">Add Product</h3>
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
                  {...register('Product_Name')}
                  placeholder="Product Name"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                />
              </div>

              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Brand Name
                </label>
                <input
                  type="text"
                  {...register('Brand_Name')}
                  placeholder="Brand Name"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"

                />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Category
                </label>
                <select
                  {...register('category', { required: 'This field is required' })}
                  className="select select-bordered w-full text-black"
                >
                  <option value="Smartwatches">Smartwatches</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Cables and Converters">Cables and Converters</option>
                  <option value="Wall Charger">Wall Charger</option>
                  <option value="Wardrove Organizer">Wardrove Organizer</option>
                  <option value="Trimmers">Trimmers</option>
                  <option value="Chinos">Chinos</option>
                  <option value="Art & Craft">Art & Craft</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Books & Stationery">Books & Stationery</option>
                  <option value="Musical Instruments">Musical Instruments</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Jewelry & Watches">Jewelry & Watches</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Product Code (If Available)
                </label>
                <input
                  type="text"
                  {...register('Product_Code')}
                  placeholder="Product Code"

                  className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Price
                </label>
                <input
                  type="number"
                  {...register('Price')}
                  placeholder="Price"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Price Without Discount
                </label>
                <input
                  type="number"
                  {...register('Price_Without_Discount')}
                  placeholder="Price Without Discount"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Commission
                </label>
                <input
                  type="number"
                  {...register('Commission')}
                  placeholder="Commission (%)"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                />
              </div>

            </section>
            <section className='w-[50%]  flex flex-col gap-y-5'>
              <div className="">
                <label className="block mb-1 font-medium">Product Description</label>
                <textarea
                  {...register("Product_Description")}
                  placeholder="Type Your Product Description"
                  className="form-textarea w-full h-40 bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                />
              </div>



              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Available Sizes
                </label>
                <input
                  type="text"
                  {...register('Available_Size')}
                  placeholder="Available Size"
                  className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                />
              </div>

              <div className="...">
                <label className="block mb-1 font-medium">
                  Enter Color Variants
                </label>
                <input
                  type="text"
                  {...register('Color_Variants')}
                  placeholder="Color Variants"
                  className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                />
              </div>

              <div className="...">
                <label className="block mb-1 font-medium">
                  Product Picture 1
                </label>
                <input type="file" {...register('Doc_1_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Product Picture 2
                </label>
                <input type="file" {...register('Doc_2_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
              </div>
              <div className="...">
                <label className="block mb-1 font-medium">
                  Product Picture 3
                </label>
                <input type="file" {...register('Doc_3_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
              </div>
            </section>
          </div>
          <button type="submit" className="block w-full px-4 py-3 text-xl font-bold awesome-btn rounded-md  border-2 border-black bg-blue-950 hover:scale-105 duration-200 mt-3" >Add new Product</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard
import React, { useContext, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const Chackout = () => {

  const data = useLoaderData();
  const { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC } = data;

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const cardData = { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC, quantity, email: user?.email };
  console.log(cardData);

  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <Loader />
    )
  }

  const handleAddToCart = () => {
    setLoading(true);
    console.log(cardData);
    axiosSecure.post('/ProductAddToCart', cardData)
      .then(response => {
        console.log(response);
        if (response.data.insertedId || response.data.modifiedCount) {
          setLoading(false);
          Swal.fire({
            position: "Center",
            icon: "success",
            title: "SuccessFully Added",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }


  return (
    <section className='md:max-w-[1220px] mx-auto px-3 md:px-0'>
      <section className='flex justify-center pt-6'>
        <div className='flex flex-col mx-1 md:mx-0  md:flex-row gap-x-6'>
          <div className='flex justify-center'>
            <div className='w-[330px]'>
              <Carousel showArrows={true}>
                <div>
                  <img className='md:rounded-[0px]' src={Doc_1_PC && Doc_1_PC} alt="" />
                </div>
                <div>
                  <img className='md:rounded-[0px]' src={Doc_2_PC && Doc_2_PC} alt="" />
                </div>
                <div>
                  <img className='md:rounded-[0px]' src={Doc_3_PC && Doc_3_PC} alt="" />
                </div>
              </Carousel>
            </div>
          </div>
          <div className='py-6 md:py-0'>
            <p className='md:text-[22px] text-[15px] text-[#212121] md:max-w-[650px] font-semibold text-justify'>{Product_Name}</p>
            <div className='flex gap-x-3 mt-5'>
              <p><span className='text-[#444] text-[14px]'>Brand:</span> <span className='text-[#1a9cb7] cursor-pointer text-[14px]'>{Brand_Name && Brand_Name}</span></p>
              <p><span className='text-[#444] text-[14px]'>Code:</span> <span className='text-[#1a9cb7] cursor-pointer text-[14px]'>{Product_Code && Product_Code}</span></p>
            </div>
            <div className='flex flex-col md:flex-row gap-x-3 '>
              <p><span className='text-[#444] text-[14px]'>Available Size:</span> <span className='text-[#1a9cb7] cursor-pointer text-[14px]'>{Available_Size && Available_Size}</span></p>
              <p><span className='text-[#444] text-[14px]'>Color Varient:</span> <span className='text-[#1a9cb7] cursor-pointer text-[14px]'>{Color_Variants && Color_Variants}</span></p>
            </div>
            <div className='md:mt-3 mt-1 md:w-[650px]'>
              <div>
                <p>Additional Details :</p>
                <p className='text-[#1a9cb7] cursor-pointer text-[14px] text-justify'>{Product_Description && Product_Description}</p>
              </div>
            </div>
            <div className='pt-5'>
              <p className='text-primaryColor1 text-[18px]  md:text-[29px] font-normal'>৳ {Price && Price}</p>
              <p className="text-[13px]"><span className="line-through text-slate-400">ট{Price_Without_Discount && Price_Without_Discount} </span><span className="pl-1"> -{Commission}%</span> </p>
            </div>
            <div class="">
              <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-2 btn" onClick={handleDecrement}>-</span>
              <input className='text-center w-[10%] mx-3' type="text" value={quantity} />
              <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-1 btn" onClick={handleIncrement}>+</span>
            </div>

            <div className='flex gap-x-3 pt-6'>
              <Link to={`/shipping/${_id}`} state={{ quantity }}><button className='text-white bg-[#2abbe8] md:px-[87px] px-[29px] md:py-[9.5px] py-[8px] rounded-[1.8px] hover:scale-105 duration-50000 transition-all'>Buy Now</button></Link>
              <button onClick={handleAddToCart} className='text-white bg-[#f57224] md:px-[87px] px-[22px] md:py-[9.5px] py-[8px] rounded-[1.8px] hover:scale-105 duration-50000 transition-all'>Add To Cart</button>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
export default Chackout




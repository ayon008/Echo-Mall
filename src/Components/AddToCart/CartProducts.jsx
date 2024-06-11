import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CartProducts = ({ cartItem, refetch }) => {
    const { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC, quantity } = cartItem;
    const axiosSecure = useAxiosSecure();
    const [value, setValue] = useState(quantity);
    const [loading, setLoading] = useState(false);
    
    const handleIncrement = () => {
        setValue(value + 1);
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    };
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            setLoading(true);
            if (result.isConfirmed) {
                axiosSecure.delete(`/ProductAddToCart/${id}`)
                    .then(response => {
                        console.log(response);
                        if (response.data.deletedCount > 0) {
                            setLoading(false)
                            refetch();
                            Swal.fire({
                                position: "Center",
                                icon: "success",
                                title: "Deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
            }
        });
    }

    useEffect(() => {
        axiosSecure.patch(`/ProductAddToCart/${_id}`, { quantity: value })
        refetch()
    }, [value])

    if (loading) {
        return (
            <Loader></Loader>
        )
    }

    return (
        <div key={cartItem?._id} className="grid bg-white p-2 gap-4 grid-cols-custom">
            <div>
                <img className="w-[100px] h-[100px]" src={Doc_1_PC} alt="" />
            </div>
            <div>
                <p className="text-lg">{Product_Name}</p>
                <p className="text-xs text-gray-400">{Brand_Name}</p>
            </div>
            <div>
                <div className='pt-5'>
                    <p className='text-primaryColor1 text-[18px]  md:text-[29px] font-normal'>৳ {Price && Price}</p>
                    <p className="text-[13px]"><span className="line-through text-slate-400">ট{Price_Without_Discount && Price_Without_Discount} </span><span className="pl-1"> -{Commission}%</span> </p>
                </div>
                <div class="">
                    <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-2" onClick={handleDecrement}>-</span>
                    <input className='text-center w-[10%] mx-3' type="text" value={value} />
                    <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-1" onClick={handleIncrement}>+</span>
                </div>
            </div>
            <button onClick={() => handleDelete(_id)} className="btn w-fit text-red-500"><FaTrash /></button>
        </div>
    )
};

export default CartProducts;
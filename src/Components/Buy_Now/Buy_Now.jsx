import React, { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAccountInfo from '../../Hooks/useAccountInfo';
import Loader from '../Loader/Loader';
import Payment from '../Payment/Payment';

const Buy_Now = () => {
    const data = useLoaderData();
    const { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC } = data;

    const [charge, setCharge] = useState(60);
    console.log(charge);
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'DJI') {
            setCharge(60);
        } else if (selectedValue === 'Parrot') {
            setCharge(120);
        }
    };
    const { userDetails, isLoading } = useAccountInfo();
    const navigate = useNavigate();

    const Handle_Adds = (event) => {
        event.preventDefault();
        document.getElementById('my_modal_3').showModal()
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='md:max-w-[1220px] mx-auto px-2 md:px-0 pt-5 md:pt-0'>
            <form onSubmit={Handle_Adds}>
                <section className='flex flex-col md:flex-row justify-between md:gap-x-4 gap-y-5'>
                    <section className='md:w-[50%] bg-slate-0 md:p-4 bg-white'>
                        <p className='text-center text-[18px] py-7'>
                            To confirm the order, enter your name, address, mobile number, and click on the{' '}
                            <span className='text-primaryColor1'>confirm order</span> button
                        </p>
                        <section className='flex flex-col gap-y-4'>
                            <p className='text-[18px] text-center md:text-left mt-10'>Your Details</p>
                            <div className='pt-5 md:gap-x-4 gap-x-2'>
                                <h3 className="text-3xl font-semibold">{userDetails?.name}</h3>
                                <p>Mobile : {userDetails?.mobileNumber}</p>
                                <p>Address : {userDetails?.address}</p>
                            </div>
                            <hr className='mt-3 border-t-2' />
                            <input
                                type='submit'
                                value='Order Now'
                                className='w-full py-3 bg-orange-500 rounded-[3px] cursor-pointer'
                            />
                            <Link className="text-xs" to="/myAccount">
                                To change your address & details please go to <span className="text-orange-600">My Account</span> page
                            </Link>
                        </section>
                    </section>
                    <section className='md:w-[50%] bg-white md:p-4 md:pt-0 py-4 md:py-0'>
                        <p className='text-[18px] text-center md:text-left mt-10'>Your Order</p>
                        <div className='flex justify-between items-center pt-5 md:gap-x-4 gap-x-2'>
                            <div className='w-[20%]'><img className='w-[90px] h-[60px] md:w-[80px] md:h-[80px] rounded-[2px]' src={Doc_1_PC} alt="" /></div>
                            <div className='w-[70%] font-serif text-[10.5px] md:text-[14px]'>{Product_Name}</div>
                            <div className='w-[10%] text-right'><p>TK</p> <p>{Price}</p></div>
                        </div>
                        <hr className='mt-3 border-t-2' />
                        <div className='flex gap-y-2 flex-col mt-10'>
                            <div className='flex justify-between'>
                                <p className='font-bold'>Total:</p>
                                <p className='font-bold'><span className='font-semibold'>TK</span> {Price}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>Delivery charge:</p>
                                <p className='font-bold text-orange-600'><span className='font-semibold'>TK</span> {charge}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-bold text-[18px]'>Total:</p>
                                <p className='font-bold text-[19.2px]'>TK {Price + charge}</p>
                            </div>
                        </div>
                    </section>
                </section>
            </form>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <Payment singlePrice={Price + charge} />
                </div>
            </dialog>
        </div>
    )
}

export default Buy_Now
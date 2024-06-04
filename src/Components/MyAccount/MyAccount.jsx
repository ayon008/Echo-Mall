import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import useAccountInfo from "../../Hooks/useAccountInfo";

const MyAccount = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { userDetails, isPending, isLoading, refetch } = useAccountInfo();
    
    const onSubmit = (data) => {
        axiosSecure.patch(`/user/${user?.uid}`, data)
            .then(response => {
                reset()
                refetch()
                Swal.fire({
                    title: "Updated Successfully",
                    text: "",
                    icon: "success"
                });
                console.log(response.data);
            })
    };

    return (
        <div className="myContainer">
            <section className='flex flex-col md:flex-row justify-between md:gap-x-4 gap-y-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='md:w-[50%] bg-slate-0 md:p-4 bg-white'>
                    <section>
                        <p className='text-center text-[18px] py-7'>To update your details please click on <span className='text-primaryColor1'>update details</span> button</p>
                        <section className='flex flex-col gap-y-4'>
                            <div>
                                <p className='pl-[5px]'>Your Name</p>
                                <input
                                    required
                                    className='w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1'
                                    placeholder='Enter Your Name'
                                    type="text"
                                    {...register('name', { required: true })}
                                />
                            </div>
                            <div>
                                <p className='pl-[5px]'>Your Mobile Number</p>
                                <input
                                    required
                                    className='w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1'
                                    placeholder='Enter Your Mobile Number'
                                    type="text"
                                    {...register('mobileNumber', { required: true })}
                                />

                            </div>
                            <div>
                                <p className='pl-[5px]'>Your Full Address</p>
                                <input
                                    required
                                    className='w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1'
                                    placeholder='Enter Your Full Address'
                                    type="text"
                                    {...register('address', { required: true })}
                                />

                            </div>
                            <input type="submit" value="Update Details" className='w-full py-3 bg-orange-500 rounded-[3px] cursor-pointer' />
                        </section>
                    </section>
                </form>
                <section className='md:w-[50%] bg-white md:p-4 md:pt-0 py-4 md:py-0'>
                    <p className='text-[18px] text-center md:text-left mt-10'>Your Details</p>
                    <div className='pt-5 md:gap-x-4 gap-x-2'>
                        <h3 className="text-3xl font-semibold">{userDetails?.name}</h3>
                        <p>Mobile : {userDetails?.mobileNumber}</p>
                        <p>Address : {userDetails?.address}</p>
                    </div>
                    <hr className='mt-3 border-t-2' />
                </section>
            </section>
        </div>
    );
};

export default MyAccount;
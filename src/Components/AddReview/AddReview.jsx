import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Rating from "react-rating";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Contexts/AuthProvider';
import Swal from 'sweetalert2';

const AddReview = () => {
    const data = useLoaderData();
    const { _id, Product_Name, Description, Brand_Name, Product_Code, Price, Price_Without_Discount, Available_Size, Color_Variants, Commission, Product_Description, Doc_1_PC, Doc_2_PC, Doc_3_PC, quantity } = data;
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosPublic();

    const [value, setValue] = useState(0);
    const handleOnclick = value => {
        setValue(value);
    }

    const onSubmit = data => {
        if (value === 0) {
            alert('Please add ratings');
            return
        }
        axiosSecure.post(`/review/${_id}`, { ...data, value, email: user?.email, _id: _id })
            .then(response => {
                reset();
                Swal.fire({
                    position: "Center",
                    icon: "success",
                    title: "Done",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
                console.log(response.data);
            })
        console.log(data);
    };

    return (
        <div className="bg-white w-3/4 my-20 ms-20 p-4">
            <div className="grid bg-white p-2 gap-4 grid-cols-custom  border border-gray-400">
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
                </div>
            </div>
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6">
                    <h3>Select Product Rating</h3>
                    <div className="w-fit mx-auto my-4">
                        <Rating onChange={(value) => handleOnclick(value)} emptySymbol={<FontAwesomeIcon icon={faStar} color="#ccc" />}
                            fullSymbol={<FontAwesomeIcon icon={faStar} color="#FFD700" />} />
                    </div>
                </div>
                <textarea
                    className='bg-[#F8FAFC] w-full border-2 border-black rounded p-2'
                    rows="6"
                    name="review"
                    id="review"
                    {...register("review", { required: true })}
                ></textarea>
                <input
                    className='mt-2 btn text-white bg-orange-600 hover:text-orange-600 hover:bg-white hover:border-orange-600'
                    value={"Add Review"}
                    type='submit'
                />
            </form>
        </div>
    );
};

export default AddReview;
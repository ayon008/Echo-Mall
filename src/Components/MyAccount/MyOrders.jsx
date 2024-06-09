import { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: payments = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: () =>
            axiosSecure.get(`/payments?email=${user.email}`)
                .then(response => {
                    return response.data;
                })
    })

    const navigate = useNavigate();

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='w-3/4 mx-auto my-20'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map(payment => {
                                const id = payment.transactionId;
                                return (
                                    <>
                                        {
                                            payment?.products?.map((product, i) => {
                                                console.log(product);
                                                return (
                                                    <tr key={i}>
                                                        <th>
                                                            {i + 1}
                                                        </th>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={product?.Doc_1_PC} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{product.Product_Name}</div>
                                                                    <div className="text-sm opacity-50">{product.Brand_Name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {product.quantity}
                                                        </td>
                                                        <td>{product?.Price * product.quantity}</td>
                                                        <td>confirmed</td>
                                                        <td>pending</td>
                                                        <td>{id}</td>
                                                        <td><button onClick={() => navigate(`/addReview/${product._id}`)} className='btn text-white bg-orange-600 hover:text-orange-600 hover:bg-white hover:border-orange-600'>Add Review</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
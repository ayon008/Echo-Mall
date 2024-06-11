import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const ActiveOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allOrders = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: () =>
            axiosSecure.get(`/allOrders`)
                .then(response => {
                    return response.data;
                })
    })
    console.log(allOrders);

    const handleUpdate = (productId, paymentId) => {
        axiosSecure.patch(`/allOrders/${paymentId}?productId=${productId}`, { deliveryStatus: true })
        .then(response=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Done",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        })
    }

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className='w-3/4 mx-auto my-20'>
            {
                allOrders.length > 0 &&
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
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
                                allOrders?.map(order => {
                                    const paymentId = order._id;
                                    return (
                                        order.products.map((product, i) => {
                                            const deliveryStatus = product.deliveryStatus;
                                            const productId = product._id;
                                            return (
                                                <tr key={i}>
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
                                                    <td>{!deliveryStatus ? <span className='bg-red-400 text-white p-2'>pending</span> : <span className='bg-green-400 text-white p-2'>Delivered</span>}</td>
                                                    <td>{order.transactionId}</td>
                                                    <td><button disabled={deliveryStatus} onClick={() => handleUpdate(productId, paymentId)} className='btn rounded-full bg-green-400 text-white'>Delivered</button></td>
                                                </tr>
                                            )
                                        })
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default ActiveOrders;
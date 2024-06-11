import React from 'react';
import useProducts from '../../Hooks/useProducts';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const { products, isPending, isLoading, refetch } = useProducts();
    const axiosSecure = useAxiosSecure();
    console.log(products);
    const handleDelete = id => {
        axiosSecure.delete(`/data/${id}`)
            .then(response => {
                if (response.data.deletedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }
    const navigate = useNavigate();
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Commission</th>
                            <th>Price without commission</th>
                            <th>update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => {
                                return (
                                    <tr>
                                        <td>{product.Product_Name}</td>
                                        <td>{product.Price}</td>
                                        <td>{product.Commission}</td>
                                        <td>{product.Price_Without_Discount}</td>
                                        <td><button onClick={() => navigate(`${product._id}`)} className='btn bg-green-400 text-white'><FaEdit /></button></td>
                                        <td><button onClick={() => handleDelete(product._id)} className='btn bg-red-400 text-white'><FaTrash /></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
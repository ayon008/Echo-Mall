import useCart from "../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import CartProducts from "./CartProducts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = () => {
    const { cart, isPending, isLoading, refetch } = useCart();
    refetch();
    const total = cart.reduce((sum, cartItem) => sum + parseFloat(cartItem.Price) * parseInt(cartItem.quantity), 0);
    const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
    const length = cart.length;
    const navigate = useNavigate('');
    const axiosSecure = useAxiosSecure();

    const deleteCart = () => {
        axiosSecure.delete('/ProductAddToCart')
            .then(response => {
                console.log(response.data.deletedCount);
                refetch();
                Swal.fire({
                    position: "Center",
                    icon: "success",
                    title: "Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    if (isLoading) {
        return (
            <Loader></Loader>
        )
    }

    return (
        <>
            {
                length > 0
                    ?
                    <div className="md:grid grid-cols-custom-2 gap-6 md:p-10 p-2">
                        <div>
                            {
                                cart?.map(cartItem => {
                                    return (
                                        <CartProducts cartItem={cartItem} refetch={refetch} key={cartItem._id} />
                                    )
                                })
                            }
                        </div>
                        <div className="bg-white p-4">
                            <div>
                                <h1 className="text-lg">Order Summary</h1>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs my-2 text-gray-400">Subtotal ({totalItems}) Items</p>
                                    <p className="text-xs my-2 text-gray-400">{total}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs mb-2 text-gray-400">Shipping Fee :</span>
                                    <span className="text-xs mb-2 text-gray-400">৳60</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg">Total</span>
                                    <span className="text-lg">৳{total + 60}</span>
                                </div>
                                <button onClick={() => navigate('/shipping')} className="btn btn-outline text-orange-600 w-full mt-2 hover:bg-orange-600 hover:text-white hover:border-orange-600">Proceed To Buy</button>
                                <button onClick={() => deleteCart()} className="btn  hover:text-orange-600 hover:bg-white hover:border-orange-600 w-full mt-2 bg-orange-600 text-white ">Clear Cart <FaShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex h-[60vh] flex-col">
                        <div className="m-auto text-center">
                            <p className="text-lg">There are no items in this cart</p>
                            <button onClick={() => navigate('/')} className="btn btn-outline text-orange-600 w-full mt-6">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
            }
        </>
    )
};

export default AddToCart;
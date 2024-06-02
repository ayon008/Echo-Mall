import React from 'react';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

const JustForYou = () => {
    const { products } = useProducts();
    return (
        <div className="w-full bg-[#F5F5F5] myContainer my-4 md:py-4 py-2 px-1 rounded-md">
            <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
                Just For You
            </h1>
            <div className="">
                <div className="grid md:grid-cols-6 grid-cols-2 gap-6 py-10 cursor-pointer">
                    {/* Card */}
                    {products.slice(0, 18).map((product) => (
                        <Card key={product?._id} product={product}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JustForYou;
import { useLoaderData, useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import ServiceGuearanty from "../../Components/ServiceGuarenty/ServiceGuearenty";

const Products = () => {
    const products = useLoaderData()
    console.log(products);
    const length = products?.length;
    return (
        <div className="w-full">
            <ServiceGuearanty />
            <div className="w-3/4 mx-auto my-20">
                <div>
                    {
                        length > 0 ? <div className={`w-fit mx-auto grid md:grid-cols-3 grid-cols-2 gap-6`}>
                            {
                                products.map(data => {
                                    return (
                                        <>
                                            <Card key={data._id} product={data}></Card>
                                        </>
                                    )
                                })
                            }
                        </div>
                            :
                            <p className="text-center text-3xl">No Products available</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;
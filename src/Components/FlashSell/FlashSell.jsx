import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const FlashSell = () => {
  const { products, isLoading } = useProducts();
  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <div className="w-full bg-[#F5F5F5] myContainer my-4 md:py-4 py-2 px-1 rounded-md">
      <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
        Flash sell
      </h1>
      <div className="">
        <div className="w-full md:overflow-x-auto md:flex grid grid-cols-2 gap-4 py-10 cursor-pointer">
          {/* Card */}
          {products.map((product, i) => (
            <Card key={i} product={product}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSell;
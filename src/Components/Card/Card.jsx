import { Link } from 'react-router-dom';

const Card = ({ product }) => {
    return (
        <Link to={`/Chackout/${product?._id}`}>
            <div className="cursor-pointer h-[23em] md:w-[200px] bg-white border rounded-md p-3 shadow-md hover:-translate-y-2 transition-transform duration-300" key={product?._id.$oid}>
                <img
                    src={product?.Doc_2_PC} // Assuming you want to display the first image
                    alt="flash sell"
                    className="w-[8rem] mx-auto mb-2 rounded-[2px]"
                />

                <div className="space-y-2">
                    <h3 className="text-[12.2px] md:text-normal">
                        {product?.Product_Name.length > 70 ? product?.Product_Name.slice(0, 70) + '...' : product?.Product_Name}
                    </h3>

                    <h2 className="text-primaryColor1 text-[18px] md:text-xl font-semibold">
                        ট{product?.Price}{" "}
                    </h2>
                    <p className="text-lg">
                        <span className="line-through text-slate-400">
                            {product?.Price_Without_Discount}
                        </span>
                        {
                            product?.Commission && <span className=""> -{product?.Commission}%</span>
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
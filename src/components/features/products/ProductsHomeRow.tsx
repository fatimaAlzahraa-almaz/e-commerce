import { useGetAllProductsQuery } from "../../../app/service/productsApi";
import ProductCard from "./ProductCard";
import type { Product } from "./types/type";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LoadingProductCard from "../loading/LoadingProductCard";
import {motion} from 'motion/react'
const ProductsHomeRow = ({
  title,
  order,
  sort,
}: {
  title: string;
  order: string;
  sort: string;
}) => {
  const { data, isLoading } = useGetAllProductsQuery({
    skip: "0",
    order,
    sort,
  });
  console.log(data);
  const navigate = useNavigate();
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick = () => {
    scroll();
    navigate(`/products?skip=0&order=${order}&sortBy=${sort}`);
  };
  return (
    <motion.div
    initial={{y:20,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:1,delay:0.2}}
    viewport={{once:true}}
    className="flex flex-col gap-8 items-center px-2 sm:px-4 py-6 ">
      <div className="flex gap-4 sm:gap-8 flex-wrap relative">
        <p className="font-semibold  text-2xl text-gray-700">{title}</p>
        <button
          onClick={handleClick}
          className="flex items-center gap-1 sm:gap-2 cursor-pointer group"
        >
          <p className="text-green-500 group-hover:text-green-600">View more</p>
          <FaArrowRight className="fill-green-500 group-hover:fill-green-600" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-300 justify-items-center  ">
        {isLoading
          ? Array.from({ length: 4 }).map(
              (_, i: number) => i < 4 && <LoadingProductCard key={i} />,
            )
          : data?.products?.map(
              (el: Product, i: number) =>
                i < 4 && <ProductCard product={el} key={i} />,
            )}
      </div>
    </motion.div>
  );
};

export default ProductsHomeRow;


import {
  
  useGetAllProductsQuery,
} from "../app/service/productsApi";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../components/features/products/types/type";
import { useState, useEffect } from "react";
import ProductsGrid from "../components/features/products/ProductsGrid";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SortProducts from "../components/features/products/SortProducts";
import LoginNotification from "../components/features/notification/LoginNotification";
import { useAppSelector } from "../app/hooks/hooks";
const AllProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const skip = searchParams.get("skip") || "0";
  const sort = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "";
  const [page, setPage] = useState<number>(Number(skip) / 30 + 1);
  const showLoginNotification=useAppSelector((state)=>state.loginNotification.value);
  const { data, isLoading } = useGetAllProductsQuery({ skip, sort, order });
  const handleLowToHigh = () => {
    const sorted = products
      ? [...products].sort((a, b) => a.price - b.price)
      : undefined;
    setProducts(sorted);
    setVisibleMenu(false);
  };
  const handleHighToLow = () => {
    const sorted = products
      ? [...products].sort((a, b) => b.price - a.price)
      : undefined;
    setProducts(sorted);
    setVisibleMenu(false);
  };
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pagefunc = () => {
    var pages = [];
    const start = Math.max(page - 1, 1);
    const end = Math.min(page + 1, 7);
    for (var i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleLeftClick = () => {
    setSearchParams({ skip: String(Number(skip) - 30), sortBy: sort, order });
    setPage((prev) => prev - 1);
    scroll();
  };
  const handleRightClick = () => {
    setSearchParams({ skip: String(Number(skip) + 30), sortBy: sort, order });
    setPage((prev) => prev + 1);
    scroll();
  };
  const handlePageClick = (page: number) => {
    setSearchParams({ skip: String((page - 1) * 30), sortBy: sort, order });
    setPage(page);
    scroll();
  };

  useEffect(() => {
    setProducts(data?.products);
  }, [data]);

  return (
    <div className=" mt-18 flex flex-col items-center p-1 sm:p-2 min-h-[80vh] ">
      {showLoginNotification && <LoginNotification />}
      {visibleMenu && (
        <div
          onClick={() => setVisibleMenu(false)}
          className=" absolute top-0 bottom-0 w-full h-full  z-99"
        ></div>
      )}

      <div className="flex w-full justify-between items-center  text-gray-700 py-4 px-2 sm:p-4">
        <p className="font-medium  text-xl sm:text-2xl    ">All Products</p>
        <SortProducts
          setVisibleMenu={setVisibleMenu}
          visibleMenu={visibleMenu}
          handleHighToLow={handleHighToLow}
          handleLowToHigh={handleLowToHigh}
        />
      </div>
      <ProductsGrid products={products} loading={isLoading} />
      <div className="flex gap-2  items-center justify-center py-12 text-green-600 font-semibold">
        <button
          className="w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={handleLeftClick}
          disabled={skip === "0"}
        >
          <IoIosArrowBack className="w-6 h-6 fill-green-600  " />
        </button>
        {pagefunc().map((el: number, i: number) => (
          <button
            onClick={() => handlePageClick(el)}
            className={`${el === Number(skip) / 30 + 1 ? "bg-gray-300" : "bg-gray-100"}  text-center  rounded-3xl cursor-pointer  w-10 h-10 hover:bg-gray-300`}
            key={i}
          >
            {el}
          </button>
        ))}
        <button
          className="w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={handleRightClick}
          disabled={skip === "180"}
        >
          <IoIosArrowForward className="w-6 h-6 fill-green-600  " />
        </button>
      </div>
    </div>
  );
};

export default AllProductsPage;

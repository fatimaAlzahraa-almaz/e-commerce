import { useSearchParams } from "react-router-dom";
import { useGetSearchedProductsQuery } from "../app/service/productsApi";
import ProductsGrid from "../components/features/products/ProductsGrid";
import { useState, useEffect } from "react";
import type { Product } from "../components/features/products/types/type";
import SortProducts from "../components/features/products/SortProducts";
import LoginNotification from "../components/features/notification/LoginNotification";
import { useAppSelector } from "../app/hooks/hooks";
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const search = searchParams.get("q") || "";
  const showLoginNotification=useAppSelector((state)=>state.loginNotification.value);
  const { data, isLoading } = useGetSearchedProductsQuery(search);
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
  useEffect(() => {
    setProducts(data?.products);
  }, [data]);
  return (
    <div className="mt-18 p-1 sm:p-2 flex flex-col items-center min-h-[80vh]">
      {showLoginNotification && <LoginNotification />}
      {visibleMenu && (
        <div
          onClick={() => setVisibleMenu(false)}
          className=" absolute top-0 bottom-0 w-full h-full  z-99"
        ></div>
      )}

      <div className="flex w-full justify-between items-center  text-gray-700 py-4 px-2 sm:p-4">
        <p className="font-medium  sm:text-xl     ">
          {products?.length} Search Results for : {search}
        </p>
        <SortProducts
          setVisibleMenu={setVisibleMenu}
          visibleMenu={visibleMenu}
          handleHighToLow={handleHighToLow}
          handleLowToHigh={handleLowToHigh}
        />
      </div>
      {products?.length == 0 && (
        <p className="text-2xl sm:text-3xl  text-gray-700 text-center h-full w-full my-auto">
          Search result not found!
        </p>
      )}
      <ProductsGrid products={products} loading={isLoading} />
    </div>
  );
};

export default SearchPage;

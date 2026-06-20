import { useSearchParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../app/service/productsApi";
import ProductsGrid from "../components/features/products/ProductsGrid";
import { useState, useEffect } from "react";
import type { Product } from "../components/features/products/types/type";
import SortProducts from "../components/features/products/SortProducts";
import LoginNotification from "../components/features/notification/LoginNotification";
import { useAppSelector } from "../app/hooks/hooks";
const CategoryProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const category = searchParams.get("category") || "";
  const showLoginNotification=useAppSelector((state)=>state.loginNotification.value);
  const { data, isLoading } = useGetProductsByCategoryQuery(category);
 
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
    <div className="mt-18 flex flex-col items-center px-2 pb-8 min-h-[80vh]">
      {showLoginNotification && <LoginNotification />}
      {visibleMenu && (
        <div
          onClick={() => setVisibleMenu(false)}
          className=" absolute top-0 bottom-0 w-full h-full  z-99"
        ></div>
      )}

      <div className="flex w-full justify-between items-center  text-gray-700 py-4 px-2 sm:p-4">
        <p className="font-medium  text-xl sm:text-2xl    ">
          {category.charAt(0).toUpperCase() + category.slice(1)} products
        </p>
        <SortProducts
          setVisibleMenu={setVisibleMenu}
          visibleMenu={visibleMenu}
          handleHighToLow={handleHighToLow}
          handleLowToHigh={handleLowToHigh}
        />
      </div>
      <ProductsGrid products={products} loading={isLoading} />
    </div>
  );
};

export default CategoryProductsPage;

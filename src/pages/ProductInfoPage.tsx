import ProductInfoCard from "../components/features/products/ProductInfoCard";
import { useGetProductInfoQuery } from "../app/service/productsApi";
import { useParams } from "react-router-dom";
import ProductReview from "../components/features/products/ProductReview";
import type { Review } from "../components/features/products/types/type";
import { useState } from "react";
import LoadingPage from "../components/features/loading/LoadingPage";
import LoginNotification from "../components/features/notification/LoginNotification";
import { useAppSelector } from "../app/hooks/hooks";
const ProductInfoPage = () => {
  const [isDescreption, setIsDesription] = useState<boolean>(true);
  const { id } = useParams();
  const { data, isLoading } = useGetProductInfoQuery(id || "");
  const showLoginNotification=useAppSelector((state)=>state.loginNotification.value);
  return (
    <>
      {showLoginNotification && <LoginNotification />}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="mt-18 flex flex-col gap-16 p-3 sm:p-8 min-h-[80vh]">
          <ProductInfoCard data={data} />
          <div className="w-full lg:w-1/2">
            <div className="flex text-sm font-medium  w-full border-b border-b-gray-300">
              <button
                onClick={() => setIsDesription(true)}
                className={`p-2 cursor-pointer  ${isDescreption ? `border-b border-b-gray-600 font-medium text-gray-600` : `text-gray-400`}`}
              >
                Description
              </button>
              <button
                onClick={() => setIsDesription(false)}
                className={` p-2 cursor-pointer ${!isDescreption ? `border-b font-medium border-b-gray-600 text-gray-600` : `text-gray-400`}`}
              >
                Reviews
              </button>
            </div>
            <div className="flex flex-col gap-6 py-6">
              {isDescreption ? (
                <p className="text-sm text-gray-600">{data?.description}</p>
              ) : (
                data?.reviews?.map((el: Review, index: number) => (
                  <ProductReview data={el} key={index} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfoPage;

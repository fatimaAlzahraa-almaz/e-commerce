import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { IoEarthOutline } from "react-icons/io5";
import { AiOutlineSafety } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { useEffect, useState } from "react";
import type { Product } from "./types/type";
import { UserAuth } from "../../../app/context/AuthContext";
import LoadingSpiner from "../loading/LoadingSpiner";
import { addToCart,deleteFromCart } from "../../../app/features/cart/cartService";
import { useAppSelector } from "../../../app/hooks/hooks";
import { addToFavorits,deleteFromFavorites } from "../../../app/features/favorites/favoritesService";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { setError } from "../../../app/features/notification/errorNotificationSlice";
import { setLoginNotification } from "../../../app/features/notification/loginNotificationSlice";
const features = [
  {
    icon: <IoEarthOutline className="w-5 h-5 text-gray-400" />,
    description: "Free shipping worldwide",
  },
  {
    icon: <MdPayment className="w-5 h-5 text-gray-400" />,
    description: "100% Secured Payment",
  },
  {
    icon: <AiOutlineSafety className="w-5 h-5 text-gray-400" />,
    description: "Trusted by top brands",
  },
];
const ProductInfoCard = ({ data }: { data: Product }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<string>(data?.images[0]);
  const dispatch=useAppDispatch();
  const {
    user
  } = UserAuth();
   const cart=useAppSelector((state)=>state.cart.value);
   const favorites=useAppSelector((state)=>state.favorites.value);
  const [added, setAdded] = useState(
    cart?.some((item) => item?.id === data?.id),
  );
  const [favorite, setFavorite] = useState(
    favorites?.some((item) => item?.id === data?.id),
  );

  useEffect(() => {
    setImg(data?.images[0]);
  }, [data]);
  const handleAddToCartClick = async () => {
    if (!added)
      try {
        setLoading(true);
        await addToCart(data,user?.email??undefined);
        setAdded(true);
      } catch (err) {
        if (!user) dispatch(setLoginNotification(true));
        else dispatch(setError(true));
        console.log(err);
      } finally {
        setLoading(false);
      }
    else
      try {
        setLoading(true);
        await deleteFromCart(data.id,user?.email??undefined);
        setAdded(false);
      } catch (err) {
        dispatch(setError(true));
        console.log(err);
      } finally {
        setLoading(false);
      }
  };
  const handleHeartClick = async () => {
    if (!favorite)
      try {
        await addToFavorits(data,user?.email??undefined);
        setFavorite(true);
      } catch (err) {
        if (!user) dispatch(setLoginNotification(true));
        else dispatch(setError(true));
        console.log(err);
      }
    else
      try {
        await deleteFromFavorites(data.id,user?.email??undefined);
        setFavorite(false);
      } catch (err) {
        dispatch(setError(true));
        console.log(err);
      }
  };

  useEffect(() => {
    setFavorite(favorites?.some((item) => item.id === data.id));
    setAdded(cart?.some((item) => item.id === data.id));
  }, [user]);
  return (
    <div className=" flex flex-col lg:flex-row w-full gap-8">
      <div className="flex flex-col sm:flex-row  gap-4  sm:justify-start sm:min-w-1/3 ">
        <div className="aspect-square w-full  sm:max-w-110  rounded-xl">
          <img
            className="w-full h-full object-cover rounded-xl bg-gray-100"
            src={img}
          />
        </div>
        <div className="flex sm:flex-col   gap-4 min-w-20 sm:max-w-30 md:items-center sm:-order-1   ">
          {data?.images?.map(
            (el: string, index: number) =>
              index < 3 && (
                <div
                  className="aspect-square bg-gray-100 rounded-xl max-w-26 w-full"
                  key={index}
                >
                  <img
                    onClick={() => setImg(el)}
                    className=" w-full h-full object-cover hover:scale-109 transform duration-100 cursor-pointer active:scale-115"
                    src={el}
                  />
                </div>
              ),
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6  md:min-w-1/2 ">
        <div className="flex flex-col gap-6 border-b border-b-gray-200 pb-4">
          <p className="font-semibold text-2xl sm:text-3xl text-gray-800">
            {data?.title}
          </p>
          <div className="flex gap-2 text-sm text-gray-600 flex-wrap">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index: number) =>
                index + 1 <= Math.floor(data?.rating || 4) ? (
                  <FaStar key={index} className="w-4 h-4 fill-green-500 " />
                ) : (
                  <FaStar key={index} className="w-4 h-4 fill-gray-300" />
                ),
              )}
            </div>
            <p>{data?.reviews?.length} Reviews</p>
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            ${data?.price}
          </p>
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={handleAddToCartClick}
              className="bg-gray-800 py-3   rounded-sm text-white cursor-pointer w-30 sm:w-40 text-sm font-semibold hover:-translate-y-1 hover:transform hover:duration-200 hover:shadow-lg hover:ease-in-out active:scale-102 flex items-center justify-center"
            >
              {loading ? <LoadingSpiner /> : added ? "Added" : "Add to Cart"}
            </button>
            <button
              onClick={handleHeartClick}
              className="bg-gray-100 text-gray-600 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-200"
            >
              <FiHeart
                className={`w-6 h-6 ${favorite ? "fill-red-400 text-red-400" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col text-gray-600 gap-5 text-lg">
          {features.map((el, index: number) => (
            <div
              className="flex gap-2 items-center text-gray-500 text-base sm:text-lg"
              key={index}
            >
              {el.icon}
              {el.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;

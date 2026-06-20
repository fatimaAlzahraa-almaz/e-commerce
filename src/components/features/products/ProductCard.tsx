import { FiHeart } from "react-icons/fi";
import type { Product } from "./types/type";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../app/context/AuthContext";
import LoadingSpiner from "../loading/LoadingSpiner";
import { addToCart,deleteFromCart } from "../../../app/features/cart/cartService";
import { useAppSelector } from "../../../app/hooks/hooks";
import { addToFavorits,deleteFromFavorites } from "../../../app/features/favorites/favoritesService";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { setError } from "../../../app/features/notification/errorNotificationSlice";
import { setLoginNotification } from "../../../app/features/notification/loginNotificationSlice";
const ProductCard = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imgHover, setImgHover] = useState<boolean>(false);
  const dispatch=useAppDispatch();
  const {
    user
  } = UserAuth();
  const cart=useAppSelector((state)=>state.cart.value);
  const favorites=useAppSelector((state)=>state.favorites.value);
  const [like, setLike] = useState(
    product ? favorites?.some((item) => item.id === product.id) : false,
  );
  const [added, setAdded] = useState(
    product ? cart?.some((item) => item.id === product.id) : false,
  );
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imgUrl = product
    ? product?.images.length > 1
      ? product?.images[1]
      : product?.images[0]
    : "";
  const navigate = useNavigate();
  const handleClick = () => {
    scroll();
    navigate(`/productinfo/${product?.id}`);
  };
  const handleHeartClick = async () => {
    if (!like)
      try {
        await addToFavorits(product,user?.email??undefined);
        setLike(true);
      } catch (err) {
        if (!user) dispatch(setLoginNotification(true));
        else dispatch(setError(true));
        console.log(err);
      }
    else
      try {
        await deleteFromFavorites(product.id,user?.email??undefined);
        setLike(false);
      } catch (err) {
        dispatch(setError(true));
        console.log(err);
      }
  };
  const handleAddToCartClick = async () => {
    if (!added)
      try {
        setLoading(true);
        await addToCart(product,user?.email??undefined);
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
        await deleteFromCart(product.id,user?.email??undefined);
        setAdded(false);
      } catch (err) {
        dispatch(setError(true));
        console.log(err);
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    setLike(favorites?.some((item) => item.id === product.id));
    setAdded(cart?.some((item) => item.id === product.id));
  }, [user, product,favorites,cart]);
  return (
    <motion.div
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      className="flex flex-col bg-white aspect-2/3  w-full max-w-70 gap-1 rounded-xl p-2 sm:p-3 text-gray-600 border border-gray-200  relative "
    >
      <div
        onClick={handleHeartClick}
        className="absolute  top-2 bg-white p-1 right-2 rounded-bl-xl cursor-pointer z-1 "
      >
        <FiHeart
          className={`text-gray-500 ${like ? "fill-red-400 text-red-400" : ""} w-5 h-5 hover:scale-115 `}
        />
      </div>
      <div
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
        onClick={handleClick}
        className="w-full bg-gray-100 h-[70%] sm:h-[65%] rounded-xl relative cursor-pointer group "
      >
        <img
          src={imgUrl}
          className={` object-contain w-full h-full group-hover:scale-109  rounded-t-xl ${!imgHover ? "hidden" : "block"}  `}
        />

        <img
          src={product?.images[0]}
          className={` object-contain w-full h-full    rounded-t-xl ${imgHover ? "hidden" : "block"} `}
        />
      </div>
      <div className="flex flex-col sm:gap-1">
        <p className=" font-medium sm:text-lg line-clamp-1">{product?.title}</p>
        <p className="text-sm max-w-[30ch] truncate">{product?.description}</p>
        <div className="font-light max-w-full truncate text-sm flex items-baseline gap-1  ">
          {product?.tags?.map(
            (el: string, i: number) =>
              i < 3 && (
                <span key={i}>
                  {el}{" "}
                  <span className=" h-1 w-1 inline-block bg-gray-500  rounded-3xl"></span>
                </span>
              ),
          )}
        </div>
        <p className="font-medium sm:text-lg text-green-500">
          ${product?.price}
        </p>
      </div>
      <button
        onClick={handleAddToCartClick}
        className="border font-medium text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-center  w-full rounded-sm cursor-pointer py-0.5 sm:py-1 flex items-center justify-center"
      >
        {loading ? <LoadingSpiner /> : added ? "Added" : "Add To Cart"}
      </button>
    </motion.div>
  );
};

export default ProductCard;

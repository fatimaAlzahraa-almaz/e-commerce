import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import type { ProductWithCount } from "../products/types/type";
import { UserAuth } from "../../../app/context/AuthContext";
import { deleteFromCart,increaseCount,decreaseCount } from "../../../app/features/cart/cartService";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { setError } from "../../../app/features/notification/errorNotificationSlice";
const CartCard = ({ product }: { product: ProductWithCount }) => {
  const navigate = useNavigate();
  const dispatch=useAppDispatch();
  const { user } = UserAuth();
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleImgClick = () => {
    scroll();
    navigate("/productinfo/" + product?.id);
  };
  const handleDeleteClick = async () => {
    try {
      deleteFromCart(product?.id,user?.email??undefined);
    } catch (err) {
      dispatch(setError(true));
      console.log(err);
    }
  };
  const handleIncreaseClick = async () => {
    try {
      await increaseCount(product,user?.email??undefined);
    } catch (err) {
      dispatch(setError(true));
      console.log(err);
    }
  };
  const handleDecreaseClick = async () => {
    try {
      await decreaseCount(product,user?.email??undefined);
    } catch (err) {
      dispatch(setError(true));
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border  gap-2  p-4 rounded-xl border-gray-200 ">
      <div className="flex gap-4 items-center flex-wrap sm:justify-center pb-2 sm:pb-0">
        <div
          onClick={handleImgClick}
          className=" w-25 h-25 rounded-xl hover:cursor-pointer"
        >
          <img
            className="bg-gray-100 rounded-xl w-full h-full object-cover"
            src={product?.images[0]}
          />
        </div>
        <div className="flex-col">
          <p className="sm:text-lg  font-medium text-gray-700 ">
            {product?.title}
          </p>
          <p className="text-gray-600">{product?.category}</p>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 items-center text-lg">
        <p className="text-green-600 font-medium">
          ${(product?.price * product?.count).toFixed(2)}
        </p>
        <div className="flex  items-center ">
          <button
            onClick={handleIncreaseClick}
            className="cursor-pointer   rounded-tl-xl rounded-bl-xl bg-gray-100 hover:bg-gray-200 px-2"
          >
            +
          </button>
          <p className="px-2">{product?.count}</p>
          <button
            onClick={handleDecreaseClick}
            disabled={product.count == 1}
            className="cursor-pointer   rounded-tr-xl rounded-br-xl bg-gray-100 hover:bg-gray-200 px-2"
          >
            -
          </button>
        </div>
        <button
          onClick={handleDeleteClick}
          className=" cursor-pointer font-medium rounded-xl  text-red-500  p-2 bg-gray-100 hover:bg-gray-200"
        >
          <AiOutlineDelete className="sm:w-5 sm:h-5  " />
        </button>
      </div>
    </div>
  );
};

export default CartCard;

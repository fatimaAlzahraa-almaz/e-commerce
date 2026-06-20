import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/hooks";
import { cartCounterSelector,subTotalSelector,taxSelector,totalSelector } from "../../../app/features/cart/cartSelectors";
const CalucateBox = () => {
  const navigate = useNavigate();
  const cartCount=useAppSelector(cartCounterSelector);
  const subTotal=useAppSelector(subTotalSelector);
  const tax=useAppSelector(taxSelector);
  const total=useAppSelector(totalSelector);


  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick = () => {
    scroll();
    navigate("/checkout");
  };
  return (
    <div className="border  border-gray-300 flex flex-col gap-4 p-4 rounded-lg max-w-100 lg:min-w-90 max-h-80">
      <p className="text-xl text-gray-600 font-medium">
        Selected Offer Summary
      </p>
      <div className="flex flex-col  gap-3 text-gray-600 border-b-2 border-b-gray-400">
        <div className="flex justify-between flex-wrap">
          <p>Products</p>
          <p>{cartCount}</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>Sub-Total</p>
          <p>${subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p>Vat/Tax(2%)</p>
          <p>${tax.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <button
        disabled={cartCount == 0}
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-2xl py-2 cursor-pointer font-medium"
      >
        Checkout Now
      </button>
    </div>
  );
};

export default CalucateBox;

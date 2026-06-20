import { useAppSelector } from "../../../app/hooks/hooks";
import { cartCounterSelector,subTotalSelector,taxSelector,totalSelector } from "../../../app/features/cart/cartSelectors";
const OrderSummary = () => {
   const cartCount=useAppSelector(cartCounterSelector);
    const subTotal=useAppSelector(subTotalSelector);
    const tax=useAppSelector(taxSelector);
    const total=useAppSelector(totalSelector);
  return (
    <div className="border  border-gray-300 flex flex-col gap-4 p-4 rounded-xl  w-full sm:max-w-100  -order-1 sm:order-0 sm:max-h-65">
      <p className="text-2xl text-gray-600 font-bold text-center">
        Order Summary
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
      <div className="flex justify-between font-semibold text-xl text-green-600">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;

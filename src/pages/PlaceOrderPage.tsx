import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../app/context/AuthContext";
import { resetCart } from "../app/features/cart/cartService";
import { useLocation } from "react-router-dom";
const PlaceorderPage = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const shipping=location.state.shippingMethod;
  const{user}=UserAuth();
  const handleClick=async()=>{
    try{
         await resetCart(user?.email??undefined);
         navigate('/products');
    }catch(err){
      console.log(err);
    }
     
  }
  return (
    <div className=" bg-white w-screen h-screen fixed top-0 left-0 z-110 flex items-center justify-center min-h-[80vh]">
      <div className="  flex flex-col  gap-2 sm:gap-3 border-2 text-gray-700 items-center max-w-130 justify-center py-4 sm:py-8 px-1 sm:px-4 border-green-500 rounded-2xl mx-2 text-center">
        <div className="border-2 w-15 h-15 flex items-center justify-center rounded-full border-green-500">
          <GiCheckMark className="w-8 h-8 fill-green-500"/>
        </div>
        <p className=" text-xl sm:text-2xl font-semibold "><span className="text-green-500">Customer</span>,your order is confirmd</p>
        <p className=" text-sm sm:text-lg text-gray-600">your order is now being prepared with precision and care.</p>
        <p className=" text-sm sm:text-lg font-semibold"><span className="text-gray-600 font-normal">Order ID:</span>CC-2026-000925</p>
          <p className="text-sm sm:text-lg font-semibold"><span className="text-gray-600 font-normal">Estimated Delivery:</span>{shipping}</p>
        <button onClick={handleClick} className="cursor-pointer bg-green-500 text-white px-2 py-2 sm:px-3  sm:py-3 rounded-2xl hover:bg-green-600 min-w-0">Continue Shopping</button>
      </div>
    </div>
  )
}

export default PlaceorderPage
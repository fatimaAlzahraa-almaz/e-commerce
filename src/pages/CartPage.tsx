import CartCard from "../components/features/cart/CartCard"
import CalucateBox from "../components/features/cart/CalucateBox"
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../app/context/AuthContext";
import { useAppSelector } from "../app/hooks/hooks";
import { cartCounterSelector } from "../app/features/cart/cartSelectors";
const CartPage = () => {
  const navigate=useNavigate();
  const{user}=UserAuth();
  const cart=useAppSelector((state)=>state.cart.value);
  const cartCount=useAppSelector(cartCounterSelector);

   const scroll=()=>{
    window.scrollTo({top:0,
      behavior:'smooth'
    })
  }
  const handleAddMoreClick=()=>{
    scroll();
    navigate('/products');
  }
  return (
    <div className="mt-18 flex flex-col gap-4 w-full p-2 h-full sm:p-5 min-h-[80vh] ">
      <div className="flex flex-col gap-1">
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">My Cart</p>
        <div className="flex gap-2 sm:gap-3 sm:text-base text-sm">
          <p className="text-gray-600">{cartCount} items in your cart</p>
          <button onClick={handleAddMoreClick} className="text-sm text-green-600 hover:cursor-pointer flex items-center gap-2 hover:text-green-700">Add more<FaArrowRight className="w-3 h-3"/></button>
        </div>
      </div>
       {  cartCount==0 &&
            <div className=" w-full flex  items-center justify-center my-auto">
               <p className="text-gray-700 text-2xl p-5 sm:text-3xl">Your Cart  is empty!</p>
              </div>
           
         }
         {
           user && <div className="flex flex-col gap-4  lg:flex-row  w-full ">
        <div  className="flex flex-col w-full gap-2">
        {
          cart?.map((el,index)=>(
           
        <CartCard key={index}  product={el}/>
        
          ))
        }
           </div>
           {
               cartCount>0 && <CalucateBox/>
           }
            
      </div>
         }
       
      
    </div>
  )
}

export default CartPage
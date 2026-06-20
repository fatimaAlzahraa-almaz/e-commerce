import { IoMdClose } from "react-icons/io";
import type {ProductWithCount } from "../products/types/type";
import { useState } from "react";
import {motion} from 'motion/react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../app/context/AuthContext";
import LoadingSpiner from "../loading/LoadingSpiner";
import { addToCart,deleteFromCart } from "../../../app/features/cart/cartService";
import { useAppSelector } from "../../../app/hooks/hooks";
import { deleteFromFavorites } from "../../../app/features/favorites/favoritesService";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { setError } from "../../../app/features/notification/errorNotificationSlice";
const WishlistCard = ({product}:{product:ProductWithCount}) => {
  const[imgHover,setImgHover]=useState<boolean>(false);
  const[loading,setLoading]=useState<boolean>(false);
  const imgUrl=product?.images.length>1?product?.images[1]:product?.images[0];
  const{user}=UserAuth();
   const cart=useAppSelector((state)=>state.cart.value);
  const[added,setAdded]=useState(cart?.some((item)=>item.id===product.id));
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
   const scroll=()=>{
    window.scrollTo({top:0,
      behavior:'smooth'
    })
  }
  const handleClick=()=>{
    scroll();
    navigate(`/productinfo/${product?.id}`)
  }
  const handleRemoveClick=async()=>{
    try{
      await deleteFromFavorites(product.id,user?.email??undefined);
    } catch(err){
      dispatch(setError(true));
      console.log(err);
    }
  }
    const handleAddToCartClick=async()=>{
    if(!added)
        try{
            setLoading(true);
            await addToCart(product,user?.email??undefined);
            setAdded(true);
        }  catch(err){
            dispatch(setError(true));
          console.log(err);
        }finally{
          setLoading(false);
        }
        else
          try{
            setLoading(true);
            await deleteFromCart(product.id,user?.email??undefined);
            setAdded(false);
        }  catch(err){
            dispatch(setError(true));
          console.log(err);
        }finally{
          setLoading(false);
        }
  }
  return (
    <motion.div 
    initial={{y:0}}
    whileHover={{y:-10}}
    className="flex flex-col bg-white aspect-2/3 max-w-70 gap-1 rounded-xl p-3 text-gray-600 border border-gray-200 relative  ">
       <div onClick={handleRemoveClick} className="absolute right-2 top-2 bg-white p-1 rounded-bl-lg cursor-pointer rounded-tr-lg z-1">
        <IoMdClose className="text-gray-500 h-5 w-5 sm:w-6 sm:h-6 hover:bg-gray-200 rounded"/>
      </div>
      <div
      onMouseEnter={()=>setImgHover(true)}
      onMouseLeave={()=>setImgHover(false)}
      onClick={handleClick}
      className="w-full bg-gray-100 h-[65%] rounded-xl relative cursor-pointer group ">
         
      
       <img src={imgUrl} className={` object-contain w-full h-full group-hover:scale-109  rounded-t-xl ${!imgHover?'hidden':'block'}  `}/>
      
    
         <img src={product?.images[0]} className={` object-contain w-full h-full    rounded-t-xl ${imgHover?'hidden':'block'} `}/>
      
        
         
      </div>
      <div className="flex flex-col gap-1">
        <p className=" font-medium text-lg line-clamp-1">{product?.title}</p>
        <p className="text-sm max-w-[30ch] truncate">{product?.description}</p>
        <div className="font-light max-w-full truncate text-sm flex items-baseline gap-1  ">{product?.tags?.map((el:string,i:number)=>(
         i<3 && <span key={i} >{el} <span className=" h-1 w-1 inline-block bg-gray-500  rounded-3xl"></span></span>
         
        ))}</div>
        <p className="font-medium text-lg text-green-500">${product?.price}</p>
      </div>
      <button onClick={handleAddToCartClick} className="border font-medium text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-center  w-full rounded-sm cursor-pointer py-1 flex items-center justify-center">{loading ? <LoadingSpiner/> :added ?'Added' : 'Add To Cart'}</button>
    </motion.div>
  )
}

export default WishlistCard
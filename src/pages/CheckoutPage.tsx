import { useNavigate } from "react-router-dom";
 import * as z from 'zod'
 import {zodResolver} from '@hookform/resolvers/zod'
 import { useForm } from "react-hook-form";
 import type { SubmitHandler } from "react-hook-form";
import OrderSummary from "../components/features/cart/OrderSummary";
import { UserAuth } from "../app/context/AuthContext";
import { useEffect,useState } from "react";
import LoadingSpiner from "../components/features/loading/LoadingSpiner";
import { useAppDispatch } from "../app/hooks/hooks";
import { setError } from "../app/features/notification/errorNotificationSlice";
const CheckoutPage = () => {
    const navigate=useNavigate();
    const[loading,setLoading]=useState<boolean>(false);
    const[shippingMethod,setShippingMethod]=useState<string>('Free Shipping (5-7 days)');
    const dispatch=useAppDispatch();
    const{userDetails,addToUserDetails}=UserAuth();
   const handleClick=()=>{
   if(isValid)
     navigate('/placeorder',{state:{shippingMethod}});
   }
   const loginSchema=z.object({
    firstName:z.string().min(3,'At least 3 charecters are required'),
    city:z.string().min(1,'City is required'),
    zipCode:z.string().min(1,'Zip code is required'),
    phone:z.string().min(1,'Phone number is required'),
     email:z.email('Email not valid').min(1,'Email is required'),
     address:z.string().min(1,'Address is required'),
     country:z.string().min(1,'Country is required'),
   });
   type loginTypevalues=z.infer<typeof loginSchema>;
   const onSubmit:SubmitHandler<loginTypevalues>=async(data)=>{
     setLoading(true);
    try{ 
      
         if(userDetails){
           await addToUserDetails({...userDetails,...data});
         } else{
          dispatch(setError(true));
         }
           
    }catch(err){
      dispatch(setError(true));
      console.log(err);
    } finally{
      setLoading(false);
    }
    
   
   }
   const{register,handleSubmit,reset,formState:{errors,isValid,isSubmitting}}=useForm<loginTypevalues>({resolver:zodResolver(loginSchema),mode:'onChange'});
   useEffect(()=>{
     reset({
      firstName:userDetails?.firstName,
      email:userDetails?.email,
      phone:userDetails?.phone,
      address:userDetails?.address,
      city:userDetails?.city,
      zipCode:userDetails?.zipCode,
     })
   },[reset,userDetails]);
   const handleShippingMethodClick=(method:string)=>{
         setShippingMethod(method);
   }
   console.log(errors)
  return (
    <div className="mt-18 flex flex-col sm:flex-row gap-8  w-full px-2 sm:px-4 py-10 justify-center min-h-[80vh]">
      <form className="border border-gray-300  rounded-2xl flex flex-col gap-8 py-6 px-4 w-full sm:px-8 sm:max-w-150 "  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <p className="text-3xl text-green-500 font-bold">Checkout</p>
          <p className="text-gray-600 font-semibold text-xl tracking-wider">Contact Information</p>
          <input {...register('firstName')} className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "  type='text' placeholder="Your Name"/>
         {errors.firstName &&  <p className='text-red-400'>{errors.firstName?.message}</p> }
          <input {...register('email')}  className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  " type='email' placeholder="Email Address   "/>
         {errors.email &&  <p className='text-red-400'>{errors.email?.message}</p> }
         <input {...register('phone')}  className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  " type='text' placeholder="Phone Number"/>
         {errors.phone &&  <p className='text-red-400'>{errors.phone?.message}</p> }
        

       </div>
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 font-semibold text-xl tracking-wider">Shipping Address</p>
             <input  type='text'  {...register('address')}   className="border border-gray-300 w-full shadow-xs p-2 sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700"  placeholder="Address"/>
              {errors.address && <p className="text-red-400">{errors.address?.message}</p>}
                 <input {...register('city')}   className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  " type='text' placeholder="City"/>
         {errors.city &&  <p className='text-red-400'>{errors.city?.message}</p> }
          <input {...register('zipCode')}   className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  " type='text' placeholder="Zip Code"/>
         {errors.zipCode &&  <p className='text-red-400'>{errors.zipCode?.message}</p> }
         <input {...register('country')} className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  " type='text' placeholder="Country"/>
         {errors.country &&  <p className='text-red-400'>{errors.country?.message}</p> }
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 font-semibold text-xl tracking-wider">Shipping Method</p>
          <fieldset className="flex flex-col gap-3 text-gray-600" id='shipping'>
            <label onClick={()=>handleShippingMethodClick('Free Shipping (5-7 days)')} className="hover:cursor-pointer flex gap-2 border-2 border-gray-200 p-4 rounded-xl hover:border-green-500 "><input className="border w-4 " name='shipping' type='radio' defaultChecked />
            Free Shipping (5-7 days)</label>
            <label onClick={()=>handleShippingMethodClick('Express Shipping (2-3 days)')} className="hover:cursor-pointer flex gap-2 border-2 border-gray-200  p-4 rounded-xl hover:border-green-500 ">
              <input className="border w-4 " name='shipping' type='radio'/>
              Express Shipping (2-3 days)
            </label>
           
          </fieldset>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 font-semibold text-xl tracking-wider">Payment Method</p>
            <fieldset  className="flex flex-col gap-3 text-gray-600" id='pay'>
            <label className="hover:cursor-pointer flex gap-2 border-2 border-gray-200 p-4 rounded-xl hover:border-green-500 "><input className="border w-4 " name='pay' type='radio' defaultChecked/>
               Cash on Delivery</label>
            <label className="hover:cursor-pointer flex gap-2 border-2 border-gray-200  p-4 rounded-xl hover:border-green-500 ">
              <input className="border w-4 " name='pay' type='radio'/>
              Credit / Debit Card
            </label>
           
          </fieldset>
        </div>
         <button  onClick={handleClick} disabled={isSubmitting}  className=" w-full p-3  hover:cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-lg tracking-wide flex items-center justify-center">{loading ? <LoadingSpiner/> :'Place Order'}</button>
      
      </form>
      <OrderSummary/>
    </div>
  )
}

export default CheckoutPage
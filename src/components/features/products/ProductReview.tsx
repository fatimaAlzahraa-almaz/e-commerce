import type { Review } from "./types/type";
import { FaStar } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri"
const ProductReview = ({data}:{data:Review}) => {
  return (
    <div className="flex gap-2 sm:gap-4 ">
      <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center"><RiUserLine className="w-8 h-8 text-gray-400"/></div>
    <div className="flex flex-col gap-3 py-2 text-sm">
      <div className="flex gap-0.5">
         {
         Array.from({length:5}).map((_,index:number)=>(
         (index+1)<= Math.floor(data?.rating || 4) ? <FaStar className="w-4 h-4 fill-green-500 " key={index}/> : <FaStar className="w-4 h-4 fill-gray-300" key={index}/>
          ))
          }
      </div>
      <p className=" text-gray-700">{data?.comment}</p>
      <p className="text-gray-800 font-semibold">{data?.reviewerName}</p>
      <p>{data?.date?.slice(0,10)}</p>
    </div>
    </div>
  )
}

export default ProductReview
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import type { sortProductsProps } from './types/type';
import { AnimatePresence,motion } from "motion/react";
const SortProducts = ({setVisibleMenu,visibleMenu,handleHighToLow,handleLowToHigh}:sortProductsProps) => {
  return (
     <div className="relative">
          <button onClick={()=>setVisibleMenu(!visibleMenu)} className="flex items-center gap-1  border  p-1 sm:px-3 sm:py-2 border-gray-200 font-medium sm:text-lg cursor-pointer">SORT{visibleMenu ? <IoIosArrowUp/> : <IoIosArrowDown/>}</button>
          {
            
            visibleMenu &&  <AnimatePresence> <motion.div
            initial={{y:-10,opacity:0}}
            animate={{y:0,opacity:1}}
             className="flex flex-col  border border-gray-200 text-gray-600 absolute sm:top-12  bg-white w-[200%] right-0 z-100">
            <button onClick={handleLowToHigh} className=" w-full py-2 sm:px-3 border-b border-gray-100 hover:bg-gray-200 cursor-pointer">Price, low to high</button>
            <button onClick={handleHighToLow} className=" w-full sm:px-3 py-2 hover:bg-gray-200 cursor-pointer">Price, high to low</button>
          </motion.div>
          </AnimatePresence>
          }
          
        </div>
  )
}

export default SortProducts
import { motion } from "motion/react";
import type { userMenuProps } from "./types/types.ts";
import { UserAuth } from "../../app/context/AuthContext.tsx";
const UserMenu = ({ signIn, signUp ,logOut}: userMenuProps) => {
  const{user}=UserAuth();
  return (
    <>
    { !user?
     <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col bg-gray-100  text-sm items-start w-36 h-20 rounded-2xl "
    >
      

    
      <button
        onClick={signIn}
        className=" w-full h-full border-b border-gray-200 hover:bg-gray-200 rounded-t-2xl cursor-pointer"
      >
        Login
      </button>
      <button
        onClick={signUp}
        className=" w-full h-full hover:bg-gray-200 rounded-b-2xl cursor-pointer"
      >
        Sign up
      </button>
      
       
    </motion.div>
    :
     <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col bg-gray-100  text-sm items-start w-30 h-11 rounded-2xl "
    >
    
       <button
        onClick={logOut}
        className=" w-full h-full hover:bg-gray-200 rounded-2xl  cursor-pointer "
      >
        logout
      </button>
      
    </motion.div>
    }
    </>
  );
};

export default UserMenu;

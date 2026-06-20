import { useEffect } from "react";
import {  doc,onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { setCart } from "./cartSlice";
import { useAppDispatch } from "../../hooks/hooks";

export const useCartListener=(email:string|undefined)=>{

const dispatch=useAppDispatch();
useEffect(() => {
    if (!email) return;
    
     const unsubsicribe= onSnapshot(doc(db, "users", email), (doc) => {
        
        dispatch(setCart(doc.data()?.cart));
        
      });
    return unsubsicribe;
  }, [email,dispatch]);
}
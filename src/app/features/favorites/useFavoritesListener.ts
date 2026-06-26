import { useEffect } from "react";
import {  doc,onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { setFavorites } from "./favoritesSlice";
import { useAppDispatch } from "../../hooks/hooks";

export const useFavoritesListener=(email:string|undefined)=>{

const dispatch=useAppDispatch();
useEffect(() => {
    if (!email) {
      dispatch(setFavorites([]));
      return;
    };
    
     const unsubsicribe= onSnapshot(doc(db, "users", email), (doc) => {
        
        dispatch(setFavorites(doc.data()?.favorites));
        
      });
    return unsubsicribe;
  }, [email,dispatch]);
}
import {  db } from "../../../firebase";
import {  doc, updateDoc, arrayUnion,getDoc } from "firebase/firestore";
import type { Product } from "../../../components/features/products/types/type";




 export async function addToFavorits(item: Product,email:string|undefined): Promise<void> {
    if (email) {
      await updateDoc(doc(db, "users", email), {
        favorites: arrayUnion({
          ...item,
          count: 1,
        }),
      });
    } else {
      throw new Error();
    }
  }
 
export  async function deleteFromFavorites(id: number,email:string|undefined): Promise<void> {
    
    if (email) {
      const onSnapshot=await getDoc(doc(db,"users",email));
      const favorites:Product[]=onSnapshot.data()?.favorites??[];
       const newFavorites = favorites?.filter((item) => item.id != id);
      await updateDoc(doc(db, "users", email), {
        favorites: newFavorites,
      });
    } else {
      throw new Error();
    }
  }

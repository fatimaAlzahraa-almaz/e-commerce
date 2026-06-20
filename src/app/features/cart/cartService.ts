import type {
  Product,
  ProductWithCount,
} from "../../../components/features/products/types/type";
import {  doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function addToCart(item: Product, email: string|undefined): Promise<void> {
  if(email)
    await updateDoc(doc(db, "users", email), {
      cart: arrayUnion({
        ...item,
        count: 1,
      }),
    });
  else {
   
    throw new Error();
  }
}

export async function deleteFromCart(id: number, email: string|undefined): Promise<void> {
  if(email){
    const snapshot = await getDoc(doc(db, "users", email));

    const cart: ProductWithCount[] = snapshot.data()?.cart ?? [];
    const newCart = cart.filter((item) => item.id != id);
    await updateDoc(doc(db, "users", email), {
      cart: newCart,
    });
  } else {
  
    throw new Error();
  }
}

export async function resetCart(email: string|undefined): Promise<void> {
  if(email) {
    await updateDoc(doc(db, "users", email), {
      cart: [],
    });
  } else {
   
    throw new Error();
  }
}

export async function increaseCount(
  product: ProductWithCount,
  email: string|undefined,
): Promise<void> {
  if(email){
    const snapshot = await getDoc(doc(db, "users", email));

    const cart: ProductWithCount[] = snapshot.data()?.cart ?? [];

    const newCart = cart?.map((item) => {
      if (item.id == product.id) {
        const newCount = product.count + 1;
        return { ...item, count: newCount };
      }
      return item;
    });

    await updateDoc(doc(db, "users", email), {
      cart: newCart,
    });
  } else {
   
    throw new Error();
  }
}

export async function decreaseCount(
  product: ProductWithCount,
  email: string|undefined,
): Promise<void> {
  if(email) {
    const snapshot = await getDoc(doc(db, "users", email));

    const cart: ProductWithCount[] = snapshot.data()?.cart ?? [];

    const newCart = cart?.map((item) => {
      if (item.id == product.id) {
        const newCount = product.count - 1;
        return { ...item, count: newCount };
      }
      return item;
    });
    await updateDoc(doc(db, "users", email), {
      cart: newCart,
    });
  } else {
    
    throw new Error();
  }
}

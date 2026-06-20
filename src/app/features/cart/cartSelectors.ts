import type { RootState } from "../../store";

export const cartCounterSelector=(state:RootState)=>state.cart.value.reduce((prev,item)=>prev+item.count,0);

export const subTotalSelector=(state:RootState)=>state.cart.value.reduce((prev,item)=>prev+item.count*item.price,0);

export const taxSelector=(state:RootState)=>{
  const subTotal=state.cart.value.reduce((prev,item)=>prev+item.count*item.price,0);
  return subTotal*0.02;
};

export const totalSelector=(state:RootState)=>{
   const subTotal=state.cart.value.reduce((prev,item)=>prev+item.count*item.price,0);
   return subTotal+subTotal*0.02;
};
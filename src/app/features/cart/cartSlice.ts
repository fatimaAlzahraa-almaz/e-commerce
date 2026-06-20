import { createSlice } from "@reduxjs/toolkit";
import type { ProductWithCount } from "../../../components/features/products/types/type";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType{
  value:ProductWithCount[]
}

const initialState:initialStateType={
  value:[],
}

export const cartSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
   setCart:(state,action:PayloadAction<ProductWithCount[]>)=>{
      state.value=action.payload
   },
   
  }
})

export const{setCart}=cartSlice.actions;

export default cartSlice.reducer;
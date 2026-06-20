import { createSlice } from "@reduxjs/toolkit";
import type { ProductWithCount } from "../../../components/features/products/types/type";
import type { PayloadAction } from "@reduxjs/toolkit";
interface initialStateType{
  value:ProductWithCount[]
}
const initialState:initialStateType={
  value:[]
}
export const favoritesSlice=createSlice({
  name:'favorites',
  initialState,
  reducers:{
    setFavorites:(state,action:PayloadAction<ProductWithCount[]>)=>{
      state.value=action.payload
    }
  }

})
export const{setFavorites}=favoritesSlice.actions
export default favoritesSlice.reducer
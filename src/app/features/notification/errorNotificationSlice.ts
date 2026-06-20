import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType{
  value:boolean
}
const initialState:initialStateType={
  value:false,
}
export const errorNotificationSlice=createSlice({
  name:'errorNotification',
  initialState,
  reducers:{
    setError:(state,action:PayloadAction<boolean>)=>{
      state.value=action.payload
    }
  }

})


export const{setError}=errorNotificationSlice.actions
export default errorNotificationSlice.reducer
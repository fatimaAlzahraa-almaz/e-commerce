import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface initialStateType{
  value:boolean
}
const initialState:initialStateType={
  value:false
}
export const loginNotificationSlice=createSlice({
  name:'loginNotification',
  initialState,
  reducers:{
    setLoginNotification:(state,action:PayloadAction<boolean>)=>{
      state.value=action.payload
    }
  }

})
export const{setLoginNotification}=loginNotificationSlice.actions
export default loginNotificationSlice.reducer
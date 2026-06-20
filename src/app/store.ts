import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./service/productsApi";
import  cartSliceReducer  from "./features/cart/cartSlice";
import favoritesSliceReducer from './features/favorites/favoritesSlice'
import ErrorNotificationReducer from "./features/notification/errorNotificationSlice";
import LoginNotificationReducer from "./features/notification/loginNotificationSlice";
export const store = configureStore({
  reducer: {
    cart:cartSliceReducer,
    errorNotification:ErrorNotificationReducer,
    loginNotification:LoginNotificationReducer,
    favorites:favoritesSliceReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

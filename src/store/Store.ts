import { configureStore } from "@reduxjs/toolkit";
import productReducer  from "./store/productData";
// Import reducer

const store = configureStore({
  reducer:  {
    product: productReducer, 
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";

export const store = configureStore({
  reducer: {
    userApi: userAPI.reducer,
    userReducer: userReducer.reducer,
    productApi: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => mid().concat(userAPI.middleware, productAPI.middleware),
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import productSlice from "./slices/productSlice";

const store = configureStore({
    reducer: {
        users : userSlice,
        product : productSlice
    }
})

export default store;
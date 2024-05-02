import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";


const store=configureStore({
    reducer:{
       user:authSlice,
    }
})

export default store
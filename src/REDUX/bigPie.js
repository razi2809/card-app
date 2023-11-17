import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import DarkReducer from "./DarkTheme";
import likeReducer from "./likeSlice";
const store = configureStore({
  reducer: {
    authReducer,
    DarkReducer,
    likeReducer,
  },
});

export default store;

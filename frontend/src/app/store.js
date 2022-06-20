import { configureStore } from "@reduxjs/toolkit";
// import tokenReducer from "../features/token/tokenSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

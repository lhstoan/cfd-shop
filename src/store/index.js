import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducers from "./reducers/cartReducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducers
	},
	devTools: "development"
})

export default store;
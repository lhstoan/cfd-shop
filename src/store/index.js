import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productReducers from "./reducers/productReducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducers
	},
	devTools: "development"
})

export default store;
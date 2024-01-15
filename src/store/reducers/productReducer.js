import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: null,
	loading: {
		product: false
	}
};

const ProductSlide = createSlice({
	name: "product",
	initialState,
	reducers: {
		getProduct(state, action) {
			state.products = action.payload;
		},
	}
});

const {
	actions: productActions,
	reducer: productReducers
} = ProductSlide

export const {
	getProduct
} = productActions


export default productReducers
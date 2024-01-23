import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../../services/cartService";

const initialState = {
	cartInfo: {},
	loading: false
};

const cartSlide = createSlice({
	name: "cart",
	initialState,
	reducers: {
		updateCart(state, action) { }
	},
	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.cartInfo = action.payload;
			state.loading = false;
		}).addCase(getCart.pending, (state) => {
			state.loading = true;
		}).addCase(getCart.rejected, (state) => {
			state.loading = false;
		})
	}
})

const {
	actions: cartActions,
	reducer: cartReducers
} = cartSlide

export const {
	updateCart
} = cartActions


export default cartReducers

// ThunkAPI  = { dispatch, getState , rejectWithValue}

export const getCart = createAsyncThunk(
	"cart/getCart",
	async (payload, _) => {
		try {
			const products = await cartService.getCart();
			return res?.data?.data;
		} catch (error) {
			console.log('error', error)
		}
	}
)

export const handleAddCart = createAsyncThunk(
	"cart/handleAddCart",
	async (payload, { dispatch }) => {
		try {
			const { addID, addColor, addQty, addPrice } = payload || {};
			if (cartInfo.id) { /* empty */ } else {
				/* empty */
			}


			// const products = await cartService.updateCart(payload);
			// if (res?.data?.data) {
			// 	dispatch(getCart())
			// }
			// return res?.data?.data;
		} catch (error) {
			console.log('error', error)
		}
	}
)
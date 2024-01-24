import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
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
		builder.addCase(handleRemoveItemCart.fulfilled, (state) => {
			state.loading = false;
		}).addCase(handleRemoveItemCart.pending, (state) => {
			state.loading = true;
		}).addCase(handleRemoveItemCart.rejected, (state) => {
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
			const cartRes = await cartService.getCart();
			return cartRes?.data?.data;
		} catch (error) {
			console.log('error', error)
		}
	}
)

export const handleAddToCart = createAsyncThunk(
	"cart/handleAddToCart",
	async (payload, { dispatch, getState }) => {
		try {
			const { addID, addColor, addQty, addPrice } = payload || {};
			let addPayload = {};
			const { cartInfo } = getState()?.cart || {};
			const { quantity, product: productList, variant, totalProduct, discount } = cartInfo || {};

			if (cartInfo.id) {
				const checkIndex = productList?.findIndex(({ id }, index) => id === addID && variant[index] === addColor);

				const newProduct = productList?.map(({ id }) => id)
				const newQty = [...(quantity ?? [])]
				const newColor = [...(variant ?? [])]
				const colorIndex = newColor?.findIndex((color) => color === addColor);
				const newTotalProduct = [...(totalProduct ?? [])]
				if (checkIndex > -1 && newColor[checkIndex] === addColor) {
					newQty[checkIndex] = Number(newQty[checkIndex]) + Number(addQty);
					newColor[checkIndex] = addColor;
					newTotalProduct[checkIndex] = Number(newTotalProduct[checkIndex]) + (addPrice * addQty);
				} else {
					newProduct.push(addID)
					newQty.push(addQty)
					newColor.push(addColor)
					newTotalProduct.push(addPrice * addQty)
				}

				const newSubTotal = newTotalProduct.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0) || 0;
				const newTotal = newSubTotal - discount;

				addPayload = {
					...cartInfo,
					product: newProduct,
					quantity: newQty,
					variant: newColor,
					totalProduct: newTotalProduct,
					subTotal: newSubTotal,
					total: newTotal,
				}
			}
			else {
				addPayload = {
					product: [addID],
					quantity: [addQty],
					variant: [addColor],
					totalProduct: [addPrice * addQty],
					subTotal: addPrice * addQty,
					total: addPrice * addQty,
					discount: 0,
					paymentMethod: ""
				}

			}
			const cartRes = await cartService.updateCart(addPayload);
			dispatch(getCart())
			message.success("Add to cart succesfully!")
			return cartRes?.data?.data;
		} catch (error) {
			console.log('error', error)
		}
	}
)

export const handleRemoveItemCart = createAsyncThunk(
	"cart/handleRemoveItemCart",
	async (payload, { dispatch, getState }) => {
		try {
			const { cartInfo } = getState()?.cart || {};
			const { quantity, product, variant, totalProduct, discount } = cartInfo || {};
			const newProduct = product?.filter((_, index) => index !== payload).map(({ id }) => id)
			const newQty = quantity?.filter((_, index) => index !== payload);
			const newColor = variant?.filter((_, index) => index !== payload);
			const newTotalProduct = totalProduct?.filter((_, index) => index !== payload);
			const newSubTotal = newTotalProduct.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0) || 0;
			const newTotal = newSubTotal - discount;

			const removePayload = {
				...cartInfo,
				product: newProduct,
				quantity: newQty,
				variant: newColor,
				totalProduct: newTotalProduct,
				subTotal: newSubTotal,
				total: newTotal,
			}

			const cartRes = await cartService.updateCart(removePayload);
			dispatch(getCart())
			message.success("Add to cart succesfully!")
			return cartRes?.data?.data;
		} catch (error) {
			console.log('error', error)
		}
	}
)
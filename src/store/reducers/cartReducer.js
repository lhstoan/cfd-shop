import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import cartService from "../../services/cartService";
import { sumArrayNumber } from "../../utils/calculate";

const initialState = {
	cartInfo: {},
	loading: false
};

const cartSlide = createSlice({
	name: "cart",
	initialState,
	reducers: {
		updateCart(state, action) { state.cartInfo = action.payload; },
		updateCacheCart(state, action) { state.cartInfo = action.payload || state.cartInfo; },
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
		builder.addCase(handleUpdateItemCart.fulfilled, (state) => {
			state.loading = false;
		}).addCase(handleUpdateItemCart.pending, (state) => {
			state.loading = true;
		}).addCase(handleUpdateItemCart.rejected, (state) => {
			state.loading = false;
		})
	}
})

const {
	actions: cartActions,
	reducer: cartReducers
} = cartSlide

export const {
	updateCart, updateCacheCart
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
	async (payload, { dispatch, getState, rejectWithValue }) => {
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

				const newSubTotal = sumArrayNumber(newTotalProduct)
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
			rejectWithValue(error)
			message.error("Add to cart failed !!!")
			throw error;
		}
	}
)

export const handleRemoveItemCart = createAsyncThunk(
	"cart/handleRemoveItemCart",
	async (payload, { dispatch, getState, rejectWithValue }) => {
		const { productIndex } = payload || {};
		const { cartInfo } = getState()?.cart || {};

		try {
			const { quantity, product, variant, totalProduct, discount, shipping } = cartInfo || {};
			const newProduct = product?.filter((_, index) => index !== productIndex).map(({ id }) => id)
			const newQty = quantity?.filter((_, index) => index !== productIndex);
			const newColor = variant?.filter((_, index) => index !== productIndex);
			const newTotalProduct = totalProduct?.filter((_, index) => index !== productIndex);
			const newSubTotal = sumArrayNumber(newTotalProduct)
			const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0);

			const removePayload = {
				...cartInfo,
				product: newProduct,
				quantity: newQty,
				variant: newColor,
				totalProduct: newTotalProduct,
				subTotal: newSubTotal,
				total: newTotal,
				shipping: newProduct?.length > 0 ? shipping : {},
				discount: newProduct?.length > 0 ? discount : 0,
			}

			const cartRes = await cartService.updateCart(removePayload);
			dispatch(getCart())
			message.success("Remove item succesfully!")
			return cartRes?.data?.data;
		} catch (error) {
			rejectWithValue(error)
			message.error("Remove item failed !!!")
			throw error;
		}
	}
)


export const handleUpdateItemCart = createAsyncThunk(
	"cart/handleUpdateItemCart",
	async (payload, { dispatch, getState, rejectWithValue }) => {
		try {
			const cartRes = await cartService.updateCart(payload);
			dispatch(getCart())
			message.success("Update cart succesfully!")
			return cartRes?.data?.data;
		} catch (error) {
			rejectWithValue(error)
			message.error("Update cart failed !!!")
			throw error;
		}
	}
)
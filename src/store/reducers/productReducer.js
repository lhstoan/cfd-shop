import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

const initialState = {
	product: null,
	categories: null,
	loading: {
		product: false,
		cate: false
	}
};

const productSlide = createSlice({
	initialState,
	name: "product",
	reducers: {
		updateProduct(state, action) {
			state.loading = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleGetProduct.fulfilled, (state, action) => {
				state.product = action.payload;
				const products = action.payload.product.products;
				const categories = action.payload.cate.products;
				const initCate = [{ id: "cat01", name: "All", slug: "all" }, ...categories].map(({ id, slug, name, ...cate }) => {
					const qty = products?.filter((item) => item?.category?.slug === slug).length || products.length;
					return { id, slug, name, qty: qty, checked: false };
				});
				state.categories = initCate;
				state.loading.product = false;
			})
			.addCase(handleGetProduct.pending, (state, action) => {
				state.loading.product = true;
			})
			.addCase(handleGetProduct.rejected, (state, action) => {
				state.loading.product = false;
			});
		builder
			.addCase(handleGetCate.fulfilled, (state, action) => {
				state.loading.cate = false;
			})
			.addCase(handleGetCate.pending, (state, action) => {
				state.loading.cate = true;
			})
			.addCase(handleGetCate.rejected, (state, action) => {
				state.loading.cate = false;
			})
	}
})

const {
	actions: productActions,
	reducer: productReducers
} = productSlide

export const {
	updateProduct
} = productActions


export default productReducers


export const handleGetProduct = createAsyncThunk(
	"product/handleGetProfile",
	async (payload, { dispatch, getState }) => {
		try {
			const products = await productService.getProducts();
			const cate = await productService.getCategories();
			return {
				product: products?.data?.data,
				cate: cate?.data?.data,
			};
		} catch (error) {
			console.log('error', error)
		}
		finally {
			// callback?.();
		}

	}
)

export const handleGetCate = createAsyncThunk(
	"product/handleGetCate",
	async (payload, { dispatch, getState }) => {
		try {
			const res = await productService.getCategories();
			return res?.data?.data?.products;
		} catch (error) {
			console.log('error', error)
		}
		finally {
			// callback?.();
		}

	}
)
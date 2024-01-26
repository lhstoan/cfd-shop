import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { RESPONSE_MSG } from "../../constants/validate";
import { authService } from "../../services/authService";
import tokenMethod from "../../utils/token";
import { getCart } from "./cartReducer";


const initialState = {
	showModal: "",
	profile: null,
	loading: {
		profile: false,
		login: false,
		register: false,
	}
};


const authSlide = createSlice({
	name: "auth",
	initialState,
	reducers: {
		handleShowModal(state, action) {
			// if (!!!tokenMethod.get()) {
			$("body").addClass("modal-open");
			state.showModal = action.payload;
			// }
		},
		handleCloseModal(state) {
			$("body").removeClass("modal-open");
			state.showModal = "";
		},
		handleLogout() {
			tokenMethod.remove();
			message.success("Account logged out!")
			// navigate(PATHS.HOME)
		},
		updateProfile(state, action) {
			state.profile = action.payload
		},
	},
	extraReducers: (builder) => {
		//handleGetProfile
		builder
			.addCase(handleGetProfile.fulfilled, (state, action) => {
				state.profile = action.payload;
				state.loading.profile = false;
			})
			.addCase(handleGetProfile.pending, (state) => {
				state.loading.profile = true;
			})
			.addCase(handleGetProfile.rejected, (state) => {
				state.loading.profile = false;
			});
		//handleLogin
		builder
			.addCase(handleLogin.fulfilled, (state) => {
				state.showModal = "";
				state.loading.login = false;
			})
			.addCase(handleLogin.pending, (state) => {
				state.loading.login = true;
			})
			.addCase(handleLogin.rejected, (state) => {
				state.loading.login = false;
			});
		//handleRegister
		builder
			.addCase(handleRegister.fulfilled, (state) => {
				state.loading.register = false;
			})
			.addCase(handleRegister.pending, (state) => {
				state.loading.register = true;
			})
			.addCase(handleRegister.rejected, (state) => {
				state.loading.register = false;
			});
	}
})

const {
	actions: authAction,
	reducer: authReducer
} = authSlide

export const {
	handleShowModal,
	handleCloseModal,
	handleLogout,
	updateProfile,
} = authAction


export default authReducer

export const responseError = (erInfo) => {
	switch (erInfo?.statusCode) {
		case 404:
			return RESPONSE_MSG.notFound
		case 403:
			return RESPONSE_MSG.forbidden
		default:
			return erInfo?.message;
	}

}
// ThunkAPI  = { dispatch, getState , rejectWithValue}


export const handleRegister = createAsyncThunk(
	"auth/handleRegister",
	async (payload, { dispatch, getState, rejectWithValue }) => {
		const { email, password } = payload || {};
		try {
			const res = await authService.register(payload);
			if (res?.data?.data?.id) {
				message.success("Register successfully!")
				dispatch(handleLogin({ email, password }))
				dispatch(getCart())
			}
		} catch (error) {
			const erInfo = error?.response?.data;
			const msg = responseError(error?.response?.data);
			message.error(msg)
			return rejectWithValue(erInfo);
		}
		finally {
			// callback?.();
		}
	}
)

export const handleLogin = createAsyncThunk(
	"auth/handleLogin",
	async (payload, { dispatch, getState, rejectWithValue }) => {
		try {
			const res = await authService.login(payload);
			if (res?.data?.data) {
				const { token: accessToken, refreshToken } = res?.data?.data || "";
				// set token from api login
				tokenMethod.set({ accessToken, refreshToken })

				message.success("Logged in successfully!")
				dispatch(handleGetProfile());
				dispatch(getCart())
			}
		} catch (error) {
			const erInfo = error?.response?.data;
			const msg = responseError(error?.response?.data);
			message.error(msg)
			return rejectWithValue(erInfo);
		}
		finally {
			// callback?.();
		}

	}
)

export const handleGetProfile = createAsyncThunk(
	"auth/handleGetProfile",
	async (payload, { dispatch, getState }) => {
		if (!!tokenMethod.get()) {
			try {
				const res = await authService.getProfile();
				return res?.data?.data;
			} catch (error) {
				console.log('error', error)
				// dispatch(handleLogout())
			}
			finally {
				// callback?.();
			}
		}
	}
)
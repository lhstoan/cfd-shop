import { message } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import PATHS from "./constants/paths";


import { handleGetProfile } from "./store/reducers/authReducer";
import { getCart } from "./store/reducers/cartReducer";
import tokenMethod from "./utils/token";

// import component page
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Page404 = lazy(() => import("./pages/404Page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductSinglePage = lazy(() => import("./pages/ProductSinglePage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const MyProfile = lazy(() => import("./pages/DashboardPage/MyProfile"));
const MyAddress = lazy(() => import("./pages/DashboardPage/MyAddress"));
const MyOrders = lazy(() => import("./pages/DashboardPage/MyOrders"));
const MyWishlist = lazy(() => import("./pages/DashboardPage/MyWishlist"));


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		message.config({
			top: 80,
			duration: 3,
			maxCount: 3
		})

		if (!!tokenMethod.get()) {
			dispatch(handleGetProfile())
			dispatch(getCart())
		}

	}, []);

	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<BrowserRouter>
					<Routes>
						<Route path={PATHS.HOME} element={<MainLayout />}>
							<Route index element={<HomePage />} />

							<Route path={PATHS.ABOUT} element={<AboutPage />} />
							<Route path={PATHS.PRODUCTS.INDEX} element={<ProductPage />} />
							<Route path={PATHS.PRODUCTS.DETAIL} element={<ProductSinglePage />} />

							<Route path={PATHS.CART} element={<CartPage />} />
							<Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
							<Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccessPage />} />
							<Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />} >
								<Route index element={<MyProfile />} />
								<Route path={PATHS.PROFILE.ORDER} element={<MyOrders />} />
								<Route path={PATHS.PROFILE.ADDRESS} element={<MyAddress />} />
								<Route path={PATHS.PROFILE.WISHLIST} element={<MyWishlist />} />
							</Route>

							{/* link to error page  */}
							<Route path="*" element={<Page404 />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	)
}

export default App

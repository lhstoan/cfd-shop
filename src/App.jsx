import { message } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import PATHS from "./constants/paths";

import ProductPage from "./pages/ProductPage";
import { handleGetProfile } from "./store/reducers/authReducer";
import tokenMethod from "./utils/token";
// import component page
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Page404 = lazy(() => import("./pages/404Page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductSinglePage = lazy(() => import("./pages/ProductSinglePage"));



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

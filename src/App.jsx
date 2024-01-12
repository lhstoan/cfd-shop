import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/paths";
// import component page
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Page404 = lazy(() => import("./pages/404Page"));
const HomePage = lazy(() => import("./pages/HomePage"));


function App() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<BrowserRouter>
					<Routes>
						<Route path={PATHS.HOME} element={<MainLayout />}>
							<Route index element={<HomePage />} />

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

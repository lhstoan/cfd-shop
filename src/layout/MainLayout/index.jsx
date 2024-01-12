import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import MobileMenuComponent from '../../components/MobileMenuComponent';
import OverlayComponent from '../../components/OverlayComponent';
import TotopComponent from '../../components/TotopComponent';
import AuthContextProvider from '../../context/AuthContext';
import AuthComponent from './../../components/AuthComponent/index';
import MainContextProvider from './../../context/MainContext';

const MainLayout = () => {
	return (
		<MainContextProvider>
			<AuthContextProvider>
				<div className="page-wrapper">
					<HeaderComponent />
					<Outlet />
					<FooterComponent />
				</div>
				<TotopComponent />
				<OverlayComponent />
				<MobileMenuComponent />
				<AuthComponent />
			</AuthContextProvider>
		</MainContextProvider>
	)
}

export default MainLayout
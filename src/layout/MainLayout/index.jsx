import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import MobileMenuComponent from '../../components/MobileMenuComponent';
import OverlayComponent from '../../components/OverlayComponent';
import TotopComponent from '../../components/TotopComponent';
import AuthComponent from './../../components/AuthComponent/index';

const MainLayout = () => {
	return (
		<>
			<div className="page-wrapper">
				<HeaderComponent />
				<Outlet />
				<FooterComponent />
			</div>
			<TotopComponent />
			<OverlayComponent />
			<MobileMenuComponent />
			<AuthComponent />
		</>
	)
}

export default MainLayout
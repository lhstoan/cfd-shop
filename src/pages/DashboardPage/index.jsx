import { Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/BreadcrumbComponent';
import PATHS from '../../constants/paths';
import { handleLogout, updateProfile } from '../../store/reducers/authReducer';
import { updateCart } from '../../store/reducers/cartReducer';

const DashboardPage = () => {
	const { confirm } = Modal;
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const _onLogout = (e) => {
		e?.stopPropagation();
		e?.preventDefault();

		confirm({
			title: "Do you want sign Out?",
			onOk() {
				dispatch(handleLogout())
				dispatch(updateProfile({}))
				dispatch(updateCart({}))
				navigate(PATHS.HOME)
			},
			okText: "Sign Out"
		})

	}
	return (
		<main className="main">
			<div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
				<div className="container">
					<h1 className="page-title">My Account</h1>
				</div>
			</div>
			<Breadcrumb routes={[{ text: "My Account" }]} />
			<div className="page-content">
				<div className="dashboard">
					<div className="container">
						<div className="row">
							<aside className="col-md-4 col-lg-3">
								<ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
									<li className="nav-item">
										<NavLink className="nav-link" end to={PATHS.PROFILE.INDEX}>Account Details</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" end to={PATHS.PROFILE.ORDER}>Orders</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" end to={PATHS.PROFILE.ADDRESS}>Adresses</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" end to={PATHS.PROFILE.WISHLIST}>Wishlist</NavLink>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#logout" onClick={(e) => _onLogout(e)}>Sign Out</a>
									</li>
								</ul>
							</aside>
							<div className="col-md-8 col-lg-9">
								<div className="tab-content">
									<Outlet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

	)
}

export default DashboardPage
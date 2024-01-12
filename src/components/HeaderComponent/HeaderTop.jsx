import React from 'react';
import { MODAL_TYPES } from '../../constants/general';
import { useAuthContext } from '../../context/AuthContext';
import tokenMethod from '../../utils/token';

const HeaderTop = () => {
	const { handleShowModal, handleLogout } = useAuthContext();

	const _onOpenModal = (e) => {
		e?.stopPropagation();
		e?.preventDefault();
		handleShowModal(MODAL_TYPES.login);
	}

	const _onLogout = (e) => {
		e.stopPropagation();
		handleLogout?.();
	}
	return (
		<div className="header-top">
			<div className="container">
				<div className="header-left">
					<a href="tel:0989596912">
						<i className="icon-phone" /> Hotline: 098 9596 912 </a>
				</div>
				<div className="header-right">
					{/* Not LogIn */}
					{!!!tokenMethod.get() && (
						<ul className="top-menu top-link-menu">
							<li><a href="#signin-modal" className="top-menu-login" onClick={_onOpenModal}><i className="icon-user" />Login | Resgister </a></li>
						</ul>
					)}
					{/* Logged In */}
					{!!tokenMethod.get() && (
						<ul className="top-menu">
							<li>
								<a href="#" className="top-link-menu"><i className="icon-user" />Tran Nghia </a>
								<ul>
									<li>
										<ul>
											<li><a href="dashboard.html">Account Details</a></li>
											<li><a href="dashboard.html">Your Orders</a></li>
											<li><a href="dashboard.html">Wishlist <span>(3)</span></a></li>
											<li><a href="#" onClick={_onLogout}>Sign Out</a></li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	)
}

export default HeaderTop
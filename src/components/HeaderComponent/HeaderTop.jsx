import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MODAL_TYPES } from '../../constants/general';
import PATHS from '../../constants/paths';
import { handleLogout, handleShowModal, updateProfile } from '../../store/reducers/authReducer';
import tokenMethod from '../../utils/token';

const HeaderTop = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { profile } = useSelector(((state) => state.auth));
	const { lastName } = profile || {};

	const _onOpenModal = (e) => {
		e?.stopPropagation();
		e?.preventDefault();
		dispatch(handleShowModal(MODAL_TYPES.login))
	}

	const _onLogout = (e) => {
		e?.stopPropagation();
		e?.preventDefault();
		dispatch(handleLogout())
		dispatch(updateProfile({}))
		navigate(PATHS.HOME)
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
								<a href="#" className="top-link-menu"><i className="icon-user" />{lastName || "Guest"} </a>
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
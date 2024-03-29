import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MODAL_TYPES } from '../../constants/general';
import { handleCloseModal, handleShowModal } from '../../store/reducers/authReducer';
import fnClass from './../../utils/fnClass';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
const ModalContainer = styled.div`
	z-index: 100;
	display: ${(props) => (props['data-show'] ? "block" : "none")};
`
const AuthComponent = () => {
	const [selectedTab, setSelectedTab] = useState(MODAL_TYPES.login);
	const { showModal } = useSelector(((state) => state.auth))
	const dispatch = useDispatch();

	const _onTabChange = (e, tab) => {
		e?.preventDefault();
		setSelectedTab(tab)
		dispatch(handleShowModal(tab))
	}
	const _onCloseModal = (e) => {
		e?.preventDefault();
		setSelectedTab(MODAL_TYPES.login)
		dispatch(handleCloseModal())
	}

	return ReactDOM.createPortal(
		<>
			{/* Sign in / Register Modal */}
			<ModalContainer className={fnClass("modal", {
				"fade show": !!showModal
			})} data-show={!!showModal}>
				<div className="modal-dialog modal-dialog-centered" >
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" onClick={_onCloseModal}>
								<span aria-hidden="true"><i className="icon-close" /></span>
							</button>
							<div className="form-box">
								<div className="form-tab">
									<ul className="nav nav-pills nav-fill nav-border-anim" role="tablist">
										<li className="nav-item">
											<a className={fnClass("nav-link", { active: selectedTab === MODAL_TYPES.login })}
												onClick={(e) => _onTabChange(e, MODAL_TYPES.login)} href="#signin" >Sign In</a>
										</li>
										<li className="nav-item">
											<a className={fnClass("nav-link", { active: selectedTab === MODAL_TYPES.register })}
												onClick={(e) => _onTabChange(e, MODAL_TYPES.register)} href="#register" >Register</a>
										</li>
									</ul>
									<div className="tab-content" id="tab-content-5">
										<div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
											{showModal === MODAL_TYPES.login && <FormLogin show={selectedTab} />}
											{showModal === MODAL_TYPES.register && <FormRegister show={selectedTab} />}
										</div>
										{/* .End .tab-pane */}
									</div>{/* End .tab-content */}
								</div>{/* End .form-tab */}
							</div>{/* End .form-box */}
						</div>{/* End .modal-body */}
					</div>{/* End .modal-content */}
				</div>{/* End .modal-dialog */}
				{!!showModal && (
					<div
						className="modal-backdrop fade show"
						onClick={_onCloseModal}
						style={{ zIndex: -1 }}
					></div>
				)}
			</ModalContainer > {/* End .modal-dialog */}
			{/* End .modal */}
			{/* <ModalBackdrop /> */}

		</ >, document.body
	)
}

export default AuthComponent
import React from 'react';
import ReactDOM from 'react-dom';
import { useAuthContext } from '../../context/AuthContext';
import fnClass from '../../utils/fnClass';

const ModalBackdrop = () => {
	const { showModal, handleCloseModal } = useAuthContext();
	return ReactDOM.createPortal(
		<div className={fnClass("modal-backdrop", {
			"fade show": !!showModal
		})} onClick={handleCloseModal} />,
		document.body
	)
}

export default ModalBackdrop
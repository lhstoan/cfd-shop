import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MODAL_TYPES } from './../constants/general';
import { authService } from './../services/authService';
import tokenMethod from './../utils/token';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState("");
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const accessToken = !!tokenMethod.get()?.accessToken
		if (accessToken) {
			handleGetProfile();
		}
	}, []);

	const handleShowModal = (modalType) => {
		if (!!!tokenMethod.get()) {
			$("body").addClass("modal-open");
			setShowModal(modalType || "");
		}
		if (modalType == MODAL_TYPES.pass && !!tokenMethod.get()) {
			setShowModal(modalType || "");
		}
	};

	const handleCloseModal = (e) => {
		e?.stopPropagation();
		$("body").removeClass("modal-open");
		setShowModal("");
	};

	const handleLogout = () => {
		tokenMethod.remove();
		message.success("Tài khoản đã đăng xuất!")
		navigate(PATHS.HOME)
		setProfile({});
	}

	const handleGetProfile = async (callback) => {
		try {
			const res = await authService.getProfile();
			if (res?.data?.data) {
				setProfile(res?.data?.data);
			}
		} catch (error) {
			console.log('error', error)
			handleLogout()
		}
		finally {
			callback?.();
		}
	}

	return (
		<AuthContext.Provider value={{ showModal, handleShowModal, handleCloseModal, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
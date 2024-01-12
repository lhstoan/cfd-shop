import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scrollTop from '../utils/scrollTop';

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
	const pathName = useLocation();

	useEffect(() => {
		handleCloseMenu();
		const time = setTimeout(() => {
			scrollTop()
		}, 100)
		return () => clearTimeout(time);
	}, [pathName]);

	const handleOpenMenu = (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		$("body").addClass("mmenu-active")
	}

	const handleCloseMenu = (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		$("body").removeClass("mmenu-active")
	}


	return (
		<MainContext.Provider value={{ handleOpenMenu, handleCloseMenu }}>
			{children}
		</MainContext.Provider>
	)
}

export default MainContextProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => useContext(MainContext);
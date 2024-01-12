import React from 'react'
import { useMainContext } from '../../context/MainContext'

const OverlayComponent = () => {
	const { handleCloseMenu } = useMainContext()
	return (
		<>
			{/* Mobile Menu */}
			<div className="mobile-menu-overlay" onClick={handleCloseMenu} />
			{/* End .mobil-menu-overlay */}
		</>
	)
}

export default OverlayComponent
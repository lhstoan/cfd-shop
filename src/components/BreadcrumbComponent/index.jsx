import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import fnClass from '../../utils/fnClass';

const Breadcrumb = ({ className, routes, isHome = true, liClassName = "", defaultClassNameItem = "breadcrumb-item" }) => {

	return (
		<nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
			<div className="container">
				<ol className="breadcrumb">
					{/* default breadcrumb  */}
					{!!isHome && <li className={defaultClassNameItem}><Link to={PATHS.HOME}>Home</Link></li>}
					{/* loading routes breadcrumb  */}
					{!!routes?.length && routes?.map(({ link, text }, index) => (
						<li className={` ${fnClass(defaultClassNameItem,
							{ active: index === routes.length - 1 }
						)} ${liClassName}`} key={index}>
							{!!link && <Link to={link}>{text}</Link>}
							{!!!link && text}
						</li>
					))}
				</ol>
			</div>
		</nav>
	)
}
export default Breadcrumb
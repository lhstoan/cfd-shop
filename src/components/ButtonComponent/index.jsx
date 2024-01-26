import React from 'react';
import { Link } from 'react-router-dom';
const ButtonComponent = ({ children, style, size, toLink, onClick, ...restProps }) => {

	let { sizeClass, styleClass } = "";

	switch (style) {
		case "primary-2":
			styleClass = "btn-outline-primary-2";
			break;
		case "primary":
			styleClass = "btn-primary";
			break;
		default:
			styleClass = "";
			break;
	}

	switch (size) {
		case "lg":
			sizeClass = "btn-minwidth-lg";
			break;
		default:
			sizeClass = "";
			break;
	}
	if (toLink) {
		return <Link to={toLink} className={`btn ${styleClass} ${sizeClass}`} {...restProps}>{children}</Link>
	}
	return (
		<button className={`btn ${styleClass} ${sizeClass}`} onClick={onClick} {...restProps}>{children}</button>
	)
}

export default ButtonComponent
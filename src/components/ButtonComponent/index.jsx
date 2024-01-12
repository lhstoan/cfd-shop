import React from 'react';
import { Link } from 'react-router-dom';
const ButtonComponent = ({ children, style, size, toLink, ...restProps }) => {

	let { sizeClass, styleClass } = "";

	switch (style) {
		case "primary-2":
			styleClass = "btn-outline-primary-2";
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
		return <Link to={toLink} className={`btn ${styleClass} ${sizeClass}`}>{children}</Link>
	}
	return (
		<a href="index.html" className={`btn ${styleClass} ${sizeClass}`}>{children}</a>
	)
}

export default ButtonComponent
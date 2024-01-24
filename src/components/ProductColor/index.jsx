import React, { forwardRef, useImperativeHandle, useState } from 'react';
import fnClass from '../../utils/fnClass';

const ProductColor = ({ colors, defaultColor, onChangeColor }, ref) => {
	const [colorActive, setColorActive] = useState(defaultColor);

	useImperativeHandle(ref, () => {
		return {
			value: colorActive,
			reset: () => {
				setColorActive(defaultColor)
			}
		}
	})
	const _onColorChange = (e, color) => {
		e?.stopPropagation()
		e?.preventDefault()
		setColorActive(color)
		onChangeColor?.(color)
	}

	return (
		<div className="product-nav product-nav-dots">
			{!!colors?.length && colors?.map((color, index) => (
				<div className={`${fnClass("product-nav-item", {
					active: colorActive === color || colors?.length === 1,
				})}`} style={{ background: `${color}` }} key={index} onClick={(e) => _onColorChange(e, color)}>
					<span className="sr-only">{color}</span>
				</div>
			))}
		</div>
	)
}

export default forwardRef(ProductColor)
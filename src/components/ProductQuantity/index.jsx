import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line react-refresh/only-export-components
const InputNumber = styled.input`
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield; /* Firefox */
	.input-group-prepend{
		position: absolute;
	}
`
const ProductQuantity = ({ minValeu = 1, maxValue = 10, step = 1, className = "product-details-quantity", onChange }, ref) => {
	const [inputQuantity, setInputQuantity] = useState(minValeu);

	useImperativeHandle(ref, () => {
		return {
			value: inputQuantity,
			reset: () => {
				setInputQuantity(minValeu)
			}
		}
	})

	useEffect(() => {
		onChange?.(inputQuantity)
	}, [inputQuantity]);

	const _onChangeInput = (e) => {
		setInputQuantity(e?.target?.value)
	}
	const _onDecrement = () => {
		const value = _modifyValue(Number(inputQuantity) + Number(step))
		setInputQuantity(value)
	}
	const _onIncrement = () => {
		const value = _modifyValue(Number(inputQuantity) - Number(step))
		setInputQuantity(value)
	}
	const _modifyValue = (value) => {
		if (value > maxValue) {
			return maxValue
		} else if (value < minValeu) {
			return minValeu;
		} else {
			return value;
		}

	}
	return (
		<div className={className}>
			<div className="input-group input-spinner">
				<div className="input-group-prepend">
					<button style={{ minWidth: 26 }} className="btn btn-spinner" type="button" onClick={_onIncrement} >
						<i className="icon-minus" />
					</button>
				</div>
				<InputNumber type="number" id="qty"
					className="form-control" step={step} min={minValeu} max={maxValue}
					onChange={(e) => _onChangeInput(e)} value={inputQuantity}
				/>
				<div className="input-group-append">
					<button style={{ minWidth: 26 }} className="btn btn-spinner" type="button" onClick={_onDecrement}>
						<i className="icon-plus" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(ProductQuantity)
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TYPESHIP } from '../../constants/general'
import PATHS from '../../constants/paths'
import { formatCurrency } from '../../utils/format'

const AsideProductCart = ({ subTotal, shipping, total, handleUpdateShipping }) => {

	const [shippingInput, setShippingInput] = useState(() => {
		if (total === 0) {
			return 0
		} else {
			return shipping?.price;
		}
	});
	const _onChangeShipping = (e, typeShip) => {
		e?.preventDefault();
		e?.stopPropagation();
		if (total === 0) {
			setShippingInput(0)
		} else {
			setShippingInput(typeShip?.price)
			handleUpdateShipping?.(typeShip);
		}

	}
	return (
		<aside className="col-lg-3">
			<div className="summary summary-cart">
				<h3 className="summary-title">Cart Total</h3>
				<table className="table table-summary">
					<tbody>
						<tr className="summary-subtotal">
							<td>Subtotal:</td>
							<td>${formatCurrency(subTotal)}</td>
						</tr>
						<tr className="summary-shipping">
							<td>Shipping:</td>
							<td>&nbsp;</td>
						</tr>

						{Object.entries(TYPESHIP).map(([key, info], index) => {
							const { text, value } = info || "";
							return (
								<tr className="summary-shipping-row" key={key || index}>
									<td>
										<div className="custom-control custom-radio" >
											<input type="radio" id={`${key}-shipping`} name="shipping" className="custom-control-input" defaultValue={value} checked={shippingInput === value} />
											<label className="custom-control-label"
												htmlFor={`${key}-shipping`} style={{ cursor: "pointer" }}
												onClick={(e) => _onChangeShipping(e, { typeShip: key, price: value })}
											>{text}</label>
										</div>
									</td>
									<td>${formatCurrency(value)}</td>
								</tr>
							)
						})}


						<tr className="summary-shipping-estimate">
							<td>Estimate for Your Country <br />
								<Link to={PATHS.DASHBOARD}>Change address</Link>
							</td>
							<td>&nbsp;</td>
						</tr>
						<tr className="summary-total">
							<td>Total:</td>
							<td>${formatCurrency(total)}</td>
						</tr>
					</tbody>
				</table>
				<Link to={PATHS.CHECKOUT} className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</Link>
			</div>
			<Link to={PATHS.PRODUCTS.INDEX} className="btn btn-outline-dark-2 btn-block mb-3">
				<span>CONTINUE SHOPPING</span>
				<i className="icon-refresh" />
			</Link>
		</aside>
	)
}

export default AsideProductCart


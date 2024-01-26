
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import fnClass from '../../utils/fnClass';
import { formatCurrency } from '../../utils/format';
import nameColor from '../../utils/nameColor';
import { PAYMENTS, TYPESHIP } from './../../constants/general';

const SummaryCheckout = ({ products, subTotal, shipping, total, discountCode, discount, handleChangePayment, handleSubmitFormCheckout }) => {
	const { typeShip } = shipping || "";
	const [card, setCard] = useState(PAYMENTS[0].id)

	const _onChangeCard = (e, cardChange) => {
		e?.preventDefault();
		e?.stopPropagation();
		setCard(cardChange)
		handleChangePayment?.(cardChange)
	}

	const _onSubmitFormCheckout = (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		handleSubmitFormCheckout?.()
	}


	return (
		<aside className="col-lg-3">
			<div className="summary">
				<h3 className="summary-title">Your Order</h3>
				<table className="table table-summary">
					<thead>
						<tr>
							<th>Product</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{products?.length > 0 && products?.map(({ name, slug, totalProduct, quantity, color }, index) => {
							const productPath = PATHS.PRODUCTS.INDEX + `/${slug}`;
							return (
								<tr key={index}>
									<td>
										<Link to={productPath}>{name}</Link> - {nameColor(color)}  <b>x{quantity}</b>
									</td>
									<td>${formatCurrency(totalProduct)}</td>
								</tr>
							)
						})}
						<tr className="summary-subtotal">
							<td>Subtotal:</td>
							<td>${formatCurrency(subTotal)}</td>
						</tr>
						<tr>
							<td>Shipping:</td>
							<td>{TYPESHIP?.[typeShip]?.text} - ${formatCurrency(TYPESHIP?.[typeShip]?.value)}</td>
						</tr>
						{discountCode && (
							<tr>
								<td>Discount:</td>
								<td>{discountCode} - ${formatCurrency(discount)}</td>
							</tr>
						)}

						<tr className="summary-total">
							<td>Total:</td>
							<td>${formatCurrency(total)}</td>
						</tr>
					</tbody>
				</table>
				<div className="accordion-summary" id="accordion-payment">
					{PAYMENTS.map((payment) => {
						const { id: paymentID, label, description } = payment || "";
						return (
							<div className="card" key={paymentID}>
								<div className="card-header" id={`#${paymentID}`} >
									<h2 className="card-title">
										<a href={`#${paymentID}`} onClick={(e) => _onChangeCard(e, paymentID)} className={card === paymentID ? "" : "collapsed"}> {label}</a>
									</h2>
								</div>
								<div id={`#${paymentID}`} className={fnClass("collapse", { show: card === paymentID })} >
									<div className="card-body">{description}</div>
								</div>
							</div>
						)
					})}
				</div>
				<button type="submit" className="btn btn-outline-primary-2 btn-order btn-block" onClick={(e) => _onSubmitFormCheckout(e)}>
					<span className="btn-text">Place Order</span>
					<span className="btn-hover-text">Proceed to Checkout</span>
				</button>
			</div>
		</aside >
	)
}

export default SummaryCheckout
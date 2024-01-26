import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from './../../constants/paths';

const CheckoutSuccessPage = () => {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const orderId = urlSearchParams.get('orderId');

	return (
		<main className="main">
			<div className="content-success text-center">
				<div className="container">
					<h1 className="content-title">Your Order is Completed!</h1>
					<p>Your order <strong>{orderId}</strong> has been completed. Your order details are shown for your personal accont. </p>
					<Link to={PATHS.DASHBOARD} className="btn btn-outline-primary-2 btn-minwidth-lg">
						<span>VIEW MY ORDERS</span>
						<i className="icon-long-arrow-right" />
					</Link>
				</div>
			</div>
		</main>
	)
}

export default CheckoutSuccessPage
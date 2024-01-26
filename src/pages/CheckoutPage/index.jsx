import React from 'react'
import Breadcrumb from '../../components/BreadcrumbComponent'
import PATHS from '../../constants/paths'
import DiscountCheckout from './DiscountCheckout'
import FormCheckout from './FormCheckout'
import useCheckoutPage from './useCheckoutPage'

const CheckoutPage = () => {
	const { formCheckoutProps, discountCheckoutProps } = useCheckoutPage()
	return (
		<main className="main">
			<div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
				<div className="container">
					<h1 className="page-title">Checkout</h1>
				</div>
			</div>
			<Breadcrumb routes={[{ link: PATHS.PRODUCTS.INDEX, text: "Product" }, { text: "Checkout" }]} />
			<div className="page-content">
				<div className="checkout">
					<div className="container">
						<DiscountCheckout {...discountCheckoutProps} />
						<FormCheckout {...formCheckoutProps} />
					</div>
				</div>
			</div>
		</main>
	)
}

export default CheckoutPage
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';

const CartDropdown = () => {
	const { cartInfo } = useSelector((state) => state.cart)
	return (
		<div className="dropdown cart-dropdown">
			<a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
				<i className="icon-shopping-cart" />
				<span className="cart-count">{cartInfo?.length || 0}</span>
			</a>
			<div className="dropdown-menu dropdown-menu-right">
				{!!!cartInfo && (
					<p>There are currently no products in the cart {">>"} <Link to={PATHS.PRODUCTS.INDEX}>Go To Shop</Link></p>
				)}
				{cartInfo?.length > 0 &&
					(<>
						<div className="dropdown-cart-products">
							<div className="product">
								<div className="product-cart-details">
									<h4 className="product-title">
										<a href="product-detail.html">Blue utility</a>
									</h4>
									<span className="cart-product-info">
										<span className="cart-product-qty">1</span> x $76.00 </span>
								</div>
								<figure className="product-image-container">
									<a href="product-detail.html" className="product-image">
										<img src="/assets/images/products/cart/product-2.jpg" alt="product" />
									</a>
								</figure>
								<a href="#" className="btn-remove" title="Remove Product">
									<i className="icon-close" />
								</a>
							</div>
						</div>
						<div className="dropdown-cart-total">
							<span>Total</span>
							<span className="cart-total-price">$160.00</span>
						</div>
						<div className="dropdown-cart-action">
							<a href="cart.html" className="btn btn-primary">View Cart</a>
							<a href="checkout.html" className="btn btn-outline-primary-2">
								<span>Checkout</span>
								<i className="icon-long-arrow-right" />
							</a>
						</div>
					</>)
				}
			</div>
		</div>
	)
}

export default CartDropdown
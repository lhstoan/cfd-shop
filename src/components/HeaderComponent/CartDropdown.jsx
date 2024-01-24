import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MODAL_TYPES } from '../../constants/general';
import PATHS from '../../constants/paths';
import { handleShowModal } from '../../store/reducers/authReducer';
import { handleRemoveItemCart } from '../../store/reducers/cartReducer';
import ProductCart from '../ProductCart';
import { formatCurrency } from './../../utils/format';
import tokenMethod from './../../utils/token';

const CartDropdown = () => {
	const { cartInfo, loading } = useSelector((state) => state.cart)
	const token = tokenMethod.get();
	const { product, total, quantity, totalProduct, variant } = cartInfo || {};

	const dispatch = useDispatch()
	const _onLogin = (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		dispatch(handleShowModal(MODAL_TYPES.login))
	}
	const _onRemove = (productIndex) => {
		if (loading || productIndex < 0) return;
		dispatch(handleRemoveItemCart(productIndex))
	}
	return (
		<div className="dropdown cart-dropdown">
			<div className="dropdown-toggle" style={{ cursor: "pointer" }}>
				<i className="icon-shopping-cart" />
				<span className="cart-count">{quantity?.reduce((prev, curr) => Number(prev + curr), 0) || 0}</span>
			</div>
			<div className="dropdown-menu dropdown-menu-right">
				{!!!token && (
					<p>Please log in to view shopping cart information {">>"} <a onClick={(e) => _onLogin(e)} href="#login">Go To Login</a></p>
				)}

				{!!!cartInfo && token && (
					<p>There are currently no products in the cart {">>"} <Link to={PATHS.PRODUCTS.INDEX}>Go To Shop</Link></p>
				)}

				{product?.length > 0 &&
					(<>
						<div className="dropdown-cart-products">
							{product?.map((item, index) => {
								return <ProductCart key={index}
									carts={item}
									quantity={quantity[index]}
									totalProduct={totalProduct[index]}
									color={variant[index]}
									handleDeleteItem={() => _onRemove(index)} />
							})}
						</div>
						<div className="dropdown-cart-total">
							<span>Total</span>
							<span className="cart-total-price">${formatCurrency(total)}</span>
						</div>
						<div className="dropdown-cart-action">
							<Link to={PATHS.CART} className="btn btn-primary">View Cart</Link>
							<Link to={PATHS.CHECKOUT} className="btn btn-outline-primary-2">
								<span>Checkout</span>
								<i className="icon-long-arrow-right" />
							</Link>
						</div>
					</>)
				}
			</div>
		</div>
	)
}

export default CartDropdown
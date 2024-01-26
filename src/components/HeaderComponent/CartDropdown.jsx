import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MODAL_TYPES } from '../../constants/general';
import PATHS from '../../constants/paths';
import { handleShowModal } from '../../store/reducers/authReducer';
import { handleRemoveItemCart } from '../../store/reducers/cartReducer';
import ProductCart from '../ProductCart';
import { formatCurrency } from './../../utils/format';
import tokenMethod from './../../utils/token';


const DropdownContainer = styled.div`
	max-height: 30vh;
	overflow-y: scroll;
	padding-right: 15px;

	&::-webkit-scrollbar-track{
		background-color: #F5F5F5;
	}

	&::-webkit-scrollbar{
		width: 8px;
		background-color: #F5F5F5;
	}

	&::-webkit-scrollbar-thumb{
		background-color: #F90;
		cursor: pointer;
		background-image: -webkit-linear-gradient(45deg,
												rgba(255, 255, 255, .2) 25%,
												transparent 25%,
												transparent 50%,
												rgba(255, 255, 255, .2) 50%,
												rgba(255, 255, 255, .2) 75%,
												transparent 75%,
												transparent)
}

`

const CartDropdown = () => {
	const { confirm } = Modal;
	const { cartInfo, loading } = useSelector((state) => state.cart)
	const token = tokenMethod.get();
	const { product, total, quantity, totalProduct, variant, shipping } = cartInfo || {};

	const dispatch = useDispatch()
	const _onLogin = (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		dispatch(handleShowModal(MODAL_TYPES.login))
	}
	const _onRemove = (productIndex) => {
		const { name } = product?.[productIndex] || {}
		const qty = quantity?.[productIndex] || {}
		const price = Number(totalProduct[productIndex]) / Number(qty);
		const color = variant[productIndex] || {};
		confirm({
			title: "Do you want remove this item form cart?",
			content: (
				<>
					<p>{`${name || ""}`}</p>
					<p>{`${qty || 0} x $${price}`}</p>
				</>
			),
			onOk() {
				if (loading || productIndex < 0) return;
				dispatch(handleRemoveItemCart({ productIndex }))
			},
		})

	}
	return (
		<div className="dropdown cart-dropdown">
			<div className="dropdown-toggle" style={{ cursor: "pointer" }}>
				<i className="icon-shopping-cart" />
				<span className="cart-count">{product?.length || 0}</span>
			</div>
			<div className="dropdown-menu dropdown-menu-right" style={{ width: 400 }}>
				{!!!token && (
					<p>Please log in to view shopping cart information {">>"} <a onClick={(e) => _onLogin(e)} href="#login">Go To Login</a></p>
				)}

				{!!!cartInfo && token && (
					<p>There are currently no products in the cart {">>"} <Link to={PATHS.PRODUCTS.INDEX}>Go To Shop</Link></p>
				)}

				{product?.length > 0 &&
					(<>
						<DropdownContainer className="dropdown-cart-products">
							{product?.map((item, index) => {
								return <ProductCart key={index}
									carts={item}
									quantity={quantity[index]}
									totalProduct={totalProduct[index]}
									color={variant[index]}
									handleDeleteItem={() => _onRemove(index)} />
							})}
						</DropdownContainer>
						<div className="dropdown-cart-total">
							<span>Total</span>
							<span className="cart-total-price">${formatCurrency(total)}</span>
						</div>
						<div className="dropdown-cart-action">
							<Link to={PATHS.CART} className="btn btn-primary" >View Cart</Link>
							{shipping?.typeShip && <Link to={PATHS.CHECKOUT} className="btn btn-primary" >Check Out</Link>}
						</div>
					</>)
				}
			</div>
		</div>
	)
}

export default CartDropdown
import React from 'react';
import PATHS from '../../constants/paths';
import Breadcrumb from './../../components/BreadcrumbComponent/index';
import AsideProductCart from './AsideProductCart';
import ListProductCart from './ListProductCart';
import useCartPage from './useCartPage';

const CartPage = () => {
	const { ListProductProps, AsideProductCartProps } = useCartPage();
	return (
		<main className="main">
			<div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
				<div className="container">
					<h1 className="page-title">Shopping Cart</h1>
				</div>
			</div>
			<Breadcrumb routes={[{ link: PATHS.PRODUCTS.INDEX, text: "Product" }, { text: "Shopping Cart" }]} />
			<div className="page-content">
				<div className="cart">
					<div className="container">
						<div className="row">
							<ListProductCart {...ListProductProps} />
							<AsideProductCart {...AsideProductCartProps} />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default CartPage
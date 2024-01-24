import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { getImage } from '../../pages/HomePage/useHomePage';
import { formatCurrency } from '../../utils/format';

const ProductCart = ({ carts, quantity, totalProduct, color, handleDeleteItem }) => {
	const { name, images, slug, id } = carts || {}
	const imgSrc = getImage(images);
	const productPath = PATHS.PRODUCTS.INDEX + `/${slug}`;
	const _onDeleteItem = (e, id) => {
		e?.preventDefault()
		e?.stopPropagation()
		handleDeleteItem?.(id)
	}
	return (
		<div className="product">
			<div className="product-cart-details">
				<h4 className="product-title">
					<Link to={productPath}>{name}</Link>
				</h4>
				<span className="cart-product-info">
					<span className="cart-product-qty">{quantity}</span> x ${formatCurrency(Number(totalProduct) / Number(quantity))}
					=${formatCurrency(Number(totalProduct))}
				</span>
				<span className="cart-product-info" style={{ display: "flex", alignContent: "center" }}>
					<span>Color: {" "}</span>
					<div className="product-nav product-nav-dots">
						<div className="product-nav-item"
							style={{ background: `${color}` }} >
							<span className="sr-only">{color}</span>
						</div>
					</div>
				</span>
			</div>
			<figure className="product-image-container">
				<a href="product-detail.html" className="product-image">
					<img src={imgSrc} alt="product" />
				</a>
			</figure>
			<a href="#remove" className="btn-remove" title="Remove Product" onClick={(e) => _onDeleteItem(e, id)}>
				<i className="icon-close" />
			</a>
		</div >
	)
}

export default ProductCart
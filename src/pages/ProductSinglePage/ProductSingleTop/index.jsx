import queryString from 'query-string';
import React from 'react';
import ProductColor from '../../../components/ProductColor';
import ProductQuantity from '../../../components/ProductQuantity';
import ProductZoom from '../../../components/ProductZoom';
import PATHS from './../../../constants/paths';
import { formatCurrency } from './../../../utils/format';

const ProductSingleTop = ({ colorRef, qtyRef, handleAddCart, ...productSingleData }) => {
	const { name, images, rating, quantity, price, color, description, category, discount, stock } = productSingleData || {};

	const pathParams = queryString.stringify({ page: 1, limit: 9, category: [category?.id] })

	const _onAddCart = (e) => {
		e?.preventDefault();
		e?.stopPropagation()
		handleAddCart?.()
	}
	return (
		<div className="product-details-top">
			<div className="row">
				<div className="col-md-6">
					<ProductZoom images={images} />
				</div>
				<div className="col-md-6">
					<div className="product-details">
						<h1 className="product-title">{name}</h1>
						<div className="ratings-container">
							<div className="ratings">
								<div className="ratings-val" style={{ width: `${(rating || 0) * 20}%` }} />
							</div>
							<a className="ratings-text" href="#product-review-link" id="review-link">( {rating} Reviews )</a>
						</div>
						<div className="product-price">
							{discount <= 0 && (<>${formatCurrency(price || 0)}</>)}
							{discount > 0 && (<>
								<span className="new-price">${formatCurrency(price - discount)}</span>
								<span className="old-price">Was ${formatCurrency(price || 0)}</span>
							</>)}
						</div>
						<div className="product-content" dangerouslySetInnerHTML={{ __html: description }} />
						<div className="details-filter-row details-row-size">
							<label>Color:</label>
							<ProductColor colors={color} ref={colorRef} />
						</div>
						<div className="details-filter-row details-row-size">
							<label htmlFor="qty">Qty:</label>
							<ProductQuantity maxValue={stock} ref={qtyRef} />
						</div>
						<div className="product-details-action">
							<a href="#" className="btn-product btn-cart" onClick={(e) => _onAddCart(e)}>
								<span>add to cart</span>
							</a>
							<div className="details-action-wrapper">
								<a href="#" className="btn-product btn-wishlist" title="Wishlist">
									<span>Add to Wishlist</span>
								</a>
							</div>
						</div>
						<div className="product-details-footer">
							<div className="product-cat">
								<span>Category:</span>
								{!!category && (<a href={`${PATHS.PRODUCTS.INDEX}?${pathParams}`} >{category.name}</a>)}
							</div>
							<div className="social-icons social-icons-sm">
								<span className="social-label">Share:</span>
								<a href="#" className="social-icon" title="Facebook" target="_blank">
									<i className="icon-facebook-f" />
								</a>
								<a href="#" className="social-icon" title="Twitter" target="_blank">
									<i className="icon-twitter" />
								</a>
								<a href="#" className="social-icon" title="Instagram" target="_blank">
									<i className="icon-instagram" />
								</a>
								<a href="#" className="social-icon" title="Pinterest" target="_blank">
									<i className="icon-pinterest" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductSingleTop
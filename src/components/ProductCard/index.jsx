import { Empty } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PATHS from '../../constants/paths';
import { getImage } from '../../pages/HomePage/useHomePage';
import { formatCurrency } from '../../utils/format';

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;

  .ant-empty-description{
	color: #fff;
	font-size: 180%;
  }
`;

const ProductCard = ({ product, ...restProps }) => {

	const { name, images, slug, title, rating, price, discount } = product || {};
	const imgSrc = getImage(images);
	const productPath = PATHS.PRODUCTS.INDEX + `/${slug}`;

	const _onAddToCart = (e) => {
		e?.preventDefault();
	}


	return (
		<div className="product product-2">
			<figure className="product-media">
				{/* Handling when there is a discount product  */}
				{discount > 0 && (<span className="product-label label-circle label-sale">Sale</span>)}

				<Link to={productPath} style={{ height: 275 }}>
					{imgSrc !== "" ? <img src={imgSrc} alt="Product image" className="product-image" style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}} /> : (
						<ImageWrapper>
							<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Product Image" />
						</ImageWrapper>
					)}
				</Link>

				<div className="product-action-vertical">
					<a href="#" className="btn-product-icon btn-wishlist btn-expandable">
						<span>add to wishlist</span>
					</a>
				</div>
				<div className="product-action product-action-dark">
					<a href="#" className="btn-product btn-cart" title="Add to cart" onClick={_onAddToCart}>
						<span>add to cart</span>
					</a>
				</div>
			</figure>
			<div className="product-body">
				<h3 className="product-title">
					<Link to={productPath} style={{ display: '-webkit-box', overflow: "hidden", textOverflow: "ellipsis", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{title || ""}</Link>
				</h3>
				<div className="product-price">
					{discount <= 0 && (<>${formatCurrency(price || 0)}</>)}
					{discount > 0 && (<>
						<span className="new-price">${formatCurrency(price - discount)}</span>
						<span className="old-price">Was ${formatCurrency(price || 0)}</span>
					</>)}

				</div>
				<div className="ratings-container">
					<div className="ratings">
						<div className="ratings-val" style={{ width: `${(rating || 0) * 20}%` }} />
					</div>
					<span className="ratings-text">( {rating} Reviews )</span>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
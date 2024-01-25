
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductQuantity from '../../components/ProductQuantity';
import PATHS from '../../constants/paths';
import { getImage } from '../HomePage/useHomePage';

const ColorSpan = styled.span`
	display: block;
	i{
		display: inline-block;
		position: relative;
		top: 2px;
		--w: 14px;
		width: var(--w);
		height: var(--w);
		border: 1px solid #000;
		border-radius: 100%;
		box-shadow: 0 0 4px #00000033;
	}
`

const ListProductCart = ({ qtyRef, ...cartInfo }) => {
	const { product, variant, totalProduct, quantity } = cartInfo || {};

	return (
		<div className="col-lg-9">
			<table className="table table-cart table-mobile">
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{product?.length > 0 && product?.map((item, index) => {
						const { name, images, slug, id } = item || {}
						const color = variant[index];
						const imgSrc = getImage(images);
						const productPath = PATHS.PRODUCTS.INDEX + `/${slug}`;
						const stock = 10;
						return (
							<tr key={index || item.id}>
								<td className="product-col">
									<div className="product">
										<figure className="product-media">
											<Link to={productPath}>
												<img src={imgSrc} alt="Product image" />
											</Link>
										</figure>
										<h3 className="product-title">
											<Link to={productPath} >{name} </Link>
											<ColorSpan>Color: <i style={{ backgroundColor: `${color}` }}></i></ColorSpan>
										</h3>
									</div>
								</td>
								<td className="price-col">${Number(totalProduct[index]) / Number(quantity[index])}</td>
								<td className="quantity-col">
									<ProductQuantity maxValue={stock} ref={qtyRef} className='cart-product-quantity' defaultQuantity={quantity[index]} />
								</td>
								<td className="total-col">${totalProduct[index]}</td>
								<td className="remove-col">
									<button className="btn-remove">
										<i className="icon-close" />
									</button>
								</td>
							</tr>
						)
					})}

				</tbody>
			</table>
			<div className="cart-bottom">
				<div className="cart-discount">
					<form action="#">
						<div className="input-group">
							<input type="text" className="form-control input-error" required placeholder="Coupon code" />
							<div className="input-group-append">
								<button className="btn btn-outline-primary-2" type="submit">
									<i className="icon-long-arrow-right" />
								</button>
							</div>
						</div>
						<p className="form-error">Please fill in this field</p>
					</form>
				</div>
				<a href="#" className="btn btn-outline-dark-2">
					<span>UPDATE CART</span>
					<i className="icon-refresh" />
				</a>
			</div>
		</div>
	)
}

export default ListProductCart
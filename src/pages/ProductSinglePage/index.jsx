import React from 'react'
import useProductPage from '../ProductPage/useProductPage'
import ProductSingleBot from './ProductSingleBot'
import ProductSingleTop from './ProductSingleTop'

const ProductSinglePage = () => {
	const { data } = useProductPage();
	return (
		<main className="main">
			<nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
				<div className="container d-flex align-items-center">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="index.html">Home</a>
						</li>
						<li className="breadcrumb-item">
							<a href="product.html">Product</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">Dark yellow lace</li>
					</ol>
				</div>
			</nav>
			<div className="page-content">
				<div className="container">
					<ProductSingleTop />
					<ProductSingleBot />
				</div>
			</div>
		</main>
	)
}

export default ProductSinglePage
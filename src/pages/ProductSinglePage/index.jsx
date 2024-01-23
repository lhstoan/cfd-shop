
import React from 'react';
import Breadcrumb from '../../components/BreadcrumbComponent';
import PATHS from '../../constants/paths';
import ProductSingleBot from './ProductSingleBot';
import ProductSingleTop from './ProductSingleTop';
import useProductDetail from './useProductDetail';

const ProductSinglePage = () => {
	const { productSingleTopProps, productSingleBotProps, productName } = useProductDetail();
	return (
		<main className="main">
			<Breadcrumb routes={[{ link: PATHS.PRODUCTS.INDEX, text: "Product" }, { text: productName }]} />
			<div className="page-content">
				<div className="container">
					<ProductSingleTop {...productSingleTopProps} />
					<ProductSingleBot {...productSingleBotProps} />
				</div>
			</div>
		</main>
	)
}

export default ProductSinglePage
import React from 'react';
import ProductCard from '../../components/ProductCard';

const ProductSection = ({ featureProducts: renderProducts }) => {

	return (
		<div className="products mb-3">
			<div className="row justify-content-center">
				{renderProducts?.length > 0 && renderProducts?.map((product, index) => {
					return (
						<div className="col-6 col-md-4 col-lg-4" key={product.id || index}>
							<ProductCard product={product} />
						</div>
					);
				})}

			</div>
		</div>
	)
}

export default ProductSection
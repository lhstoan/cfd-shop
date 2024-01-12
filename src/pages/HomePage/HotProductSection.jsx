import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import owlCarousels from './../../utils/owlCarousels';

const ImageWrapper = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;

  .ant-empty-description{
	color: #fff;
	font-size: 180%;
  }
`;

const TABS = {
	featured: "Featured",
	sale: "On Sale",
	top: "Top Rated"
};

const owlOptions = {
	"nav": true,
	"dots": true,
	"margin": 20,
	"loop": false,
	"responsive": {
		"0": {
			"items": 2
		},
		"600": {
			"items": 2
		},
		"992": {
			"items": 3
		},
		"1200": {
			"items": 4
		}
	}
};

const HotProductSection = (hotProductProps) => {
	console.log('rerender')
	const { featuredProducts, onSaleProducts, topRatedProducts } = hotProductProps || [];
	const [selectedTab, setSelectedTab] = useState(TABS.featured);

	useEffect(() => {
		owlCarousels();
	}, [selectedTab, featuredProducts, onSaleProducts, topRatedProducts]);

	const _onTabChange = (e, tab) => {
		e.preventDefault();
		setSelectedTab("");
		setTimeout(() => {
			setSelectedTab(tab);
		}, 200);
	}

	const _getSelectedProducts = (tab) => {
		switch (tab) {
			case TABS.featured:
				return featuredProducts;

			case TABS.sale:
				return onSaleProducts;

			case TABS.top:
				return topRatedProducts;

			default:
				return [];
		}
	};
	const renderProducts = _getSelectedProducts(selectedTab);
	// const renderProducts = [];

	return (
		<div className="container featured" style={{ height: 550 }}>
			<ul className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3" role="tablist">
				{Object.entries(TABS).map(([item, value], index) => (
					<li className="nav-item" key={index}>
						<a className={`nav-link ${selectedTab === value ? "active" : ""}`}
							data-toggle="tab"
							role="tab"
							id={`products-${item}-link`}
							href={`#products-${item}-tab`}
							onClick={(e) => _onTabChange(e, value)}
						>
							{value}
						</a>
					</li>
				))}
			</ul>
			<div className="tab-content tab-content-carousel">
				{renderProducts?.length > 0 &&
					(<div className={`tab-pane p-0 fade ${renderProducts?.length > 0 ? "show active" : ""}`} role="tabpanel">
						<div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options={JSON.stringify(owlOptions)}>
							{renderProducts?.map((product) => {
								return <ProductCard key={product.id} product={product} />;
							})}
						</div>
					</div>)
				}
				{!renderProducts?.length > 0 && <ImageWrapper>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" />
				</ImageWrapper>}
			</div>
		</div>
	)
}

export default HotProductSection
import { Empty } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import fnClass from '../../../utils/fnClass';
import ReviewSection from './ReviewSection';


const ListStar = styled.ul`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
	li{
		--w:40px;
		margin: 0 10px;
		width: var(--w);
		height: var(--w);
		position: relative;
		border: 1px solid #FCB941;
		border-radius: 5px;
		cursor: pointer;
		display: flex;align-items: center;justify-content: center;
		letter-spacing: 0.1em;
		&.active,&:hover{
			background-color: #FCB941;
			color: #fff;
		}
	}
`
const TABS = {
	desc: "Description",
	shipping: "Shipping & Returns",
	review: "Reviews"
};

const ProductSingleBot = ({ reviewData, ...productSingleData }) => {
	const { description, shippingReturn } = productSingleData || {};
	const [selectedTab, setSelectedTab] = useState(TABS.desc);
	const [loadMore, setLoadMore] = useState(1)
	const [starReview, setStarReview] = useState("")

	// sort by createdAt
	reviewData?.sort((a, b) => {
		const aTime = new Date(a.createdAt)
		const bTime = new Date(b.createdAt)
		return bTime - aTime;
	});
	// sort by rate
	reviewData?.sort((a, b) => {
		return b.rate - a.rate;
	});
	// function
	const _onTabChange = (e, tab) => {
		e.preventDefault();
		setSelectedTab("");
		setTimeout(() => {
			setSelectedTab(tab);
		}, 300);
	}
	// data
	const _showContent = (tab) => {
		switch (tab) {
			case TABS.desc:
				return description;
			case TABS.shipping:
				return shippingReturn;
			case TABS.review:
				return "oke";
			default:
				return "";
		}

	}
	const renderContent = _showContent(selectedTab);
	const _onSelectStar = (star) => {
		setStarReview(star)
	}
	const renderReview = reviewData?.filter((item, index) => {
		const { rate } = item || {};
		if (starReview === "") {
			return rate;
		} else {
			return rate <= starReview && rate > starReview - 1;
		}

	})
	return (
		<div className="product-details-tab" style={{ minHeight: "30vh" }}>
			<ul className="nav nav-pills justify-content-center" role="tablist">
				{Object.entries(TABS).map(([item, value], index) => (
					<li className="nav-item" key={index}>
						<a
							className={fnClass("nav-link", {
								active: selectedTab === value
							})}
							href={`#products-${item}-tab`}
							onClick={(e) => _onTabChange(e, value)}
						>
							{value}
							{value === TABS.review && (`(${reviewData?.length})`)}
						</a>
					</li>
				))}
			</ul>
			<div className="tab-content">
				<div className={fnClass("tab-pane", {
					"fade show active": renderContent?.length > 0
				})}   >
					{selectedTab !== TABS.review && (<div className="product-desc-content" dangerouslySetInnerHTML={{ __html: renderContent }} />)}
					{selectedTab === TABS.review && (
						<div className="reviews">
							<ListStar>
								<li onClick={() => _onSelectStar("")} className={fnClass("nav", { active: starReview === "" })}>All</li>
								{Array.from({ length: 5 }).map((_, index) => {
									return <li key={index} onClick={() => _onSelectStar(index + 1)}
										className={fnClass("nav", { active: starReview === index + 1 })}>
										{index + 1} <i className="icon-star"></i>
									</li>
								})}
							</ListStar>

							{reviewData?.length === 0 && <Empty description="The product has not been reviewed yet!" />}

							{renderReview?.length > 0 && (
								renderReview?.map((item, index) => {
									return <ReviewSection key={index} review={item} />
								})
							)}
						</div>
					)}
				</div>



			</div>
		</div>
	)
}

export default ProductSingleBot
import React, { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const AsideProductSection = ({ categories, products, handleCheckboxChange }) => {
	const [filter, setFilter] = useState()

	const _onCleanAll = () => {

	}

	return (
		<aside className="col-lg-3 order-lg-first" ref={ref}>
			<div className="sidebar sidebar-shop">
				<div className="widget widget-clean">
					<label>Filters:</label>
					<a href="#clear" className="sidebar-filter-clear" onClick={_onCleanFilter}>Clean All</a>
				</div>
				<div className="widget widget-collapsible">
					<h3 className="widget-title">
						<a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1"> Category </a>
					</h3>
					<div className="collapse show" id="widget-1">
						<div className="widget-body">
							<div className="filter-items filter-items-count">
								{categories?.length > 0 && categories?.map(({ id, slug, name, checked, qty, ...item }, index) => {
									return (
										<div className="filter-item" key={id || index}>
											<div className="custom-control custom-checkbox">
												<input type="checkbox" className="custom-control-input"
													id={slug} defaultValue={slug}
													checked={checked}
													onChange={handleCheckboxChange} />
												<label className="custom-control-label" htmlFor={slug}>{name}</label>
											</div>
											<span className="item-count">{quantity || 0}</span>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="widget widget-collapsible">
					<h3 className="widget-title">
						<a data-toggle="collapse" href="#widget-2" role="button" aria-expanded="true" aria-controls="widget-5"> Price </a>
					</h3>
					<div className="collapse show" id="widget-2">
						<div className="widget-body">
							<div className="filter-price">
								<div className="filter-price-text"> Price Range: <span id="filter-price-range" />
								</div>
								<div id="price-slider" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default AsideProductSection

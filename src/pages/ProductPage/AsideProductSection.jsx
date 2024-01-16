import React from 'react';

const AsideProductSection = ({ categories, products }) => {
	console.log(products);
	return (
		<aside className="col-lg-3 order-lg-first">
			<div className="sidebar sidebar-shop">
				<div className="widget widget-clean">
					<label>Filters:</label>
					<a href="#" className="sidebar-filter-clear">Clean All</a>
				</div>
				<div className="widget widget-collapsible">
					<h3 className="widget-title">
						<a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1"> Category </a>
					</h3>
					<div className="collapse show" id="widget-1">
						<div className="widget-body">
							<div className="filter-items filter-items-count">
								{categories?.length > 0 && categories?.map(({ id, slug, name, ...item }, index) => {
									const qty = products?.filter((item) => item?.category?.slug === slug).length;
									console.log(qty);
									return (
										<div className="filter-item" key={id || index}>
											<div className="custom-control custom-checkbox">
												<input type="checkbox" className="custom-control-input" id="cat-1" defaultValue={slug} />
												<label className="custom-control-label" htmlFor="cat-1">{name}</label>
											</div>
											<span className="item-count">{qty}</span>
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

export default AsideProductSection
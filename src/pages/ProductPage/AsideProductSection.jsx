import React, { useEffect } from 'react';


// eslint-disable-next-line react-refresh/only-export-components
const AsideProductSection = ({ categories = [], activeCate = [], handleCheckboxChange, rangePrice, marginValue = 200, handleRange, currentPriceRange }) => {
	const { min: minValue, max: maxValue } = rangePrice || [];

	useEffect(() => {

		const stepValue = 50;
		const marginPercentage = 20;
		const marginValue =
			Math.ceil((maxValue - minValue) * (marginPercentage / 100) / stepValue) * stepValue;


		const noUiSliderOptions = {
			start: currentPriceRange,
			connect: true,
			step: stepValue,
			margin: marginValue,
			range: {
				'min': minValue,
				'max': maxValue
			},
			tooltips: true,
			format: wNumb({
				decimals: 0,
				prefix: '$'
			})
		}

		if (typeof noUiSlider === 'object') {
			var priceSlider = document.getElementById('price-slider');
			if (priceSlider == null) return;

			noUiSlider.create(priceSlider, noUiSliderOptions);
			priceSlider.noUiSlider.on('update', function (values, handle) {
				$('#filter-price-range').text(values.join(' - '));
			})
			priceSlider.noUiSlider.on('slide', function (values, handle) {
				handleRange(values);
			})
		}
		return () => { priceSlider.noUiSlider.destroy(); }

	}, [rangePrice])


	// Update Price Range

	const _onCleanFilter = () => {
		// handleRange("reset");
		handleCheckboxChange("")
	}
	const _onChecked = (idCate, isChecked) => {
		handleCheckboxChange(idCate, isChecked)
	}
	return (
		<aside className="col-lg-3 order-lg-first" >
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
								{categories?.length > 0 && categories?.map(({ id, slug, name, checked, qty = 0, ...item }, index) => {
									const isChecked = activeCate.includes(id) || false;
									return (
										<div className="filter-item" key={id || index}>
											<div className="custom-control custom-checkbox">
												<input type="checkbox" className="custom-control-input"
													id={slug} defaultValue={slug}
													checked={isChecked}
													onChange={(e) => handleCheckboxChange(id, e?.target.checked)} />
												<label className="custom-control-label" htmlFor={slug}>{name}</label>
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

// eslint-disable-next-line react-refresh/only-export-components
export default AsideProductSection

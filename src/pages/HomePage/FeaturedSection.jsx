import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFeatured } from '../../store/actions';

const owlOptions = {
	"nav": true,
	"dots": false,
	"margin": 20,
	"loop": false,
	"responsive": {
		"0": {
			"items": 2
		},
		"480": {
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

const FeaturedSection = ({ categories }) => {
	const dispatch = useDispatch();

	const _onSelectCate = (e, slug) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(updateFeatured(slug))
	};
	return (
		<div className="container top">
			<div className="heading heading-flex mb-3">
				<div className="heading-left">
					<h2 className="title">Featured Products</h2>
				</div>
				<div className="heading-right">
					<ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
						{
							categories?.map(({ name, slug }, key) => (
								<li className="nav-item" key={key}>
									<a className="nav-link" href="#top-all-tab" onClick={(e) => _onSelectCate(e, slug)}>{name}</a>
								</li>
							))
						}

					</ul>
				</div>
			</div>
			<div className="tab-content tab-content-carousel just-action-icons-sm">
				<div className="tab-pane p-0 fade show active" id="top-all-tab" role="tabpanel" aria-labelledby="top-all-link">
					<div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options={JSON.stringify(owlOptions)}>

					</div>
				</div>
			</div>
		</div>

	)
}

export default FeaturedSection
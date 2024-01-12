import React, { useEffect } from 'react';
import owlCarousels from '../../utils/owlCarousels';
const owlOptions = {
	"nav": false,
	"dots": false,
	"margin": 30,
	"loop": false,
	"responsive": {
		"0": {
			"items": 2
		},
		"420": {
			"items": 3
		},
		"600": {
			"items": 4
		},
		"900": {
			"items": 5
		},
		"1024": {
			"items": 6
		}
	}
};

const BrandSection = ({ brands }) => {
	useEffect(() => {
		owlCarousels()
	}, []);
	return (
		<div className="container">
			{brands?.length > 0 && (
				<div className="owl-carousel mt-5 mb-5 owl-simple" data-toggle="owl" data-owl-options={JSON.stringify(owlOptions)}>
					{
						brands?.map((item, index) => (
							<div className="brand" key={index}>
								<img src={item} alt="Brand Name" />
							</div>
						))
					}

				</div>
			)}
		</div>
	)
}

export default BrandSection
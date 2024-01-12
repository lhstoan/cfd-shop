import React, { useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

const HeaderMiddle = () => {
	const { handleOpenMenu } = useMainContext()

	useEffect(() => {
		// Header Search Toggle

		var $searchWrapper = $('.header-search-wrapper'),
			$body = $('body'),
			$searchToggle = $('.search-toggle');

		$searchToggle.on('click', function (e) {
			$searchWrapper.toggleClass('show');
			$(this).toggleClass('active');
			$searchWrapper.find('input').focus();
			e.preventDefault();
		});

		$body.on('click', function (e) {
			if ($searchWrapper.hasClass('show')) {
				$searchWrapper.removeClass('show');
				$searchToggle.removeClass('active');
				$body.removeClass('is-search-active');
			}
		});

		$('.header-search').on('click', function (e) {
			e.stopPropagation();
		});

		// Sticky header 
		var catDropdown = $('.category-dropdown'),
			catInitVal = catDropdown.data('visible');

		if ($('.sticky-header').length && $(window).width() >= 992) {
			var sticky = new Waypoint.Sticky({
				element: $('.sticky-header')[0],
				stuckClass: 'fixed',
				offset: -300,
				handler: function (direction) {
					// Show category dropdown
					if (catInitVal && direction == 'up') {
						catDropdown.addClass('show').find('.dropdown-menu').addClass('show');
						catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'true');
						return false;
					}

					// Hide category dropdown on fixed header
					if (catDropdown.hasClass('show')) {
						catDropdown.removeClass('show').find('.dropdown-menu').removeClass('show');
						catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'false');
					}
				}
			});
		}

		// Menu init with superfish plugin
		if ($.fn.superfish) {
			$('.menu, .menu-vertical').superfish({
				popUpSelector: 'ul, .megamenu',
				hoverClass: 'show',
				delay: 0,
				speed: 80,
				speedOut: 80,
				autoArrows: true
			});
		}

	}, []);

	return (
		<div className="header-middle sticky-header">
			<div className="container">
				<div className="header-left">
					<button className="mobile-menu-toggler" onClick={handleOpenMenu}>
						<span className="sr-only">Toggle mobile menu</span>
						<i className="icon-bars" />
					</button>
					<a href="index.html" className="logo">
						<img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
					</a>
				</div>
				<nav className="main-nav">
					<ul className="menu">
						<li className="active">
							<a href="index.html">Home</a>
						</li>
						<li>
							<a href="about.html">About Us</a>
						</li>
						<li>
							<a href="product.html">Product</a>
						</li>
						<li>
							<a href="blog.html">Blog</a>
						</li>
						<li>
							<a href="contact.html">Contact Us</a>
						</li>
					</ul>
				</nav>
				<div className="header-right">
					<div className="header-search">
						<a href="#" className="search-toggle" role="button" title="Search">
							<i className="icon-search" />
						</a>
						<form action="#" method="get">
							<div className="header-search-wrapper">
								<label htmlFor="q" className="sr-only">Search</label>
								<input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
							</div>
						</form>
					</div>
					<div className="dropdown cart-dropdown">
						<a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
							<i className="icon-shopping-cart" />
							<span className="cart-count">2</span>
						</a>
						<div className="dropdown-menu dropdown-menu-right">
							<div className="dropdown-cart-products">
								<div className="product">
									<div className="product-cart-details">
										<h4 className="product-title">
											<a href="product-detail.html">Beige knitted</a>
										</h4>
										<span className="cart-product-info">
											<span className="cart-product-qty">1</span> x $84.00 </span>
									</div>
									<figure className="product-image-container">
										<a href="product-detail.html" className="product-image">
											<img src="/assets/images/products/cart/product-1.jpg" alt="product" />
										</a>
									</figure>
									<a href="#" className="btn-remove" title="Remove Product">
										<i className="icon-close" />
									</a>
								</div>
								<div className="product">
									<div className="product-cart-details">
										<h4 className="product-title">
											<a href="product-detail.html">Blue utility</a>
										</h4>
										<span className="cart-product-info">
											<span className="cart-product-qty">1</span> x $76.00 </span>
									</div>
									<figure className="product-image-container">
										<a href="product-detail.html" className="product-image">
											<img src="/assets/images/products/cart/product-2.jpg" alt="product" />
										</a>
									</figure>
									<a href="#" className="btn-remove" title="Remove Product">
										<i className="icon-close" />
									</a>
								</div>
							</div>
							<div className="dropdown-cart-total">
								<span>Total</span>
								<span className="cart-total-price">$160.00</span>
							</div>
							<div className="dropdown-cart-action">
								<a href="cart.html" className="btn btn-primary">View Cart</a>
								<a href="checkout.html" className="btn btn-outline-primary-2">
									<span>Checkout</span>
									<i className="icon-long-arrow-right" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderMiddle
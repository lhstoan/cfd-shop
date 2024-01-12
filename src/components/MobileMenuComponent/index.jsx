import React, { useState } from 'react'
import { useMainContext } from '../../context/MainContext'

const MENUS = {
	menu: "menu",
	cate: "categories"
}
const MobileMenuComponent = () => {
	const { handleCloseMenu } = useMainContext()
	const [selectedTab, setSelectedTab] = useState(MENUS.menu);

	const _onTabChange = (e, tab) => {
		e?.preventDefault();
		setSelectedTab(tab)
	}
	return (
		<>
			<div className="mobile-menu-container">
				<div className="mobile-menu-wrapper">
					<span className="mobile-menu-close" onClick={handleCloseMenu}><i className="icon-close" /></span>
					<form action="#" method="get" className="mobile-search">
						<label htmlFor="mobile-search" className="sr-only">Search</label>
						<input type="search" className="form-control" name="mobile-search" id="mobile-search" placeholder="Search in..." required />
						<button className="btn btn-primary" type="submit"><i className="icon-search" /></button>
					</form>
					<ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" href="#mobile-menu-tab">Menu</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#mobile-cats-tab" >Categories</a>
						</li>
					</ul>
					<div className="tab-content">
						<div className="tab-pane fade show active" id="mobile-menu-tab" role="tabpanel" aria-labelledby="mobile-menu-link">
							<nav className="mobile-nav">
								<ul className="mobile-menu">
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
							</nav>{/* End .mobile-nav */}
						</div>{/* .End .tab-pane */}
						<div className="tab-pane fade" id="mobile-cats-tab" role="tabpanel" aria-labelledby="mobile-cats-link">
							<nav className="mobile-cats-nav">
								<ul className="mobile-cats-menu">
									<li><a className="mobile-cats-lead" href="#">TV</a></li>
									<li><a href="#">Computers</a></li>
									<li><a href="#">Tablets &amp; Cell Phones</a></li>
									<li><a href="#">Smartwatches</a></li>
									<li><a href="#">Accessories</a></li>
								</ul>{/* End .mobile-cats-menu */}
							</nav>{/* End .mobile-cats-nav */}
						</div>{/* .End .tab-pane */}
					</div>{/* End .tab-content */}
					<div className="social-icons">
						<a href="#" className="social-icon" target="_blank" title="Facebook"><i className="icon-facebook-f" /></a>
						<a href="#" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter" /></a>
						<a href="#" className="social-icon" target="_blank" title="Instagram"><i className="icon-instagram" /></a>
						<a href="#" className="social-icon" target="_blank" title="Youtube"><i className="icon-youtube" /></a>
					</div>{/* End .social-icons */}
				</div>{/* End .mobile-menu-wrapper */}
			</div>{/* End .mobile-menu-container */}
		</>
	)
}

export default MobileMenuComponent
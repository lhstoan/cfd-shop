import React from 'react'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import AsideProductSection from './AsideProductSection'
import NavigationSection from './NavigationSection'
import ProductSection from './ProductSection'
import ToolboxSection from './ToolboxSection'
import useProdcutPage from './useProdcutPage'

const ProductPage = () => {
	const { asideProps } = useProdcutPage();

	return (
		<main className="main">
			<div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
				<div className="container">
					<h1 className="page-title">Product</h1>
				</div>
			</div>
			<nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
				<div className="container">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to={PATHS.HOME}>Home</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">Product</li>
					</ol>
				</div>
			</nav>
			<div className="page-content">
				<div className="container">
					<div className="row">
						<div className="col-lg-9">
							<ToolboxSection />
							<ProductSection />
							<NavigationSection />
						</div>
						<AsideProductSection {...asideProps} />
					</div>
				</div>
			</div>
		</main>


	)
}

export default ProductPage
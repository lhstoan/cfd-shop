import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/BreadcrumbComponent'
import PATHS from '../../constants/paths'
import AsideProductSection from './AsideProductSection'
import NavigationSection from './NavigationSection'
import ProductSection from './ProductSection'
import ToolboxSection from './ToolboxSection'
import useProductPage from './useProductPage'

const ProductPage = () => {
	const { productProps, asideProps, toolboxProps, navigationProps } = useProductPage();

	return (
		<main className="main">
			<div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
				<div className="container">
					<h1 className="page-title">Product</h1>
				</div>
			</div>

			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to={PATHS.HOME}>Home</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item isActive>Product</Breadcrumb.Item>
			</Breadcrumb>

			<div className="page-content">
				<div className="container">
					<div className="row">
						<div className="col-lg-9">
							<ToolboxSection {...toolboxProps} />
							<ProductSection {...productProps} />
							<NavigationSection {...navigationProps} />
						</div>
						<AsideProductSection {...asideProps} />
					</div>
				</div>
			</div>
		</main>


	)
}

export default ProductPage
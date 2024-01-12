import React from 'react';
import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent';
import PATHS from '../../constants/paths';


const Content = styled.div`
	background-image: url("/assets/images/backgrounds/error-bg.jpg");
`
const Page404 = () => {
	return (
		<main className="main">
			<Content className="error-content text-center">
				<div className="container">
					<h1 className="error-title">Error 404</h1>
					<p>We are sorry, the page you've requested is not available.</p>
					<ButtonComponent toLink={PATHS.HOME} size="lg" style="primary-2" ><span>BACK TO HOMEPAGE</span><i className="icon-long-arrow-right"></i></ButtonComponent>
				</div>
			</Content>
		</main>
	)
}

export default Page404
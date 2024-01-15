import { useRef, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";

const useProductPage = () => {
	const { data: productsData } = useQuery(productService.getProducts)
	const { data: categoriesData } = useQuery(productService.getCategories);

	const products = productsData?.products || [];
	const categories = categoriesData?.products || [];


	const asideRef = useRef()
	console.log("asideRef", asideRef);
	//Toolbox Section
	const asideProps = {
		categories: [{ name: "All", slug: "all" }, ...categories],
		products,

	};

	return {
		productsData,
		asideProps, asideRef
	}
}

export default useProductPage
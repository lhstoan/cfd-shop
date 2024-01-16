import { useState } from "react";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";

const useProdcutPage = () => {
	const { data: productsData } = useQuery(productService.getProducts)
	const { data: categoriesData } = useQuery(productService.getCategories);

	const products = productsData?.products || [];
	const categories = categoriesData?.products || [];

	const [selectedCateSlug, setSelectedCateSlug] = useState("all");

	const featureProducts =
		selectedCateSlug === "all"
			? [...(products || [])]
			: products?.filter(
				(product) => product?.category?.slug === selectedCateSlug
			);

	//Toolbox Section
	const asideProps = {
		categories: [{ name: "All", slug: "all" }, ...categories],
		featureProducts,
		products
	};

	return {
		productsData,
		asideProps
	}
}

export default useProdcutPage
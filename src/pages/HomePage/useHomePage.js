import { useSelector } from 'react-redux';
import { productService } from '../../services/productService';
import useQuery from './../../hooks/useQuery';
import { pageService } from './../../services/pageServices';


const useHomePage = () => {
	// API Handling
	const { data: productsData } = useQuery(productService.getProducts)
	const { data: categoriesData } = useQuery(productService.getCategories);
	const products = productsData?.products || [];
	const categories = categoriesData?.products || [];
	const featuredProducts = products?.filter((product) => product.featured) || [];
	const onSaleProducts = products?.filter((product) => product.onSale) || [];
	const dealProducts = onSaleProducts.filter((product) => product.discount > 0) || [];
	// const topRatedProducts = products?.filter((product) => product.topRated) || [];
	const topRatedProducts = products?.filter((product) => product.rating >= 4) || [];

	const { data: homeData } = useQuery(() =>
		pageService.getPageDataByName("home")
	);
	const brands = homeData?.data?.brands || [];

	// Intro Section
	const introProducts = featuredProducts.slice(0, 3);
	const introProps = {
		introProducts,
	};

	// Hot Product Section
	const hotProductProps = {
		featuredProducts,
		onSaleProducts,
		topRatedProducts,
	};
	// Deal Section
	const dealProps = {
		dealProducts,
	};

	// Brands Section
	const brandProps = {
		brands,
	};

	// Featured Section


	// const [selectedCateSlug, setSelectedCateSlug] = useState("all");
	const cateSlug = useSelector(((state) => state.featured));
	console.log(cateSlug);
	const featuredProps = {
		categories: [{ name: "All", slug: "all" }, ...categories],
	}


	return {
		introProps,
		hotProductProps,
		dealProps,
		brandProps,
		featuredProps
	}
};

export default useHomePage;

export const getImage = (images, defaultImg = "") => {
	return images?.map(img => img !== "" ? img : null).find(img => img !== null) || defaultImg;
}

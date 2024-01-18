import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetProduct } from "../../store/reducers/productReducer";

const useProductPage = () => {
	const dispatch = useDispatch();
	const { product: productData, categories: initCate } = useSelector(((state) => state.product));
	const [listChecked, setListChecked] = useState(initCate);

	useEffect(() => {
		dispatch(handleGetProduct())
	}, [])


	const products = productData?.product?.products || [];

	const [selectedCateSlug, setSelectedCateSlug] = useState("all");

	let featureProducts = [];

	console.log('initCate', initCate)
	console.log('listChecked', listChecked)
	//Toolbox Section

	const handleCheckboxChange = (e) => {
		const slugCate = e.target.value;
		setListChecked((prevList) =>
			prevList.map((cate) => {
				if (slugCate === "all") {
					return { ...cate, checked: true }
				} else {
					return cate?.slug === slugCate ? { ...cate, checked: !cate.checked } : cate
				}
			}
			)
		);
	};

	// filter options
	const listCateFilter = listChecked?.filter((item) => item.checked === true);
	featureProducts = listCateFilter?.flatMap((item) => {
		return products.filter((product) => (product.category.slug === item.slug))
	});

	const asideProps = {
		categories: listChecked,
		products,
		handleCheckboxChange
	};

	const productProps = {
		featureProducts
	}
	const toolboxProps = {
		featureProducts
	}
	return {
		productProps,
		asideProps,
		toolboxProps
	}
}

export default useProductPage
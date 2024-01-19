import { message } from "antd";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SORT_OPTIONS } from "../../constants/general";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import useMutation from './../../hooks/useMutation';

const PRODUCT_LIMITS = 9;

const useProductPage = () => {

	const { search } = useLocation()
	const queryObject = queryString.parse(search);
	const [_, setSearchParams] = useSearchParams();

	const {
		data: productsData,
		loading: productsLoading,
		error: productsError,
		execute: fetchProducts,
	} = useMutation((query) =>
		productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
	);

	const {
		data: productForCate
	} = useQuery(productService.getProducts)


	const { data: categoriesData } = useQuery(productService.getCategories);

	const products = productsData?.products || [];
	const productsPagi = productsData?.pagination || {};
	const allProducts = productForCate?.products || [];
	const categories = categoriesData?.products || [];

	// const initCate = [{ id: "cat01", name: "All", slug: "all" }, ...categories].map(({ id, slug, name, ...cate }) => {
	// 	const qty = allProducts?.filter((item) => item?.category?.slug === slug).length || allProducts.length;
	// 	return { id, slug, name, qty: qty, checked: false };
	// });

	const initCates = useMemo(() => {
		return [{ id: "cat01", name: "All", slug: "all" }, ...categories].map(({ id, slug, name, ...cate }) => {
			const qty = allProducts?.filter((item) => item?.category?.slug === slug).length || allProducts.length;
			const check = slug === "all" ? true : false;
			return { id, slug, name, qty: qty, checked: check, ...cate };
		});
	}, [categories, allProducts]);


	const [cateList, setCateList] = useState(() => (initCates));

	useEffect(() => {
		fetchProducts(search, {
			onSuccess: async () => { },
			onFail: () => { },
		});
	}, [search]);


	// General Functions
	const updateQueryString = (queryObject) => {
		const newQueryString = queryString.stringify({
			...queryObject,
			limit: PRODUCT_LIMITS,
		});
		setSearchParams(new URLSearchParams(newQueryString));
	};

	// Pagination Props
	const onPagiChange = (page) => {
		updateQueryString({ ...queryObject, page: page });
	};

	const productProps = {
		isLoading: productsLoading,
		isError: !!productsError,
		products,
	}
	const navigationProps = {
		page: Number(productsPagi.page || queryObject.page || 1),
		limit: Number(productsPagi.limit || 0),
		total: Number(productsPagi.total || 0),
		onPagiChange,
	}
	const activeSort = useMemo(() => {
		return (
			Object.values(SORT_OPTIONS).find((otpion) => (
				otpion.queryObject.orderBy === queryObject.orderBy
				&& otpion.queryObject.order === queryObject.order
			)))?.value || SORT_OPTIONS?.popularity
	}, [queryObject])

	const onSortChange = (sortType) => {
		const sortBy = SORT_OPTIONS[sortType]?.queryObject;
		updateQueryString(
			{
				...queryObject,
				...sortBy,
				page: 1
			}
		);
		message.success(`Sort by: ${SORT_OPTIONS[sortType]?.label} !!!`)
	}

	const toolboxProps = {
		showNumb: products?.length,
		totalProduct: productsPagi?.total,
		activeSort,
		onSortChange
	}

	const rangePrice = {
		min: 0,
		max: 100
	}

	allProducts?.map(({ price }) => {
		if (rangePrice.min > price) {
			rangePrice.min = price;
		}
		if (rangePrice.max < price) {
			rangePrice.max = price;
		}
		return null;
	})


	const handleCheckboxChange = (cate) => {
		setCateList((initCate) => {
			initCate.map((item) => {
				return item.slug === cate ? { ...item, checked: !item.checked } : item
			})
		})
	}


	const handleRange = (range) => {

	}


	const asideProps = {
		categories: initCates,
		rangePrice,
		marginValue: Math.ceil((rangePrice.max - rangePrice.min) * (20 / 100)),
		handleCheckboxChange,
		handleRange
	};

	return {
		productProps,
		asideProps,
		toolboxProps,
		navigationProps
	}
}

export default useProductPage
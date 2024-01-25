import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCartPage = () => {
	const dispatch = useDispatch();
	const { cartInfo, loading } = useSelector((state) => state.cart)
	const qtyRef = useRef();

	const ListProductProps = {
		...cartInfo,
		qtyRef
	}
	const AsideProductCartProps = {

	}
	return {
		ListProductProps, AsideProductCartProps
	}
}

export default useCartPage
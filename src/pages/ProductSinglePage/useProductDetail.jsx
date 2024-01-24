import { message } from 'antd'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MODAL_TYPES } from '../../constants/general'
import { VALIDATE_MSG } from '../../constants/validate'
import useQuery from '../../hooks/useQuery'
import { productService } from '../../services/productService'
import { handleShowModal } from '../../store/reducers/authReducer'
import { handleAddToCart } from '../../store/reducers/cartReducer'
import tokenMethod from '../../utils/token'

const useProductDetail = () => {
	const { profile } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const { slug } = useParams()
	const colorRef = useRef()
	const qtyRef = useRef()

	const { data: productSingleData } = useQuery(
		() => productService.getProductBySlug(slug), [slug]
	)
	const { id, name, price, discount } = productSingleData || {};
	const checkWishList = profile?.whiteList?.filter((item) => item === id)
	const { data: reviewData } = useQuery(
		() => id && productService.getProductReview(id), [id]
	)

	const handleAddCart = async () => {
		if (tokenMethod.get()) {

			const { value: color, reset: colorReset } = colorRef.current || {};
			const { value: qty, reset: qtyReset } = qtyRef.current || {};

			//check value from ref
			if (!color) {
				message.error(VALIDATE_MSG.color)
				return;
			} else if (isNaN(qty) && qty > 1) {
				message.error(VALIDATE_MSG.qty)
				return;
			}
			//call api from dispatch store
			const addPayload = {
				addID: id,
				addColor: color,
				addQty: qty,
				addPrice: price - discount
			}

			try {
				const res = await dispatch(handleAddToCart(addPayload)).unwrap();
				if (res) {
					//reset default value
					colorReset?.();
					qtyReset?.();
				}
			} catch (error) {
				console.log('error :>> ', error);
			}
		} else {
			dispatch(handleShowModal(MODAL_TYPES.login))
		}

	}

	const handleAddWishlist = () => {
		console.log('handleAddWishlist ');
	}

	const productSingleTopProps = {
		...productSingleData,
		wishlist: checkWishList?.length > 0 ? true : false,
		colorRef,
		qtyRef,
		handleAddCart

	}
	const productSingleBotProps = {
		...productSingleData,
		reviewData
	}
	return {
		productName: name,
		colorRef,
		qtyRef,
		productSingleTopProps,
		productSingleBotProps
	}
}

export default useProductDetail
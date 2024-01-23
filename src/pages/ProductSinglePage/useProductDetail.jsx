import { message } from 'antd'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { VALIDATE_MSG } from '../../constants/validate'
import useQuery from '../../hooks/useQuery'
import cartService from '../../services/cartService'
import { productService } from '../../services/productService'

const useProductDetail = () => {
	const { slug } = useParams()
	const colorRef = useRef()
	const qtyRef = useRef()

	const { data: productSingleData } = useQuery(
		() => productService.getProductBySlug(slug), [slug]
	)
	const { id, name, price, discount } = productSingleData || {};

	const { data: reviewData } = useQuery(
		() => id && productService.getProductReview(id), [id]
	)

	const handleAddCart = async () => {
		const { value: color, reset: colorReset } = colorRef.current || {};
		const { value: qty, reset: qtyReset } = qtyRef.current || {};

		//check value from ref
		if (!color) {
			message.error(VALIDATE_MSG.color)
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
			const res = await cartService.updateCart(addPayload).unwrap();
			if (res) {
				//reset default value
				colorReset?.();
				qtyReset?.();
			}
		} catch (error) {
			console.log('error :>> ', error);
		}

	}

	const handleAddWishlist = () => {
		console.log('handleAddWishlist ');
	}

	const productSingleTopProps = {
		...productSingleData,
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
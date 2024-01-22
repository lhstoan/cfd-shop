import { message } from 'antd'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import { productService } from '../../services/productService'

const useProductDetail = () => {
	const { slug } = useParams()
	const colorRef = useRef()
	const qtyRef = useRef()

	const { data: productSingleData } = useQuery(
		() => productService.getProductBySlug(slug), [slug]
	)
	const { id, name, description, shippingReturn } = productSingleData || {};
	console.log(productSingleData);
	const { data: reviewData } = useQuery(
		() => id && productService.getProductReview(id), [id]
	)
	const handleAddCart = () => {
		const { value: color, reset: colorReset } = colorRef.current || {};
		const { value: qty, reset: qtyReset } = qtyRef.current || {};

		if (!color) {
			message.error("Please select color!")
		} else if (isNaN(qty) && qty > 1) {
			message.error("Quantity must be greater than 1!")
			return;
		}

		colorReset?.();
		qtyReset?.();
	}


	const productSingleTopProps = {
		...productSingleData
	}
	const productSingleBotProps = {
		product: productSingleData
	}
	return {
		productSingleTopProps,
		productSingleBotProps
	}
}

export default useProductDetail
import useQuery from '../../hooks/useQuery'
import { productService } from '../../services/productService'

const useProductDetail = () => {
	const { slug } = useParams()

	const { data: productSingleData } = useQuery(
		productService.getProductBySlug(slug)
	)
	const productSingleTopProps = {
		product: productSingleData
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
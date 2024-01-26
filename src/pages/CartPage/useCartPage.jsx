import { Modal } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductColor from '../../components/ProductColor';
import { handleRemoveItemCart, handleUpdateItemCart } from '../../store/reducers/cartReducer';
import { sumArrayNumber } from '../../utils/calculate';
import { formatCurrency } from '../../utils/format';

const useCartPage = () => {
	const dispatch = useDispatch();
	const { cartInfo, loading } = useSelector((state) => state.cart)
	const { product, quantity, variant, totalProduct, subTotal, discount, shipping, total } = cartInfo || {};
	const qtyRef = useRef([]);
	const updateQtyTimeout = useRef()
	const updateShippingTimeout = useRef()
	const { value: qty, reset: qtyReset } = qtyRef.current || {};
	const { confirm } = Modal

	const handleUpdateQty = (qtyUpdate, updateIndex) => {
		const _modifyPayload = () => {
			const newQty = quantity?.map((qty, index) => index === updateIndex ? qtyUpdate : qty)
			const newTotalProduct = totalProduct?.map((total, index) => index === updateIndex ? product?.[updateIndex].price * qtyUpdate : total);
			const newSubTotal = sumArrayNumber(newTotalProduct)
			const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0)
			return {
				...cartInfo,
				product: product?.map(({ id }) => id),
				quantity: newQty,
				totalProduct: newTotalProduct,
				subTotal: newSubTotal,
				total: newTotal,
			}
		}

		if (updateQtyTimeout.current) {
			clearTimeout(updateQtyTimeout.current)
		}
		updateQtyTimeout.current = setTimeout(async () => {
			if (!loading && qtyUpdate !== "" && quantity[updateIndex] !== qtyUpdate) {
				const updatePayload = _modifyPayload();
				try {
					const res = await dispatch(handleUpdateItemCart(updatePayload)).unwrap();
				} catch (error) {
					qtyRef.current[updateIndex]?.reset?.();
				}
			}

		}, 500);
	}

	const handleRemoveProduct = (productIndex) => {
		const { name, price } = product?.[productIndex] || {}
		const qty = quantity?.[productIndex] || {}
		const color = variant[productIndex] || {};
		confirm({
			title: "Do you want remove this item form cart?",
			content: (
				<>
					<p>{`${name || ""}`}</p>
					<p>{`${qty || 0} x $${formatCurrency(price)}`}</p>
					<p style={{ display: "flex" }}>Color: {<ProductColor colors={[color]} />}</p>
				</>
			),
			onOk() {
				if (loading || productIndex < 0) return;
				dispatch(handleRemoveItemCart({ productIndex }))
			},
		})
	}

	const handleUpdateShipping = (updateValue) => {
		const { typeShip, price: priceShipping } = updateValue || "";
		const newShipping = {
			typeShip: typeShip,
			price: priceShipping
		}
		const newTotal = subTotal - (discount ?? 0) + (priceShipping ?? 0)

		const updatePayload = {
			...cartInfo,
			product: product?.map(({ id }) => id),
			total: newTotal,
			shipping: newShipping
		}

		if (updateShippingTimeout.current) {
			clearTimeout(updateShippingTimeout.current)
		}
		updateShippingTimeout.current = setTimeout(async () => {
			try {
				const res = await dispatch(handleUpdateItemCart(updatePayload)).unwrap();
			} catch (error) {
				console.log(error);
			}
		}, 500);
	}


	const ListProductProps = {
		products: product?.map((item, index) => {
			return { ...item, quantity: quantity[index], color: variant[index], totalProduct: totalProduct[index] }
		}) || [],
		qtyRef,
		handleUpdateQty,
		handleRemoveProduct
	}
	const AsideProductCartProps = {
		subTotal, total, shipping,
		handleUpdateShipping
	}
	return {
		ListProductProps, AsideProductCartProps
	}
}

export default useCartPage
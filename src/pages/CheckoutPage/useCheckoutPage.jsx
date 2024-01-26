import { message } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { VALIDATE_MSG } from "../../constants/validate";
import { orderService } from "../../services/orderService";
import { getCart, updateCacheCart } from "../../store/reducers/cartReducer";

const useCheckoutPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { cartInfo, loading } = useSelector((state) => state.cart)
	const { profile } = useSelector((state) => state.auth)
	const { product, quantity, variant, totalProduct, subTotal, discount, shipping, total, discountCode } = cartInfo || {};
	const formCheckoutRef = useRef()


	const handleAddCoupon = async (discountCodeAdd) => {
		if (discountCodeAdd) {
			try {
				const discountRes = await orderService.getVoucher(discountCodeAdd);
				const discountInfo = discountRes?.data?.data
				if (discountInfo) {
					const { value, code } = discountInfo || {};
					const { price } = shipping || {}
					dispatch(updateCacheCart({
						...cartInfo,
						discount: value || 0,
						discountCode: code || "",
						total: subTotal - (value ?? 0) + (price ?? 0)
					}))
					message.success(VALIDATE_MSG.couponOn)
				}
			} catch (error) {
				const { message: msg, statusCode } = error?.response?.data || {};
				if (statusCode === 400) {
					message.error(msg)
				} else {
					message.error(VALIDATE_MSG.couponOff)
				}

			}
		}
	}
	const handleRemoveCoupon = () => {
		if (discountCode) {
			try {
				const { price } = shipping || {}
				dispatch(updateCacheCart({
					...cartInfo,
					discount: 0,
					discountCode: "",
					total: subTotal - + (price ?? 0)
				}))
				message.success(VALIDATE_MSG.removeOn)

			} catch (error) {
				message.error(VALIDATE_MSG.removeOff)
			}
		}
	}

	const handleChangePayment = (payment) => {
		console.log(payment);
	}
	const handleSubmitFormCheckout = async (checkoutInfo) => {
		const { formInfo, cartInfo } = checkoutInfo || ""
		const { id, shipping, variant, subTotal, total, product, quantity, totalProduct, discount, discountCode } = cartInfo || "";
		const { phone, email, firstName, province, district, ward, street, note, paymentMethod } = formInfo || ""

		const checkoutPayload = {
			address: {
				phone,
				email,
				fullName: firstName,
				street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${province?.label || ""}`,
			},
			shipping,
			variant,
			subTotal,
			total,
			product: product?.map(({ id }) => id) || [],
			quantity,
			totalProduct,
			discount,
			discountCode,
			paymentMethod,
		}
		try {
			const checkoutRes = await orderService.checkout(checkoutPayload)
			const dataRes = checkoutRes?.data?.data;
			if (dataRes) {
				dispatch(getCart())
				message.success("Checkout successfully!!!")
				const pathNav = PATHS.CHECKOUT_SUCCESS + `?orderId=${id}`;
				navigate(pathNav)
			} else {
				message.success("Checkout unsuccessfully!!!")
			}
		} catch (error) {
			message.success("Checkout unsuccessfully!!!")
		}

	}


	const discountCheckoutProps = {
		addCoupon: discountCode,
		handleAddCoupon,
		handleRemoveCoupon
	}
	const summaryProps = {
		products: product?.map((item, index) => {
			return { ...item, quantity: quantity[index], color: variant[index], totalProduct: totalProduct[index] }
		}) || [],
		discountCode,
		discount,
		subTotal, shipping, total,
		handleChangePayment,
		handleSubmitFormCheckout
	}

	const formCheckoutProps = {
		handleSubmitFormCheckout,
		products: product?.map((item, index) => {
			return { ...item, quantity: quantity[index], color: variant[index], totalProduct: totalProduct[index] }
		}) || [],
		profile,
		...cartInfo
	}
	return {
		formCheckoutProps, discountCheckoutProps
	}
}

export default useCheckoutPage
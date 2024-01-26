import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ButtonComponent from './../../components/ButtonComponent/index';
import { VALIDATE_MSG } from './../../constants/validate';

const FormCoupon = styled.div`
	display: flex;
	margin-bottom: 40px;
	.checkout-discount{
		width: 400px;
		margin-bottom: 0;
		.form-control{
			height: 50px;
			margin-bottom: 0;
		}
	}
	.form-error{
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
	}
	button{
		height: 50px;
		margin-left: 10px;
	}
`
const DiscountCheckout = ({ addCoupon, handleAddCoupon, handleRemoveCoupon }) => {
	useEffect(() => {
		$('#checkout-discount-input').on('focus', function () {
			// Hide label on focus
			$(this).parent('form').find('label').css('opacity', 0);
		}).on('blur', function () {
			// Check if input is empty / toggle label
			var $this = $(this);

			if ($this.val().length !== 0) {
				$this.parent('form').find('label').css('opacity', 0);
			} else {
				$this.parent('form').find('label').css('opacity', 1);
			}
		});
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues: {
			discountCode: addCoupon,
		}
	})
	useEffect(() => {
		reset({
			discountCode: addCoupon,
		})
	}, [addCoupon]);

	const _onSubmit = ({ discountCode }) => {
		if (discountCode) {
			handleAddCoupon?.(discountCode)
		}
	}
	return (
		<FormCoupon>
			<div className="checkout-discount">
				<form action="#">
					<input type="text" className="form-control"
						id="checkout-discount-input"
						{...register("discountCode", {
							required: VALIDATE_MSG.req
						})} />
					<label htmlFor="checkout-discount-input" className="text-truncate" style={{ opacity: addCoupon ? 0 : 1 }}>
						Have a coupon? <span>Click here to enter your code</span>
					</label>
					{errors?.discountCode && <p className="form-error">{errors?.discountCode?.message}</p>}
				</form>
			</div>
			{addCoupon ? (
				<ButtonComponent style="primary-2" onClick={handleRemoveCoupon}>Remove Coupon</ButtonComponent>
			) : (
				<ButtonComponent style="primary" onClick={handleSubmit(_onSubmit)}>Add Coupon</ButtonComponent>
			)}
		</FormCoupon >
	)
}

export default DiscountCheckout
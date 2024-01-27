import { Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/InputComponent/Input'
import TextArea from '../../components/InputComponent/TextArea'
import { PAYMENTS, TYPESHIP } from '../../constants/general'
import PATHS from '../../constants/paths'
import { REGEXP, VALIDATE_MSG } from '../../constants/validate'
import useAddress from '../../hooks/useAddress'
import fnClass from './../../utils/fnClass'
import { formatCurrency, removeAccents } from './../../utils/format'
import nameColor from './../../utils/nameColor'

const SelectContainer = styled.div`
	.customSelect {
		width: 100%;
		height: 40px;
	}
`
const FormContainer = styled.div`
	.form-error{
		line-height: 1;
		margin-top: 10px;
		margin-bottom: 10px;
	}

`

const FormCheckout = ({ handleSubmitFormCheckout, profile, ...cartInfo }) => {

	const [card, setCard] = useState(PAYMENTS[0].id)
	const [data, setData] = useState([])
	const { products, shipping, subTotal, discountCode, discount, total } = cartInfo || {}
	const { firstName, street, email, phone, province, district, ward } = profile || {};
	const { typeShip } = shipping || "";

	const {
		provinces,
		districts,
		wards,
		provinceID,
		districtID,
		wardID,
		handleProvinceChange,
		handleDistrictChange,
		handleWardChange,
	} = useAddress()

	const {
		register,
		handleSubmit,
		reset,
		control,
		getValues,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			fullName: firstName,
			street: street,
			email: email,
			phone: phone,
			note: "",
			province,
			district,
			ward
		}
	})

	useEffect(() => {
		if (!profile) return;

		reset?.({
			fullName: firstName,
			street,
			email,
			phone,
			province,
			district,
			ward
		})
		handleProvinceChange?.(province)
		handleDistrictChange?.(district)
		handleWardChange?.(ward)
	}, [profile]);

	const _onChangeCard = (e, cardChange) => {
		e?.preventDefault();
		e?.stopPropagation();
		setCard(cardChange)
	}

	const _onSubmitFormCheckout = (data) => {
		if (!card) {
			message.error("Please select ")
			return;
		}
		const formData = {
			...data,
			province: provinces?.find((item) => item.value === provinceID),
			district: districts?.find((item) => item.value === districtID),
			ward: wards?.find((item) => item.value === wardID),
			paymentMethod: card
		}
		handleSubmitFormCheckout?.({
			formInfo: formData,
			cartInfo
		})
	}

	return (
		<FormContainer className="checkout-form">
			<div className="row">

				<div className="col-lg-9">
					<h2 className="checkout-title">Billing Details</h2>
					<div className="row">
						<Input
							className="col-sm-4"
							label="Full Name"
							error={errors?.fullName?.message}
							isRequired
							{...register("fullName", {
								required: VALIDATE_MSG.req
							})}
						/>
						<Input
							className="col-sm-4"
							label="Phone number"
							isRequired
							error={errors?.phone?.message}
							{...register("phone", {
								required: VALIDATE_MSG.req,
								pattern: {
									value: REGEXP.phone,
									message: VALIDATE_MSG.patternPhone
								}
							})}
						/>
						<Input
							className="col-sm-4"
							label="Email address"
							error={errors?.email?.message}
							isRequired
							{...register("email", {
								required: VALIDATE_MSG.req,
								pattern: {
									value: REGEXP.email,
									message: VALIDATE_MSG.patternEmail
								}
							})}
						/>
					</div>
					<div className="row mb-1">
						<div className="col-sm-4">
							<label>Province/City *</label>
							<SelectContainer >
								<Controller
									name="province"
									control={control}
									rules={{
										required: VALIDATE_MSG.req,
									}}
									render={({ formState: { errors }, field: { onChange, ref } }) => {
										const filterOption = (input, option) =>
											removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));
										const error = errors?.province?.message;

										const _onChanges = (event) => {
											setValue("province", event)
											handleProvinceChange?.(event)
											reset?.(
												{
													...getValues(),
													province: provinceID,
													district: undefined,
													ward: undefined
												}
											)
										};

										return (
											<>
												<Select
													ref={ref}
													showSearch
													className="customSelect"
													placeholder="Select a Province/City"
													optionFilterProp="children"
													onChange={_onChanges}
													filterOption={filterOption}
													options={provinces}
													value={provinceID}
												/>
												{error && <p className="form-error">{error}</p>}
											</>
										)
									}}
								/>
							</SelectContainer>
						</div>
						<div className="col-sm-4">
							<label>District/Town *</label>
							<SelectContainer >
								<Controller
									name='district'
									control={control}
									rules={{
										required: VALIDATE_MSG.req,
									}}
									render={({ formState: { errors }, field: { onChange, ref } }) => {
										const filterOption = (input, option) =>
											removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));
										const error = errors?.district?.message;

										const _onChange = (event) => {
											setValue("district", event)
											handleDistrictChange?.(event)
											reset?.(
												{
													...getValues(),
													district: districtID,
													ward: undefined
												}
											)
										};

										return (
											<>
												<Select
													ref={ref}
													showSearch
													className="customSelect"
													placeholder="Select a District/Town"
													optionFilterProp="children"
													onChange={_onChange}
													filterOption={filterOption}
													options={districts}
													value={districtID}
												/>
												{error && <p className="form-error">{error}</p>}
											</>
										)
									}}
								/>
							</SelectContainer>
						</div>

						<div className="col-sm-4">
							<label>Ward *</label>
							<SelectContainer >
								<Controller
									name='ward'
									control={control}
									rules={{
										required: VALIDATE_MSG.req,
									}}
									render={({ formState: { errors }, field: { onChange, value, ref } }) => {
										const filterOption = (input, option) =>
											removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));
										const error = errors?.ward?.message;

										const _onChange = (event) => {
											setValue("ward", event)
											handleWardChange?.(event)
											reset?.(
												{
													...getValues(),
													ward: wardID
												}
											)
										};

										return (
											<>
												<Select
													ref={ref}
													showSearch
													className="customSelect"
													placeholder="Select a Ward"
													optionFilterProp="children"
													onChange={(ev) => {
														onChange(ev);
														_onChange(ev);
													}}
													filterOption={filterOption}
													options={wards}
													value={wardID}
												/>
												{error && <p className="form-error">{error}</p>}
											</>
										)
									}}
								/>
							</SelectContainer>
						</div>
					</div>
					<Input
						label="Street address"
						placeholder="House number and Street name"
						isRequired
						{...register("street", {
							required: VALIDATE_MSG.req
						})}
					/>
					<Input
						label="Order notes (optional)"
						placeholder="Notes about your order, e.g. special notes for delivery"
						renderProps={(inputProps) => (
							<TextArea
								className="form-control"
								{...inputProps}
							/>
						)}
						{...register("note")}
					/>
				</div>
				<aside className="col-lg-3">
					<div className="summary">
						<h3 className="summary-title">Your Order</h3>
						<table className="table table-summary">
							<thead>
								<tr>
									<th>Product</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{products?.length > 0 && products?.map(({ name, slug, totalProduct, quantity, color }, index) => {
									const productPath = PATHS.PRODUCTS.INDEX + `/${slug}`;
									return (
										<tr key={index}>
											<td>
												<Link to={productPath}>{name}</Link> - {nameColor(color)}  <b>x{quantity}</b>
											</td>
											<td>${formatCurrency(totalProduct)}</td>
										</tr>
									)
								})}
								<tr className="summary-subtotal">
									<td>Subtotal:</td>
									<td>${formatCurrency(subTotal)}</td>
								</tr>
								<tr>
									<td>Shipping:</td>
									<td>{TYPESHIP?.[typeShip]?.text} - ${formatCurrency(TYPESHIP?.[typeShip]?.value)}</td>
								</tr>
								{discountCode && (
									<tr>
										<td>Discount:</td>
										<td>{discountCode} - ${formatCurrency(discount)}</td>
									</tr>
								)}

								<tr className="summary-total">
									<td>Total:</td>
									<td>${formatCurrency(total)}</td>
								</tr>
							</tbody>
						</table>
						<div className="accordion-summary" id="accordion-payment">
							{PAYMENTS.map((payment) => {
								const { id: paymentID, label, description } = payment || "";
								return (
									<div className="card" key={paymentID}>
										<div className="card-header" id={`#${paymentID}`} >
											<h2 className="card-title">
												<a href={`#${paymentID}`} onClick={(e) => _onChangeCard(e, paymentID)} className={card === paymentID ? "" : "collapsed"}> {label}</a>
											</h2>
										</div>
										<div id={`#${paymentID}`} className={fnClass("collapse", { show: card === paymentID })} >
											<div className="card-body">{description}</div>
										</div>
									</div>
								)
							})}
						</div>
						<button type="submit" className="btn btn-outline-primary-2 btn-order btn-block" onClick={handleSubmit(_onSubmitFormCheckout)}>
							<span className="btn-text">Place Order</span>
							<span className="btn-hover-text">Proceed to Checkout</span>
						</button>
					</div>
				</aside >

			</div>
		</FormContainer>
	)
}

export default FormCheckout
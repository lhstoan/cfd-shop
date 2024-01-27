import { DatePicker, Select } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Input from '../../components/InputComponent/Input'
import { REGEXP, VALIDATE_MSG } from '../../constants/validate'
import useAddress from '../../hooks/useAddress'
import { handleUpdateProfile } from '../../store/reducers/authReducer'
import { removeAccents } from './../../utils/format'

const FormContainer = styled.div`
		.form-error{
		line-height: 1;
		margin-top: 10px;
		margin-bottom: 10px;
	}
`
const DatePickerContainer = styled.div`
	display: block;

	.DateCustome{
		width: 100%;
		height: 40px;
		border-radius: 0 !important;
	}
`
const SelectContainer = styled.div`
	.customSelect {
		width: 100%;
		height: 40px;
		border-radius: 0 !important;
		>*{
			border-radius: 0 !important;
		}

	}
`
const MyProfile = () => {
	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.auth)
	const { firstName, street, email, phone, province, district, ward, date, password } = profile || {};

	const {
		register,
		handleSubmit,
		reset,
		control,
		getValues,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			fullName: firstName,
			street,
			email: email,
			phone: phone,
			note: "",
			date: "",
		}
	})

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

	const _onSubmitFormProfiile = (data) => {
		console.log(data);
		const updateProfilePayload = {
			...data,
		}
		try {
			const updateRes = dispatch(handleUpdateProfile(updateProfilePayload)).unwrap()
		} catch (error) { /* empty */ }
	}

	return (
		<div className="tab-pane fade show active" >
			<FormContainer className="account-form">
				<div className="row">
					<Input
						className="col-sm-6"
						label="Full Name"
						error={errors?.fullName?.message}
						isRequired
						{...register("fullName", {
							required: VALIDATE_MSG.req
						})}
					/>
					<Input
						className="col-sm-6"
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
				<div className="row">
					<Input
						className="col-sm-6"
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
					<div className="col-sm-6">
						<label>Birthday *</label>
						<DatePickerContainer>
							<Controller
								name="birthday"
								control={control}
								rules={{
									required: VALIDATE_MSG.req,
								}}
								render={({ field }) => {
									const error = errors?.birthday?.message;
									const onChange = (date, dateString) => {
										setValue('birthday', dateString);
									};
									return (
										<>
											<DatePicker
												format="DD/MM/YYYY"
												className="DateCustome"
												defaultValue={date}
												onChange={onChange}
												{...field}
											/>
											{error && <p className="form-error">{error}</p>}
										</>

									)
								}}
							/>
						</DatePickerContainer>
					</div>

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
								render={({ field }) => {
									const filterOption = (input, option) =>
										removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));

									const error = errors?.province?.message;
									const _onChanges = (value, { onChange }) => {
										handleProvinceChange?.(value)
										// reset?.(
										// 	{
										// 		...getValues(),
										// 		district: undefined,
										// 		ward: undefined
										// 	}
										// )
										onChange(value);
										setValue("district", undefined)
										setValue("ward", undefined)
									};
									return (
										<>
											<Select
												{...field}
												showSearch
												className="customSelect"
												placeholder="Select a Province/City"
												optionFilterProp="children"
												onChange={(value, option) => _onChanges(value, field)}
												autoComplete="off"
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
								render={({ field }) => {
									const filterOption = (input, option) =>
										removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));
									const error = errors?.district?.message;
									const _onChange = (value, { onChange }) => {
										handleDistrictChange?.(value)
										onChange(value);
										setValue("ward", undefined)
									};

									return (
										<>
											<Select
												{...field}
												autoComplete="off"
												showSearch
												className="customSelect"
												placeholder="Select a District/Town"
												optionFilterProp="children"
												onChange={(value, option) => _onChange(value, field)}
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
								render={({ field }) => {
									const filterOption = (input, option) =>
										removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input.toLowerCase()));
									const error = errors?.ward?.message;
									const _onChange = (value, { onChange }) => {
										handleWardChange?.(value)
										// reset?.(
										// 	{
										// 		...getValues(),
										// 		ward: wardID
										// 	}
										// )
										onChange(value);
									};
									return (
										<>
											<Select
												{...field}
												showSearch
												className="customSelect"
												autoComplete="off"
												placeholder="Select a Ward"
												optionFilterProp="children"
												onChange={(value, option) => _onChange(value, field)}
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
					className=""
					label="Street address"
					isRequired
					placeholder="30 Ba Thang Hai St."
					error={errors?.street?.message}
					{...register("street", {
						required: VALIDATE_MSG.req
					})}
				/>
				<Input
					className=""
					label="Current password (leave blank to leave unchanged)"
					placeholder="****"
					type="password"
					error={errors?.password?.message}
					{...register("password", {

					})}
				/>
				<Input
					className=""
					label="New password (leave blank to leave unchanged)"
					placeholder="****"
					type="password"
					error={errors?.newPassword?.message}
					{...register("newPassword", {
						minLength: {
							value: 6,
							message: VALIDATE_MSG.min
						}
					})}
				/>
				<Input
					className=""
					label="Confirm new password"
					placeholder="****"
					type="password"
					error={errors?.confirmPassword?.message}
					{...register("confirmPassword", {
						minLength: {
							value: 6,
							message: VALIDATE_MSG.min
						}
					})}
				/>
				<button type="submit" className="btn btn-outline-primary-2" onClick={handleSubmit(_onSubmitFormProfiile)}>
					<span>SAVE CHANGES</span>
					<i className="icon-long-arrow-right" />
				</button>
			</FormContainer>
		</div>
	)
}

export default MyProfile
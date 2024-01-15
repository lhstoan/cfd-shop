import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../InputComponent/Input'
import { REGEXP, VALIDATE_MSG } from '../../constants/validate'
import { MODAL_TYPES } from '../../constants/general'
import { useAuthContext } from '../../context/AuthContext'
import LoadingPage from '../LoadingPage'
const FormBtnStyle = styled.div`
	display: flex;
	justify-content: center;
	button{
		margin-right: 0 !important;
	}
`
const FormLogin = ({ show }) => {
	const { handleLogin } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		unregister,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: ""
		}
	})
	useEffect(() => {
		reset()
	}, [show]);

	const _onSubmitForm = (data) => {
		if (data) {
			setLoading(true);
			handleLogin?.(data, () => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			})
		}
	}
	return (
		<div>
			{loading && <LoadingPage />}
			<Input
				label={`${show === MODAL_TYPES.login ? "Username or email address" : "Your email address"}`}
				isRequired
				error={errors?.email?.message}
				placeholder="cfd@gmail.com"
				{...register("email", {
					required: VALIDATE_MSG.req,
					pattern: { value: REGEXP.email, message: VALIDATE_MSG.pattern }
				})}
			/>
			<Input
				label="Password"
				isRequired
				error={errors?.password?.message}
				placeholder="**********"
				type="password"
				{...register("password", {
					required: VALIDATE_MSG.req,
					minLength: {
						value: 6,
						message: VALIDATE_MSG.min
					}
				})}
			/>
			<FormBtnStyle className="form-footer">
				<button type="submit" className="btn btn-outline-primary-2" onClick={handleSubmit(_onSubmitForm)}>
					<span>LOG IN</span>
					<i className="icon-long-arrow-right" />
				</button>
			</FormBtnStyle>
			{/* End .form-footer */}
		</div>
	)
}

export default FormLogin
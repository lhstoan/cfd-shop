import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MODAL_TYPES } from '../../constants/general'
import { REGEXP, VALIDATE_MSG } from '../../constants/validate'
import useDebounce from '../../hooks/useDebounce'
import { handleLogin } from '../../store/reducers/authReducer'
import Input from '../InputComponent/Input'
import LoadingPage from '../LoadingPage'
const FormBtnStyle = styled.div`
	display: flex;
	justify-content: center;
	button{
		margin-right: 0 !important;
	}
`
const FormLogin = ({ show }) => {
	const dispatch = useDispatch();
	const { loading: { login: isLoading } } = useSelector(((state) => state.auth));

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

	const _onSubmitForm = async (data) => {
		if (data && !isLoading) {
			try {
				const result = await dispatch(handleLogin(data)).unwrap()
			} catch (error) { () => { } }
		}
	}

	const renderLoading = useDebounce(isLoading, 3000);

	return (
		<div style={{ position: "relative" }}>
			{renderLoading && <LoadingPage />}
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
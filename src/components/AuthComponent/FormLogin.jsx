import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../InputComponent/Input'
const FormBtnStyle = styled.div`
	display: flex;
	justify-content: center;
	button{
		margin-right: 0 !important;
	}
`
const FormLogin = () => {

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const _onSubmitForm = (data) => {
		console.log(data);
	}
	return (
		<div>
			<Input
				label="Username or email address"
				isRequired
				error={errors?.email?.message}
				placeholder="cfd@gmail.com"
				{...register("email", { required: "Nhapasjdsa'as" })}
			/>

			<Input
				label="Password"
				isRequired
				error={errors?.password?.message}
				placeholder="**********"
				{...register("password", { required: "Nhapasjdsa'as" })}
			/>
			{/* <div className="form-group">
				<label htmlFor="singin-email">Username or email address *</label>
				<input type="text" className="form-control input-error" id="singin-email" name="singin-email" />
				<p className="form-error">Please fill in this field</p>
			</div> */}
			{/* End .form-group */}
			{/* <div className="form-group">
				<label htmlFor="singin-password">Password *</label>
				<input type="password" className="form-control" id="singin-password" name="singin-password" />
			</div> */}
			{/* End .form-group */}
			<FormBtnStyle className="form-footer">
				<button type="submit" className="btn btn-outline-primary-2" onClick={handleSubmit(_onSubmitForm)}>
					<span>LOG IN</span>
					<i className="icon-long-arrow-right" />
				</button>
				{/* <div className="custom-control custom-checkbox">
					<input type="checkbox" className="custom-control-input" id="signin-remember" />
					<label className="custom-control-label" htmlFor="signin-remember">Remember
						Me</label>
				</div> */}
				{/* End .custom-checkbox */}
				{/* <a href="#" className="forgot-link">Forgot Your Password?</a> */}
			</FormBtnStyle>
			{/* End .form-footer */}
		</div>
	)
}

export default FormLogin
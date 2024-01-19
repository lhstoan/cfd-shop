import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { REGEXP, VALIDATE_MSG } from '../../constants/validate';
import { handleRegister } from '../../store/reducers/authReducer';
import Input from '../InputComponent/Input';
import LoadingPage from '../LoadingPage';
import useDebounce from './../../hooks/useDebounce';

const FormRegister = ({ show }) => {
	const dispatch = useDispatch();
	const { loading: { register: isLoading } } = useSelector(((state) => state.auth));

	const {
		register,
		handleSubmit,
		reset,
		unregister,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			privacy: ""
		}
	})

	useEffect(() => {
		reset()
	}, [show]);

	const _onSubmitForm = async (data) => {
		if (data) {
			const { email, password } = data || "";
			const payload = {
				firstName: "",
				lastName: "",
				email,
				password,
			};

			try {
				const result = await dispatch(handleRegister(payload)).unwrap();
			} catch (error) { () => { } }
		}
	}

	const renderLoading = useDebounce(isLoading, 300);

	return (
		<div style={{ position: "relative" }}>
			{!!isLoading && <LoadingPage />}
			<Input
				label="Your email address"
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
			<div className="form-footer">
				<button type="submit" className="btn btn-outline-primary-2" onClick={handleSubmit(_onSubmitForm)}>
					<span>SIGN UP</span>
					<i className="icon-long-arrow-right" />
				</button>
				<div className="custom-control custom-checkbox">
					<input type="checkbox" className="custom-control-input" id="register-policy" required value='privacy'
						{...register("privacy", {
							required: VALIDATE_MSG.check
						})} />
					<label className="custom-control-label" htmlFor="register-policy">I agree to the{" "}
						<a href="privacy-policy.html">privacy policy</a> *</label>
					{errors?.privacy?.message && <p className="form-error">{errors?.privacy?.message}</p>}
				</div>
				{/* End .custom-checkbox */}
			</div>{/* End .form-footer */}
		</div>
	)
}

export default FormRegister
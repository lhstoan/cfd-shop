import React from 'react'

const FormRegister = () => {
	return (
		<form action="#">
			<div className="form-group">
				<label htmlFor="register-email">Your email address *</label>
				<input type="email" className="form-control input-error" id="register-email" name="register-email" required />
				<p className="form-error">Please fill in this field</p>
			</div>{/* End .form-group */}
			<div className="form-group">
				<label htmlFor="register-password">Password *</label>
				<input type="password" className="form-control" id="register-password" name="register-password" required />
			</div>{/* End .form-group */}
			<div className="form-footer">
				<button type="submit" className="btn btn-outline-primary-2">
					<span>SIGN UP</span>
					<i className="icon-long-arrow-right" />
				</button>
				<div className="custom-control custom-checkbox">
					<input type="checkbox" className="custom-control-input" id="register-policy" required />
					<label className="custom-control-label" htmlFor="register-policy">I agree to the
						<a href="privacy-policy.html">privacy policy</a> *</label>
				</div>{/* End .custom-checkbox */}
			</div>{/* End .form-footer */}
		</form>
	)
}

export default FormRegister
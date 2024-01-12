import { forwardRef } from "react";

export const InputM = ({ label, isRequired, renderProps, isChangePass, error, ...restProps }, ref) => {

	return (
		<div className="form-group">
			<div className="form-grouppass">
				<label className="label">{label} {isRequired && <span>*</span>}</label>
			</div>
			{renderProps?.({ ...restProps, ref: ref }) || <input type="text" className={`form-control`} ref={ref} {...restProps} />}
			{error && <p className="form-error">{error}</p>}
		</div>
	)
}

const Input = forwardRef(InputM)

export default Input
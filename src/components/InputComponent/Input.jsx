import { forwardRef } from "react";

export const InputM = ({ label, isRequired, renderProps, error, className = "form-group", ...restProps }, ref) => {

	return (
		<div className={className}>
			<label className="label">{label} {isRequired && <span>*</span>}</label>
			{renderProps?.({ ...restProps, ref: ref }) || <input type="text" className={`form-control ${error ? "input-error" : ""}`} ref={ref} {...restProps} />}
			{error && <p className="form-error">{error}</p>}
		</div>
	)
}

const Input = forwardRef(InputM)

export default Input
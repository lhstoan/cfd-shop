import { forwardRef } from "react";

const TextArea = ({ error, ...restProps }, ref) => {
	return (
		<textarea className={`form__input ${error ? "formerror" : ""}`} {...restProps} ref={ref} />
	);
};
export default forwardRef(TextArea);
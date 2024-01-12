const TextArea = ({ error, ...restProps }) => {
	return (
		<textarea className={`form__input ${error ? "formerror" : ""}`} {...restProps} />
	);
};
export default TextArea;
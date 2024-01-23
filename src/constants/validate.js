export const VALIDATE_MSG = {
	req: "Please fill in this field !",
	pattern: "Please enter the correct email format !",
	min: "Password must have 6 characters or more!",
	check: "Please choose to agree to the privacy policy!",
	color: "Please select color!",
	qty: "Quantity must be greater than 1!"
}
export const RESPONSE_MSG = {
	notFound: "Username or password is not correct.",
	forbidden: "Your email has been registered in another account !",
}
export const REGEXP = {
	// eslint-disable-next-line no-useless-escape
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
	facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/,
	website: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/,
};
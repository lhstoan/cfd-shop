import axiosInstance from "../utils/axiosInstance";


const cartService = {
	getCart(query = "") {
		return axiosInstance.get(`/carts/me${query}`);
	},
	updateCart(payload = {}) {
		return axiosInstance.put(`/carts`, payload);
	},
}

export default cartService;
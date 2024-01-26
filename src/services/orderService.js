import axiosInstance from "../utils/axiosInstance";

export const orderService = {
	getVoucher(code = "") {
		return axiosInstance.get(`/orders/voucher/${code}`,);
	},
	checkout(payload = {}) {
		return axiosInstance.post(`/orders`, payload);
	},
};
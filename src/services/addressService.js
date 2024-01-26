import axiosInstance from "../utils/axiosInstance";

export const addressService = {
	getProvinces() {
		return axiosInstance.get(`/provinces`,);
	},
	getProvincesById(payload) {
		return axiosInstance.get(`/provinces/${payload}`);
	},
	getDistricts(id) {
		return axiosInstance.get(`/districts?province=${id}`,);
	},
	getDistrictsById(payload) {
		return axiosInstance.get(`/districts/${payload}`);
	},
	getWards(id) {
		return axiosInstance.get(`/wards?district=${id}`,);
	},
	getWardsById(payload) {
		return axiosInstance.get(`/wards/${payload}`,);
	},
};
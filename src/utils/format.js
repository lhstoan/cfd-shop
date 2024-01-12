import moment from "moment";
import { LANGVIE, TIME_DISPLAYS } from "../constants/format";


// ---- Format number to display currency ----//
export const formatCurrency = (data, type = LANGVIE) => {
	if (!data) return 0;
	return data.toLocaleString(type);
};

// ---- Format date to display with format ----//
export const formatDate = (date, format = TIME_DISPLAYS) => {
	if (!date) return "";
	return moment(date).format(format);
};
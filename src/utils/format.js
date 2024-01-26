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

export const removeAccents = (str) => {
	const accentMap = {
		'à': 'a',
		'á': 'a',
		'ả': 'a',
		'ã': 'a',
		'ạ': 'a',
		'ă': 'a',
		'ằ': 'a',
		'ắ': 'a',
		'ẳ': 'a',
		'ẵ': 'a',
		'ặ': 'a',
		'â': 'a',
		'ầ': 'a',
		'ấ': 'a',
		'ẩ': 'a',
		'ẫ': 'a',
		'ậ': 'a',
		'è': 'e',
		'é': 'e',
		'ẻ': 'e',
		'ẽ': 'e',
		'ẹ': 'e',
		'ê': 'e',
		'ề': 'e',
		'ế': 'e',
		'ể': 'e',
		'ễ': 'e',
		'ệ': 'e',
		'ì': 'i',
		'í': 'i',
		'ỉ': 'i',
		'ĩ': 'i',
		'ị': 'i',
		'ò': 'o',
		'ó': 'o',
		'ỏ': 'o',
		'õ': 'o',
		'ọ': 'o',
		'ô': 'o',
		'ồ': 'o',
		'ố': 'o',
		'ổ': 'o',
		'ỗ': 'o',
		'ộ': 'o',
		'ơ': 'o',
		'ờ': 'o',
		'ớ': 'o',
		'ở': 'o',
		'ỡ': 'o',
		'ợ': 'o',
		'ù': 'u',
		'ú': 'u',
		'ủ': 'u',
		'ũ': 'u',
		'ụ': 'u',
		'ư': 'u',
		'ừ': 'u',
		'ứ': 'u',
		'ử': 'u',
		'ữ': 'u',
		'ự': 'u',
		'ỳ': 'y',
		'ý': 'y',
		'ỷ': 'y',
		'ỹ': 'y',
		'ỵ': 'y',
		'đ': 'd',
	};

	const resultStr = str.replace(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g, function (matched) {
		return accentMap[matched];
	});

	return resultStr;
}
// utils/nameColor.js

import colorNameList from 'color-name-list';
import nearestColor from 'nearest-color';

const nameColor = (hexa) => {
	const colors = colorNameList.colorNameList.reduce((o, { name, hex }) => Object.assign(o, {
		[name]: hex
	}), {});

	const nearest = nearestColor.from(colors);

	const showColor = nearest(hexa);
	return showColor?.name
}
export default nameColor;
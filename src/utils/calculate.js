export const sumArrayNumber = ((array, initValue = 0) => {
	return array.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), initValue) || 0;
})
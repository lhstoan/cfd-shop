import React from 'react';

const Select = ({ options, error, ...restProps }) => {
	return (
		<div className="select-custom" >
			<select className={`form-control ${!!error ? "input-error" : ""}`}  {...restProps}>
				{
					options?.length > 0 && options?.map((item, index) => (
						<option key={item?.value || index} value={item?.value}>
							{item?.label || ""}
						</option>
					))
				}
			</select>
		</div>
	)
}

export default Select
import React from 'react';
import Input from '../../components/InputComponent/Input';
import { SORT_OPTIONS } from '../../constants/general';
import Select from './../../components/InputComponent/Select';


const ToolboxSection = ({ showNumb = 0, totalProduct = 0, activeSort, onSortChange }) => {
	const onSelectChange = (e) => {
		onSortChange?.(e?.target?.value);
	}

	return (
		<div className="toolbox">
			<div className="toolbox-left">
				<div className="toolbox-info"> Showing <span>{showNumb} of {totalProduct}</span> Products </div>
			</div>
			<div className="toolbox-right">
				<div className="toolbox-sort">
					<label htmlFor="sortby">Sort by:</label>
					<Input
						className="form-control"
						label=""
						style={{ with: 400 }}
						renderProps={
							(selectProps) => (
								<Select
									defaultValue={SORT_OPTIONS.popularity}
									options={Object.values(SORT_OPTIONS)}
									{...selectProps}
									value={activeSort}
									onChange={onSelectChange}
								/>
							)
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default ToolboxSection
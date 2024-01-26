import { useState } from 'react';
import { addressService } from './../services/addressService';
import useQuery from './useQuery';

const useAddress = (defaultValue) => {
	const [provinceID, setProvinceID] = useState(defaultValue?.provinceID);
	const [districtID, setDistrictID] = useState(defaultValue?.districtID);
	const [wardID, setWardID] = useState(defaultValue?.wardID);

	const { data: provinceData } = useQuery(addressService.getProvinces)
	const { data: districtData } = useQuery(() => provinceID && addressService.getDistricts(provinceID), [provinceID])
	const { data: wardData } = useQuery(() => districtID !== undefined && addressService.getWards(districtID), [districtID])

	const handleProvinceChange = (changeID) => {
		setProvinceID(changeID)
		setDistrictID(undefined)
		setWardID(undefined)
	}
	const handleDistrictChange = (changeID) => {
		setDistrictID(changeID)
		setWardID(undefined)
	}
	const handleWardChange = (changeID) => {
		setWardID(changeID)
	}

	const _modifyData = (data) => {
		return data?.map(({ id, name }) => ({ value: id, label: name }))
	}

	return {
		provinces: _modifyData(provinceData?.provinces),
		districts: _modifyData(districtData?.districts),
		wards: _modifyData(wardData?.wards),
		provinceID,
		districtID,
		wardID,
		handleProvinceChange,
		handleDistrictChange,
		handleWardChange,
	}
}

export default useAddress
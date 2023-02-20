import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createDrug = async (
	sessionId: string,
	name: string,
	genericName: string,
	ingredients: string,
	strength: string,
	commercialName: string,
	manufacture: string,
	otherInformation: string
) => {
	const body = {
		Name: name,
		GenericName: genericName,
		Ingredients: ingredients,
		Strength: strength,
		CommercialName: commercialName,
		Manufacture: manufacture,
		OtherInformation: otherInformation
	};

	const url = BACKEND_API_URL + '/clinical/drugs';
	return await post_(sessionId, url, body, true);
};

export const getDrugById = async (sessionId: string, drugId: string) => {
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await get_(sessionId, url, true);
};

export const searchAssets = async (sessionId: string, selectAsset: string, searchParams = '') => {
	let searchString = '';
	const keys = Object.keys(searchParams);
	if (keys.length > 0) {
		searchString = '?';
		for (const key of keys) {
			searchString += `${key}=${searchParams[key]}`;
		}
	}
	const url = BACKEND_API_URL + `/clinical/drugs/search${searchString}/`;
	return await get_(sessionId, url, true);
};

export const updateDrug = async (
	sessionId: string,
	drugId: string,
	name: string,
	genericName: string,
	ingredients: string,
	strength: string,
	commercialName: string,
	manufacture: string,
	otherInformation: string
) => {
	const body = {
		Name: name,
		GenericName: genericName,
		Ingredients: ingredients,
		Strength: strength,
		CommercialName: commercialName,
		Manufacture: manufacture,
		OtherInformation: otherInformation
	};
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteDrug = async (sessionId: string, drugId: string) => {
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await delete_(sessionId, url, true);
};

import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createDrugManagement = async (
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

	const url = BACKEND_API_URL + '/drug-management';
	return await post_(sessionId, url, body, true);
};

export const getDrugManagementById = async (sessionId: string, drugManagementId: string) => {
	const url = BACKEND_API_URL + `/drug-management/${drugManagementId}`;
	return await get_(sessionId, url, true);
};

export const searchAssets = async (sessionId: string, selectAsset: string, searchParams = '') => {
	let searchString = '';
	const keys = Object.keys(searchParams);
	if (keys.length > 0) {
		searchString = '?';
		for (var key of keys) {
			searchString += `${key}=${searchParams[key]}`;
		}
	}
	const url = BACKEND_API_URL + `/admin-panel/${selectAsset}/search${searchString}/`;
	return await get_(sessionId, url, true);
};

export const updateDrugManagement = async (
	sessionId: string,
	drugManagementId: string,
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
	const url = BACKEND_API_URL + `/drug-management/${drugManagementId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteDrugManagement = async (sessionId: string, drugManagementId: string) => {
	const url = BACKEND_API_URL + `/drug-management/${drugManagementId}`;
	return await delete_(sessionId, url, true);
};

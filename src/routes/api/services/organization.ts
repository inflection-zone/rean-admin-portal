import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createOrganization = async (
	sessionId: string,
	type: string,
	name: string,
	contactNumber: number,
	email: string,
	about: string,
	operationalSince: Date,
	address: string,
	imageResource: string,
	healthFacility: boolean
) => {
	const body = {
		Type: type,
		Name: name,
		ContactNumber: contactNumber,
		Email: email,
		About: about,
		OperationalSince: operationalSince,
		Address: address,
		ImageResource: imageResource,
		HealthFacility: healthFacility
	};

	const url = BACKEND_API_URL + '/organization';
	return await post_(sessionId, url, body, true);
};

export const getOrganizationById = async (sessionId: string, organizationId: string) => {
	const url = BACKEND_API_URL + `/organization/${organizationId}`;
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

export const updateOrganization = async (
	sessionId: string,
	organizationId: string,
	type: string,
	name: string,
	contactNumber: number,
	email: string,
	about: string,
	operationalSince: Date,
	address: string,
	imageResource: string,
	healthFacility: boolean
) => {
	const body = {
		Type: type,
		Name: name,
		ContactNumber: contactNumber,
		Email: email,
		About: about,
		OperationalSince: operationalSince,
		Address: address,
		ImageResource: imageResource,
		HealthFacility: healthFacility
	};
	const url = BACKEND_API_URL + `/organization/${organizationId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteOrganization = async (sessionId: string, organizationId: string) => {
	const url = BACKEND_API_URL + `/organization/${organizationId}`;
	return await delete_(sessionId, url, true);
};

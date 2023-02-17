import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createApiKeyManagement = async (
	sessionId: string,
	clientName: string,
	password: string,
	phone: number,
	email: string
) => {
	const body = {
		ClientName: clientName,
		Password: password,
		Phone: phone,
		Email: email
	};

	const url = BACKEND_API_URL + '/api-key-management';
	return await post_(sessionId, url, body, true);
};

export const getApiKeyManagementById = async (sessionId: string, apiKeyManagementId: string) => {
	const url = BACKEND_API_URL + `/api-key-management/${apiKeyManagementId}`;
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

export const updateApiKeyManagement = async (
	sessionId: string,
	apiKeyManagementId: string,
	clientName: string,
	password: string,
	phone: number,
	email: string
) => {
	const body = {
		ClientName: clientName,
		Password: password,
		Phone: phone,
		Email: email
	};
	const url = BACKEND_API_URL + `/api-key-management/${apiKeyManagementId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteApiKeyManagement = async (sessionId: string, apiKeyManagementId: string) => {
	const url = BACKEND_API_URL + `/api-key-management/${apiKeyManagementId}`;
	return await delete_(sessionId, url, true);
};

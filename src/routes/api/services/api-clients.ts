import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createApiClient = async (
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

	const url = BACKEND_API_URL + '/api-clients';
	return await post_(sessionId, url, body, true);
};

export const getApiClientById = async (sessionId: string, apiClientId: string) => {
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await get_(sessionId, url, true);
};

export const searchApiClients = async (sessionId: string, searchParams?: any) => {
	let searchString = '';
	if (searchParams) {
		const keys = Object.keys(searchParams);
		if (keys.length > 0) {
			searchString = '?';
			const params = [];
			for (const key of keys) {
				if (searchParams[key]) {
					const param = `${key}=${searchParams[key]}`;
					params.push(param);
				}
			}
			searchString += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/api-clients/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateApiClient = async (
	sessionId: string,
	apiClientId: string,
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
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteApiClient = async (sessionId: string, apiClientId: string) => {
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await delete_(sessionId, url, true);
};

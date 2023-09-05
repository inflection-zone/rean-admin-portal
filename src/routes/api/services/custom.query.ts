import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_ } from './common';

////////////////////////////////////////////////////////////////

export const executeQuery = async (
	sessionId: string,
	name: string,
	description: string,
  format: string,
  userId ?: string,
	tenantId ?: string,
) => {
	const body = {
		Name: name,
		Description: description ? description : null,
    Format: format,
		UserId: userId,
    TenantId: tenantId 
	};

	const url = BACKEND_API_URL + '/custom-query';
	return await post_(sessionId, url, body, true);
};

export const getQueryById = async (sessionId: string, queryId: string) => {
	const url = BACKEND_API_URL + `/custom-query/${queryId}`;
	return await get_(sessionId, url, true);
};

export const searchQueries= async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/custom-query/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const deleteQuery = async (sessionId: string, queryId: string) => {
	const url = BACKEND_API_URL + `/custom-query/${queryId}`;
	return await delete_(sessionId, url, true);
};

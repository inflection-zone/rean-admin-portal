import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { delete_, get_, post_ } from './common';
import { SessionManager } from '../session.manager';

////////////////////////////////////////////////////////////////

// export const executeQuery = async (
// 	sessionId: string,
// 	name: string,
// 	description: string,
//   format: string,
//   userId ?: string,
// 	tenantId ?: string,
// ) => {
// 	const body = {
// 		Name: name,
// 		Description: description ? description : null,
//     Format: format,
// 		UserId: userId,
//     TenantId: tenantId 
// 	};

// 	const url = BACKEND_API_URL + '/custom-query';
// 	return await post_(sessionId, url, body, true);
// };

export const executeQuery = async (
	sessionId: string,
	name: string,
	description: string,
  format: string,
  userId ?: string,
	tenantId ?: string,
) => {
	const bodyObj = {
		Name: name,
		Description: description ? description : null,
    Format: format,
		UserId: userId,
    TenantId: tenantId 
	};
	const url = BACKEND_API_URL + '/custom-query';
	
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;

	const headers = {};
	headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
	headers['Authorization'] = `Bearer ${accessToken}`;
	headers['Content-Type'] = 'application/json';
	const body = JSON.stringify(bodyObj);
	console.log(body);
	const res = await fetch(url, {
		method: 'POST',
		body,
		headers
	});
	const data = await res.text();
	const responseHeaders = res.headers;
	const contentType = responseHeaders['content-type'];
	const disposition = responseHeaders['content-disposition'];
		console.log("data----",disposition)
	// const data = await res.arrayBuffer();
	console.log("data----",responseHeaders)
	console.log("data",data)
	if (data) {
		const responseHeaders = res.headers;
		const contentType = responseHeaders['content-type'];
		console.log("data",contentType)
		const parts = contentType.split('/');
		const extension = parts.pop();
		let filename = 'download-' + Date.now().toString() + '.' + extension;
		// if (asAttachment === true) {
			const disposition = responseHeaders['content-disposition'];
			if (disposition) {
				const tokens = disposition.split('filename=');
				if (tokens.length > 1) {
					filename = tokens[1];
				}
			// }
		}
		return data;
	} else {
		const response = await res.json();
		console.log(`post_ response message: ${response.Message}`);
		throw error(response.HttpCode, response.Message);
	}
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

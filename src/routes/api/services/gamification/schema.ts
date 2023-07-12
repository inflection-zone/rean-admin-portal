import { AWARDS_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createSchema = async (
	sessionId: string,
	clientId: string,
	name: string,
	description: string,
  type: string,
	eventTypeIds: string[]
) => {
	const body = {
		ClientId: clientId,
		Name: name,
		Description: description ? description : null,
    Type:type,
    EventTypeIds:eventTypeIds
	};
	const url = AWARDS_BACKEND_API_URL + '/engine/schema';
	return await post_(sessionId, url, body, true);
};

export const getSchemaById = async (sessionId: string, schemaId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/schema/${schemaId}`;
	return await get_(sessionId, url, true);
};

export const searchSchemas = async (sessionId: string, searchParams?: any) => {
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
	const url = AWARDS_BACKEND_API_URL + `/engine/schema/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateSchema = async (
	sessionId: string,
	schemaId: string,
	clientId: string,
	name: string,
	description: string,
	type: string,
	eventTypeIds: string[]
) => {
	const body = {
		ClientId: clientId,
		Name: name,
		Description: description ? description : null,
		Type:type,
    EventTypeIds:eventTypeIds
	};
	const url = AWARDS_BACKEND_API_URL + `/engine/schema/${schemaId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteSchema = async (sessionId: string, schemaId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/schema/${schemaId}`;
	return await delete_(sessionId, url, true);
};

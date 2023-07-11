import { AWARDS_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createNode = async (
	sessionId: string,
	parentNodeId: string,
	schemaId: string,
	name: string,
	description: string,
	type: string,
	actionType: string,
	actionName: string
) => {
	const body = {
		ParentNodeId: parentNodeId,
		schemaId: schemaId,
		Name: name,
		Description: description ? description : null,
		Type: type,
		Action: {
			ActionType: actionType,
			Name: actionName,
			InputParams: {},
			OutputParams: {}
		}
	};
	const url = AWARDS_BACKEND_API_URL + '/engine/nodes';
	return await post_(sessionId, url, body, true);
};

export const getNodeById = async (sessionId: string, nodeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await get_(sessionId, url, true);
};

export const searchNodes = async (sessionId: string, searchParams?: any) => {
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
		}
	}
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateNode = async (
	sessionId: string,
	nodeId: string,
	parentNodeId: string,
	schemaId: string,
	name: string,
	description: string,
	type: string,
	actionType: string,
	actionName: string
) => {
	const body = {
		ParentNodeId: parentNodeId,
		schemaId: schemaId,
		Name: name,
		Description: description ? description : null,
		Type: type,
		Action: {
			ActionType: actionType,
			Name: actionName,
			InputParams: {},
			OutputParams: {}
		}
	};
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNode = async (sessionId: string, nodeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/nodes/${nodeId}`;
	return await delete_(sessionId, url, true);
};


import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createAssessmentNode = async (
	sessionId: string,
	templateId: string,
	parentNodeId: string,
	nodeType: string,
	title: string,
	description: string,
	queryType: string,
	options: string[],
) => {
	const body = {
		ParentNodeId:parentNodeId,
		NodeType: nodeType,
		Title: title,
		Description: description,
		QueryResponseType: queryType,
		Options: options
	};
	if (options && options.length > 0) {
		let count = 1
		const options = [];
		for (const o of body.Options) {
				const option = {
						Text        : o,
						Sequence : count,
				};
				options.push(option);
				 count = count+1;
		}
		body.Options = options;
}
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${templateId}/nodes`;
	return await post_(sessionId, url, body, true);
};

export const getAssessmentNodeById = async (sessionId: string, templateId:string, nodeId: string) => {
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${templateId}/nodes/${nodeId}`;
	return await get_(sessionId, url, true);
};

export const searchAssessmentNodes = async (sessionId: string,templateId:string,searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${templateId}/nodes/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateAssessmentNode = async (
	sessionId: string,
	templateId:string,
	nodeId: string,
	nodeType: string,
	title: string,
	description: string,
	queryType: string,
	options:string[],
) => {
	const body = {
		NodeType: nodeType,
		Title: title,
		Description: description,
		QueryType: queryType,
		Options: options
	};
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${templateId}/nodes/${nodeId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteAssessmentNode = async (sessionId: string, templateId: string, nodeId: string) => {
	const url = BACKEND_API_URL + `/clinical/assessment-templates/${templateId}/nodes/${nodeId}`;
	return await delete_(sessionId, url, true);
};



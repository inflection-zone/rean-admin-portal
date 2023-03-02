import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createAssessment = async (
	sessionId: string,
	assetCode: string,
	title: string,
	description: string,
	displayCode: string,
	type: string,
	provider: string,
	providerAssessmentCode: string,
	serveListNodeChildrenAtOnce: string
) => {
	const body = {
		AssetCode: assetCode,
		Title: title,
		Description: description,
		DisplayCode: displayCode,
		Type: type,
		Provider: provider,
		ProviderAssessmentCode: providerAssessmentCode,
		ServeListNodeChildrenAtOnce: serveListNodeChildrenAtOnce
	};

	const url = BACKEND_API_URL + '/clinical/assessments';
	return await post_(sessionId, url, body, true);
};

export const getAssessmentById = async (sessionId: string, assessmentId: string) => {
	const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}`;
	return await get_(sessionId, url, true);
};

export const searchAssessments = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/clinical/assessments/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateAssessment = async (
	sessionId: string,
	assessmentId: string,
	assetCode: string,
	title: string,
	description: string,
	displayCode: string,
	type: string,
	provider: string,
	providerAssessmentCode: string,
	serveListNodeChildrenAtOnce: string
) => {
	const body = {
		AssetCode: assetCode,
		Title: title,
		Description: description,
		DisplayCode: displayCode,
		Type: type,
		Provider: provider,
		ProviderAssessmentCode: providerAssessmentCode,
		ServeListNodeChildrenAtOnce: serveListNodeChildrenAtOnce
	};
	const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteAssessment = async (sessionId: string, assessmentId: string) => {
	const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}`;
	return await delete_(sessionId, url, true);
};

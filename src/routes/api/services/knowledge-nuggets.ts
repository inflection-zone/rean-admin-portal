import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createknowledgeNuggets = async (
	sessionId: string,
	name: string,
	briefInformation: string,
	detailedInformation: string,
	additionalResource: string,
	tags: string[]
) => {
	const body = {
		Name: name,
		BriefInformation: briefInformation,
		DetailedInformation: detailedInformation,
		AdditionalResource: additionalResource,
		Tags: tags
	};

	const url = BACKEND_API_URL + '/knowledge-nuggets';
	return await post_(sessionId, url, body, true);
};

export const getknowledgeNuggetsById = async (sessionId: string, knowledgeNuggetsId: string) => {
	const url = BACKEND_API_URL + `/knowledge-nuggets${knowledgeNuggetsId}`;
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

export const updateknowledgeNuggets = async (
	sessionId: string,
	knowledgeNuggetsId: string,
	name: string,
	briefInformation: string,
	detailedInformation: string,
	additionalResource: string,
	tags: string[]
) => {
	const body = {
		Name: name,
		BriefInformation: briefInformation,
		DetailedInformation: detailedInformation,
		AdditionalResource: additionalResource,
		Tags: tags
	};
	const url = BACKEND_API_URL + `/knowledge-nuggets${knowledgeNuggetsId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteknowledgeNuggets = async (sessionId: string, knowledgeNuggetsId: string) => {
	const url = BACKEND_API_URL + `/knowledge-nuggets${knowledgeNuggetsId}`;
	return await delete_(sessionId, url, true);
};

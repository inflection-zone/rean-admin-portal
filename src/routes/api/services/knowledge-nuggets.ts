import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createKnowledgeNuggets = async (
	sessionId: string,
	topicName: string,
	briefInformation: string,
	detailedInformation: string,
	//additionalResource: string[],
	tags: string[]
) => {
	const body = {
		TopicName: topicName,
		BriefInformation: briefInformation,
		DetailedInformation: detailedInformation,
		//AdditionalResource: additionalResource,
		Tags: tags
	};
	// console.log('body==', body);
	const url = BACKEND_API_URL + '/educational/knowledge-nuggets';
	// console.log('url', url);
	return await post_(sessionId, url, body, true);
};

export const getKnowledgeNuggetsById = async (sessionId: string, knowledgeNuggetsId: string) => {
	const url = BACKEND_API_URL + `/educational/knowledge-nuggets/${knowledgeNuggetsId}`;
	return await get_(sessionId, url, true);
};

export const searchAssets = async (sessionId: string, selectAsset: string, searchParams = '') => {
	let searchString = '';
	const keys = Object.keys(searchParams);
	if (keys.length > 0) {
		searchString = '?';
		for (const key of keys) {
			searchString += `${key}=${searchParams[key]}`;
		}
	}
	const url = BACKEND_API_URL + `/educational/knowledge-nuggets/search${searchString}/`;
	return await get_(sessionId, url, true);
};

export const updateKnowledgeNuggets = async (
	sessionId: string,
	knowledgeNuggetsId: string,
	topicName: string,
	briefInformation: string,
	detailedInformation: string,
	//additionalResource: string[],
	tags: string[]
) => {
	const body = {
		TopicName: topicName,
		BriefInformation: briefInformation,
		DetailedInformation: detailedInformation,
		//AdditionalResource: additionalResource,
		Tags: tags
	};
	const url = BACKEND_API_URL + `/educational/knowledge-nuggets${knowledgeNuggetsId}`;
	console.log('url==', url);
	return await put_(sessionId, url, body, true);
};

export const deleteKnowledgeNuggets = async (sessionId: string, knowledgeNuggetsId: string) => {
	const url = BACKEND_API_URL + `/educational/knowledge-nuggets${knowledgeNuggetsId}`;
	return await delete_(sessionId, url, true);
};

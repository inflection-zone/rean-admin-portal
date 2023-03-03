import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createLearningJourney = async (
	sessionId: string,
	name: string,
	preferenceWeight: number,
	description: string,
	image: File
) => {
	const body = {
		Name: name,
		PreferenceWeight: preferenceWeight,
		Description: description,
		Image: image
	};
	const url = BACKEND_API_URL + '/learning-journeys';
	return await post_(sessionId, url, body, true);
};

export const getLearningJourneyById = async (sessionId: string, learningJourneyId: string) => {
	const url = BACKEND_API_URL + `/learning-journeys/${learningJourneyId}`;
	return await get_(sessionId, url, true);
};

export const searchLearningJourneys = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/learning-journeys/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateLearningJourney = async (
	sessionId: string,
	learningJourneyId: string,
	name: string,
	preferenceWeight: number,
	description: string,
	image: File
) => {
	const body = {
		Name: name,
		PreferenceWeight: preferenceWeight,
		Description: description,
		Image: image
	};
	const url = BACKEND_API_URL + `/learning-journeys/${learningJourneyId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteLearningJourney = async (sessionId: string, learningJourneyId: string) => {
	const url = BACKEND_API_URL + `/learning-journeys/${learningJourneyId}`;
	return await delete_(sessionId, url, true);
};

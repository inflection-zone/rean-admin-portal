import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createlearningJourney = async (
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

	const url = BACKEND_API_URL + '/learning-journey';
	return await post_(sessionId, url, body, true);
};

export const getlearningJourneyById = async (sessionId: string, learningJourneyId: string) => {
	const url = BACKEND_API_URL + `/learning-journey/${learningJourneyId}`;
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

export const updatelearningJourney = async (
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
	const url = BACKEND_API_URL + `/learning-journey/${learningJourneyId}`;
	return await put_(sessionId, url, body, true);
};

export const deletelearningJourney = async (sessionId: string, learningJourneyId: string) => {
	const url = BACKEND_API_URL + `/learning-journey/${learningJourneyId}`;
	return await delete_(sessionId, url, true);
};

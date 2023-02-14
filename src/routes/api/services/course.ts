import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createCourse = async (
	sessionId: string,
	name: string,
	learningJourney: string,
	description: string,
	image: File
) => {
	const body = {
		Name: name,
		LearningJourney: learningJourney,
		Description: description,
		Image: image
	};

	const url = BACKEND_API_URL + '/learning-journey/course';
	return await post_(sessionId, url, body, true);
};

export const getCourseById = async (sessionId: string, courseId: string) => {
	const url = BACKEND_API_URL + `/learning-journey/course${courseId}`;
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

export const updateCourse = async (
	sessionId: string,
	courseId: string,
	name: string,
	learningJourney: string,
	description: string,
	image: File
) => {
	const body = {
		Name: name,
		LearningJourney: learningJourney,
		Description: description,
		Image: image
	};
	const url = BACKEND_API_URL + `/learning-journey/course${courseId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteCourse = async (sessionId: string, courseId: string) => {
	const url = BACKEND_API_URL + `/learning-journey/course${courseId}`;
	return await delete_(sessionId, url, true);
};

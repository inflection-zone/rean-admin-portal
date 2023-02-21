import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createModule = async (
	sessionId: string,
	title: string,
	description: string,
	learningJourney: string,
	course: string,
	contentType: string,
	resourceLink: string
) => {
	const body = {
		Title: title,
		Description: description,
		LearningJourney: learningJourney,
		Course: course,
		ContentType: contentType,
		ResourceLink: resourceLink
	};

	const url = BACKEND_API_URL + '/educational/course-modules';
	return await post_(sessionId, url, body, true);
};

export const getModuleById = async (sessionId: string, moduleId: string) => {
	const url = BACKEND_API_URL + `/educational/course-modules${moduleId}`;
	return await get_(sessionId, url, true);
};

export const searchModules = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/educational/course-modules/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateModule = async (
	sessionId: string,
	moduleId: string,
	title: string,
	description: string,
	learningJourney: string,
	course: string,
	contentType: string,
	resourceLink: string
) => {
	const body = {
		Title: title,
		Description: description,
		LearningJourney: learningJourney,
		Course: course,
		ContentType: contentType,
		ResourceLink: resourceLink
	};
	const url = BACKEND_API_URL + `/educational/course-modules${moduleId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteModule = async (sessionId: string, moduleId: string) => {
	const url = BACKEND_API_URL + `/educational/course-modules${moduleId}`;
	return await delete_(sessionId, url, true);
};

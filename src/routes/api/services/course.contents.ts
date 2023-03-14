import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createCourseContent = async (
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
	const url = BACKEND_API_URL + '/educational/course-contents';
	return await post_(sessionId, url, body, true);
};

export const getCourseContentById = async (sessionId: string, contentId: string) => {
	const url = BACKEND_API_URL + `/educational/course-contents${contentId}`;
	return await get_(sessionId, url, true);
};

export const searchCourseContents = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/educational/course-contents/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateCourseContent = async (
	sessionId: string,
	contentId: string,
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
	const url = BACKEND_API_URL + `/educational/course-contents${contentId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteCourseContent = async (sessionId: string, contentId: string) => {
	const url = BACKEND_API_URL + `/educational/course-contents${contentId}`;
	return await delete_(sessionId, url, true);
};

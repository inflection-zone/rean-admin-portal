import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createNewsfeed = async (
	sessionId: string,
	type: string,
	title: string,
	description: string,
	date: Date
) => {
	const body = {
		Type: type,
		Title: title,
		Description: description,
		Date: date
	};

	const url = BACKEND_API_URL + '/rss-feeds';
	return await post_(sessionId, url, body, true);
};

export const getNewsfeedById = async (sessionId: string, newsfeedId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/${newsfeedId}`;
	return await get_(sessionId, url, true);
};

export const searchNewsfeeds = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/rss-feeds/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateNewsfeed = async (
	sessionId: string,
	newsfeedId: string,
	type: string,
	title: string,
	description: string,
	date: Date
) => {
	const body = {
		Type: type,
		Title: title,
		Description: description,
		Date: date
	};
	const url = BACKEND_API_URL + `/rss-feeds/${newsfeedId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNewsfeed = async (sessionId: string, newsfeedId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/${newsfeedId}`;
	return await delete_(sessionId, url, true);
};

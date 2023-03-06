import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createNewsfeedItem = async (
	sessionId: string,
	title: string,
	description: string,
	newsfeed: string,
	type: string,
	link: string,
	author: string,
	date: Date
) => {
	const body = {
		Title: title,
		Description: description,
		Newsfeed: newsfeed,
		Type: type,
		Link: link,
		Author: author,
		Date: date
	};
	const url = BACKEND_API_URL + '/rss-feeds/feed-items';
	return await post_(sessionId, url, body, true);
};

export const getNewsfeedItemById = async (sessionId: string, newsfeedItemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${newsfeedItemId}`;
	return await get_(sessionId, url, true);
};

export const searchNewsfeedItems = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/rss-feeds/feed-items/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateNewsfeedItem = async (
	sessionId: string,
	newsfeedItemId: string,
	title: string,
	description: string,
	newsfeed: string,
	type: string,
	link: string,
	author: string,
	date: Date
) => {
	const body = {
		Title: title,
		Description: description,
		Newsfeed: newsfeed,
		Type: type,
		Link: link,
		Author: author,
		Date: date
	};
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${newsfeedItemId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNewsfeedItem = async (sessionId: string, newsfeedItemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${newsfeedItemId}`;
	return await delete_(sessionId, url, true);
};

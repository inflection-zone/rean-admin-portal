import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createNotification = async (
	sessionId: string,
	title: string,
	Body: string,
	type: string,
	sentOn: Date
) => {
	const body = {
		Title: title,
		Body: Body,
		Type: type,
		SentOn: sentOn
	};

	const url = BACKEND_API_URL + '/notification';
	return await post_(sessionId, url, body, true);
};

export const getNotificationById = async (sessionId: string, notificationId: string) => {
	const url = BACKEND_API_URL + `/notification/${notificationId}`;
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

export const updateNotification = async (
	sessionId: string,
	notificationId: string,
	title: string,
	Body: string,
	type: string,
	sentOn: Date
) => {
	const body = {
		Title: title,
		Body: Body,
		Type: type,
		SentOn: sentOn
	};
	const url = BACKEND_API_URL + `/notification/${notificationId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNotification = async (sessionId: string, notificationId: string) => {
	const url = BACKEND_API_URL + `/notification/${notificationId}`;
	return await delete_(sessionId, url, true);
};

import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createLinkage = async (
	sessionId: string,
	title: string,
	description: string,
	link: string,
	daysActive: number,
	tags: string[],
	action: string,
	imageUrl: string
) => {
	const body = {
		Title: title,
		Description: description,
		Link: link,
		DaysActive: daysActive,
		Tags: tags,
		Action: action,
		ImageUrl: imageUrl
	};
	const url = BACKEND_API_URL + '/general/notices';
	return await post_(sessionId, url, body, true);
};

export const getLinkageById = async (sessionId: string, linkageId: string) => {
	const url = BACKEND_API_URL + `/general/notices/${linkageId}`;
	return await get_(sessionId, url, true);
};

export const searchLinkages = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/general/notices/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateLinkage = async (
	sessionId: string,
	linkageId: string,
	title: string,
	description: string,
	link: string,
	daysActive: number,
	tags: string[],
	action: string,
	imageUrl: string
) => {
	const body = {
		Title: title,
		Description: description,
		Link: link,
		DaysActive: daysActive,
		Tags: tags,
		Action: action,
		ImageUrl: imageUrl
	};
	const url = BACKEND_API_URL + `/general/notices/${linkageId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteLinkage = async (sessionId: string, linkageId: string) => {
	const url = BACKEND_API_URL + `/general/notices/${linkageId}`;
	return await delete_(sessionId, url, true);
};

import { AWARDS_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createBadgeCategory = async (
	sessionId: string,
	clientId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: clientId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + '/badge-categories';
	return await post_(sessionId, url, body, true);
};

export const getBadgeCategoryById = async (sessionId: string, badgeCategoryId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await get_(sessionId, url, true);
};

export const searchBadgeCategorys = async (sessionId: string, searchParams?: any) => {
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
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateBadgeCategory = async (
	sessionId: string,
	badgeCategoryId: string,
	clientId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: clientId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteBadgeCategory = async (sessionId: string, badgeCategoryId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await delete_(sessionId, url, true);
};

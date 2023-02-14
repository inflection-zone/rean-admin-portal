import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createLinkage = async (
	sessionId: string,
	title: string,
	description: string,
	link: string,
	postDate: Date,
	daysActive: number,
	tags: string[],
	action: string,
	image: File
) => {
	const body = {
		Title: title,
		Description: description,
		Link: link,
		PostDate: postDate,
		DaysActive: daysActive,
		Tags: tags,
		Action: action,
		Image: image
	};

	const url = BACKEND_API_URL + '/linkage';
	return await post_(sessionId, url, body, true);
};

export const getLinkageById = async (sessionId: string, linkageId: string) => {
	const url = BACKEND_API_URL + `/linkage/${linkageId}`;
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

export const updateLinkage = async (
	sessionId: string,
	linkageId: string,
	title: string,
	description: string,
	link: string,
	postDate: Date,
	daysActive: number,
	tags: string[],
	action: string,
	image: File
) => {
	const body = {
		Title: title,
		Description: description,
		Link: link,
		PostDate: postDate,
		DaysActive: daysActive,
		Tags: tags,
		Action: action,
		Image: image
	};
	const url = BACKEND_API_URL + `/linkage/${linkageId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteLinkage = async (sessionId: string, linkageId: string) => {
	const url = BACKEND_API_URL + `/linkage/${linkageId}`;
	return await delete_(sessionId, url, true);
};

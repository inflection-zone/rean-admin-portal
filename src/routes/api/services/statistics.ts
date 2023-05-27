import { BACKEND_API_URL } from '$env/static/private';
import { get_ } from './common';

////////////////////////////////////////////////////////////////

export const getTolalUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/users${searchString}`;
  console.log("url", url)
	return await get_(sessionId, url, true);
};

export const getActiveUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/active-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getGenderWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/gender-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAgeWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/age-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getMaritalStatusWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/marital-status-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getDeviceDetailWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/device-detail-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getDeletdUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/deleted-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getEnrollmetUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/enrollment-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAppDownloadsData = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/app-downloads${searchString}`;
	return await get_(sessionId, url, true);
};

export const getCountryWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/country-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getMajorAilment = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/major-ailment-wise-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getObesityDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/obesity-distribution${searchString}`;
	return await get_(sessionId, url, true);
};

export const getOverallUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/overall-users${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAddictioDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/addiction-distribution${searchString}`;
	return await get_(sessionId, url, true);
};

export const getHealthPillarDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/statistics/health-pillar-distribution${searchString}`;
	return await get_(sessionId, url, true);
};
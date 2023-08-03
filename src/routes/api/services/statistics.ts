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
	const url = BACKEND_API_URL + `/users-statistics/users${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/active-users${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/genders${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/ages${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/marital-statuses${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/device-details${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/deleted-users${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/enrollments${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/app-downloads${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/countries${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/major-ailments${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/obesities${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/users-count${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAddictionDistribution = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/users-statistics/addictions${searchString}`;
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
	const url = BACKEND_API_URL + `/users-statistics/health-pillars${searchString}`;
	return await get_(sessionId, url, true);
};

export const getRoleDistribution = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/users-statistics/roles${searchString}`;
	return await get_(sessionId, url, true);
};

export const getBiometricsDistribution = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/users-statistics/biometrics${searchString}`;
	return await get_(sessionId, url, true);
};

export const getUsersStats= async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/users-statistics/users-stats${searchString}`;
	return await get_(sessionId, url, true);
};
import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createPriorityHealth = async (
	sessionId: string,
	patientUserId: string,
	provider: string,
	source: string,
	enrollmentId: string,
	careplanCode: string,
	careplanName: string,
	healthPriorityType: string,
	isPrimary: boolean
) => {
	const body = {
		PatientUserId: patientUserId,
		Provider: provider,
		Source: source,
		EnrollmentId: enrollmentId,
		CareplanCode: careplanCode,
		CareplanName: careplanName,
		HealthPriorityType: healthPriorityType,
		IsPrimary: isPrimary
	};

	const url = BACKEND_API_URL + '/patient-health-priorities';
	return await post_(sessionId, url, body, true);
};

export const getPriorityHealthById = async (sessionId: string, priorityHealthId: string) => {
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityHealthId}`;
	return await get_(sessionId, url, true);
};

export const searchAssets = async (sessionId: string, selectAsset: string, searchParams = '') => {
	let searchString = '';
	const keys = Object.keys(searchParams);
	if (keys.length > 0) {
		searchString = '?';
		for (const key of keys) {
			searchString += `${key}=${searchParams[key]}`;
		}
	}
	const url = BACKEND_API_URL + `/patient-health-priorities/search${searchString}/`;
	return await get_(sessionId, url, true);
};

export const updatePriorityHealth = async (
	sessionId: string,
	priorityHealthId: string,
	patientUserId: string,
	provider: string,
	source: string,
	enrollmentId: string,
	careplanCode: string,
	careplanName: string,
	healthPriorityType: string,
	isPrimary: boolean
) => {
	const body = {
		PatientUserId: patientUserId,
		Provider: provider,
		Source: source,
		EnrollmentId: enrollmentId,
		CareplanCode: careplanCode,
		CareplanName: careplanName,
		HealthPriorityType: healthPriorityType,
		IsPrimary: isPrimary
	};
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityHealthId}`;
	return await put_(sessionId, url, body, true);
};

export const deletePriorityHealth = async (sessionId: string, priorityHealthId: string) => {
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityHealthId}`;
	return await delete_(sessionId, url, true);
};

import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createPriority = async (
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

export const getPriorityById = async (sessionId: string, priorityId: string) => {
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityId}`;
	return await get_(sessionId, url, true);
};

export const searchPriorities = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/patient-health-priorities/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updatePriority = async (
	sessionId: string,
	priorityId: string,
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
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityId}`;
	return await put_(sessionId, url, body, true);
};

export const deletePriority = async (sessionId: string, priorityId: string) => {
	const url = BACKEND_API_URL + `/patient-health-priorities/${priorityId}`;
	return await delete_(sessionId, url, true);
};

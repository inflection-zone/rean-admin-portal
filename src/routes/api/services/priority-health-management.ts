import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createPriorityHealthManagement = async (
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

	const url = BACKEND_API_URL + '/priority-health-management';
	return await post_(sessionId, url, body, true);
};

export const getPriorityHealthManagementById = async (
	sessionId: string,
	priorityHealthManagementId: string
) => {
	const url = BACKEND_API_URL + `/priority-health-management/${priorityHealthManagementId}`;
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

export const updatePriorityHealthManagement = async (
	sessionId: string,
	priorityHealthManagementId: string,
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
	const url = BACKEND_API_URL + `/priority-health-management/${priorityHealthManagementId}`;
	return await put_(sessionId, url, body, true);
};

export const deletePriorityHealthManagement = async (
	sessionId: string,
	priorityHealthManagementId: string
) => {
	const url = BACKEND_API_URL + `/priority-health-management/${priorityHealthManagementId}`;
	return await delete_(sessionId, url, true);
};

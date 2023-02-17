import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createGoalCategoriesManagement = async (
	sessionId: string,
	patientUserId: string,
	enrollmentId: string,
	provider: string,
	careplanName: string,
	careplanCode: string,
	title: string,
	sequence: number,
	healthPriorityId: string,
	goalAchieved: boolean
) => {
	const body = {
		PatientUserId: patientUserId,
		EnrollmentId: enrollmentId,
		Provider: provider,
		CareplanName: careplanName,
		CareplanCode: careplanCode,
		Title: title,
		Sequence: sequence,
		HealthPriorityId: healthPriorityId,
		GoalAchieved: goalAchieved
	};

	const url = BACKEND_API_URL + '/goal-categories-management';
	return await post_(sessionId, url, body, true);
};

export const getGoalCategoriesManagementById = async (
	sessionId: string,
	goalCategoriesManagementId: string
) => {
	const url = BACKEND_API_URL + `/goal-categories-management/${goalCategoriesManagementId}`;
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

export const updateGoalCategoriesManagement = async (
	sessionId: string,
	goalCategoriesManagementId: string,
	patientUserId: string,
	enrollmentId: string,
	provider: string,
	careplanName: string,
	careplanCode: string,
	title: string,
	sequence: number,
	healthPriorityId: string,
	goalAchieved: boolean
) => {
	const body = {
		PatientUserId: patientUserId,
		EnrollmentId: enrollmentId,
		Provider: provider,
		CareplanName: careplanName,
		CareplanCode: careplanCode,
		Title: title,
		Sequence: sequence,
		HealthPriorityId: healthPriorityId,
		GoalAchieved: goalAchieved
	};
	const url = BACKEND_API_URL + `/goal-categories-management/${goalCategoriesManagementId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteGoalCategoriesManagement = async (
	sessionId: string,
	goalCategoriesManagementId: string
) => {
	const url = BACKEND_API_URL + `/goal-categories-management/${goalCategoriesManagementId}`;
	return await delete_(sessionId, url, true);
};

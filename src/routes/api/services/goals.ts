import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createGoal = async (
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
	const url = BACKEND_API_URL + '/patient-goals';
	return await post_(sessionId, url, body, true);
};

export const getGoalById = async (sessionId: string, goalId: string) => {
	const url = BACKEND_API_URL + `/patient-goals/${goalId}`;
	return await get_(sessionId, url, true);
};

export const searchGoals = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/patient-goals/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateGoal = async (
	sessionId: string,
	goalId: string,
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
	const url = BACKEND_API_URL + `/patient-goals/${goalId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteGoal = async (sessionId: string, goalId: string) => {
	const url = BACKEND_API_URL + `/patient-goals/${goalId}`;
	return await delete_(sessionId, url, true);
};

import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getgoalCategoriesManagementById,
	updategoalCategoriesManagement
} from '../../../api/services/goal-categories-management';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const goalCategoriesManagementId = event.params.id;
		console.log(goalCategoriesManagementId);
		const response = await getgoalCategoriesManagementById(sessionId, goalCategoriesManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goalCategoriesManagement = response.Data;
		console.log('goal categories management', goalCategoriesManagement);
		return {
			goalCategoriesManagement
		};
	} catch (error) {
		console.error(`Error retriving goal categories management: ${error.message}`);
	}
};

export const actions = {
	updategoalCategoriesManagement: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const patientUserId = data.has('patientUserId') ? data.get('patientUserId') : null;
		const enrollmentId = data.has('enrollmentId') ? data.get('enrollmentId') : null;
		const provider = data.has('provider') ? data.get('provider') : null;
		const careplanName = data.has('careplanName') ? data.get('careplanName') : null;
		const careplanCode = data.has('careplanCode') ? data.get('careplanCode') : null;
		const title = data.has('title') ? data.get('title') : null;
		const sequence = data.has('sequence') ? data.get('sequence') : null;
		const healthPriorityId = data.has('healthPriorityId') ? data.get('healthPriorityId') : null;
		const goalAchieved = data.has('goalAchieved') ? data.get('goalAchieved') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const goalCategoriesManagementId = event.params.id;
		console.log('goal categories management id', goalCategoriesManagementId);

		const response = await updategoalCategoriesManagement(
			sessionId,
			goalCategoriesManagementId,
			patientUserId.valueOf() as string,
			enrollmentId.valueOf() as string,
			provider.valueOf() as string,
			careplanName.valueOf() as string,
			careplanCode.valueOf() as string,
			title.valueOf() as string,
			sequence.valueOf() as number,
			healthPriorityId.valueOf() as string,
			goalAchieved.valueOf() as boolean
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/goal-categories-management/${id}/view`,
			successMessage(`goal categories management updated successful!`),
			event
		);
	}
};

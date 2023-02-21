import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getGoalById, updateGoal } from '../../../../../api/services/goals';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const goalId = event.params.id;
		console.log(goalId);
		const response = await getGoalById(sessionId, goalId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goal = response.Data;
		console.log('goal', goal);
		return {
			goal
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

export const actions = {
	updateGoal: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
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
		const goalId = event.params.id;
		console.log('goal id', goalId);

		const response = await updateGoal(
			sessionId,
			goalId,
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
			throw redirect(303, '/goals', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/goals/${id}/view`,
			successMessage(`goal updated successful!`),
			event
		);
	}
};

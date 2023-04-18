import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getGoalById, updateGoal } from '../../../../../api/services/goals';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const goalId = event.params.id;
		const response = await getGoalById(sessionId, goalId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goal = response.Data.GoalType;
		const id = response.Data.GoalType.id;
		return {
			location: `${id}/edit`,
			goal,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

export const actions = {
	updateGoalAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const sessionId = event.cookies.get('sessionId');
		const goalId = event.params.id;

		const response = await updateGoal(
			sessionId,
			goalId,
			type.valueOf() as string,
			tags?.valueOf() as string[]
		);
		const id = response.Data.GoalType.id;

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

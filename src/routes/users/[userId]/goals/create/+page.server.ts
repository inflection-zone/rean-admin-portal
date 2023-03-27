import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createGoal } from '../../../../api/services/goals';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createGoalAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createGoal(
			sessionId,
			type.valueOf() as string,
			tags.valueOf() as string[]
		);
		const id = response.Data.GoalType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/goals', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/goals/${id}/view`,
			successMessage(`goal created successful!`),
			event
		);
	}
};

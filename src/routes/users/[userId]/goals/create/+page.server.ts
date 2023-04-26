import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createGoal } from '../../../../api/services/goals';
import { z } from 'zod';
import type { GoalTypeDomainModel } from '$routes/api/domain-types/goal-types';

/////////////////////////////////////////////////////////////////////////
const createGoalTypeSchema = z.object({
	type: z.string(),
	tags: z.array(z.string()).optional(),
});

export const actions = {
	createGoalAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : [];

		const formData = {
			type: type,
			tags: tags
		}

    let result : GoalTypeDomainModel = {};
		try {
			result = createGoalTypeSchema.parse(formData);
			console.log('result-----------', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await createGoal(
			sessionId,
			result.type,
			result.tags
		);
		const id = response.Data.GoalType.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/goals`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/goals/${id}/view`,
			successMessage(`Goal type created successfully !`),
			event
		);
	}
};

import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createGoal } from '../../../../api/services/goals';

/////////////////////////////////////////////////////////////////////////

const createGoalTypeSchema = zfd.formData({
	type: z.string().max(256),
	tags: z.array(z.string()).optional()
});

export const actions = {
	createGoalAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type GoalTypeSchema = z.infer<typeof createGoalTypeSchema>;
		let result: GoalTypeSchema = {};

		try {
			result = createGoalTypeSchema.parse(formDataValue);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await createGoal(sessionId, result.type, result.tags);
		const id = response.Data.GoalType.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/goals`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/goals/${id}/view`,
			successMessage(`Goal type created successfully!`),
			event
		);
	}
};

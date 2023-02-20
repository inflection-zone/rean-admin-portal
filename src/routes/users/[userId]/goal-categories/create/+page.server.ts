import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { creategoalCategoriesManagement } from '../../../../api/services/goals';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	creategoalCategoriesManagement: async (event: RequestEvent) => {
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

		const response = await creategoalCategoriesManagement(
			sessionId,
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
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/goal-categories-management', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/goal-categories-management/${id}/view`,
			successMessage(`goal categories management created successful!`),
			event
		);
	}
};

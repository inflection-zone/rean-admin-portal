import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createPriority } from '../../../../api/services/priorities';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createPriorityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createPriority(
			sessionId,
			type.valueOf() as string,
			tags.valueOf() as string[]
		);
		const id = response.Data.PriorityType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/priorities', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priorities/${id}/view`,
			successMessage(`priority created successful!`),
			event
		);
	}
};

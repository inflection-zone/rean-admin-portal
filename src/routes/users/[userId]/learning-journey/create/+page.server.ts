import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createlearningJourney } from '../../../../api/services/learning-journey';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createlearningJourney: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		const name = data.has('name') ? data.get('name') : null;
		const preferenceWeight = data.has('preferenceWeight') ? data.get('preferenceWeight') : null;
		const description = data.has('description') ? data.get('description') : null;
		const image = data.has('image') ? data.get('image') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createlearningJourney(
			sessionId,
			name.valueOf() as string,
			preferenceWeight.valueOf() as number,
			description.valueOf() as string,
			image.valueOf() as File
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/learning-journey', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journey/${id}/view`,
			successMessage(`learning journey created successful!`),
			event
		);
	}
};

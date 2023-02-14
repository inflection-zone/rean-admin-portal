import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourse } from '../../../api/services/course';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createCourse: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const name = data.has('name') ? data.get('name') : null;
		const learningJourney = data.has('learningJourney') ? data.get('learningJourney') : null;
		const description = data.has('description') ? data.get('description') : null;
		const image = data.has('image') ? data.get('image') : null;
		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createCourse(
			sessionId,
			name.valueOf() as string,
			learningJourney.valueOf() as string,
			description.valueOf() as string,
			image.valueOf() as File
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/learning-journey/course${id}/view`,
			successMessage(`course created successful!`),
			event
		);
	}
};

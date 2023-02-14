import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createModule } from '../../../api/services/module';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createModule: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const learningJourney = data.has('learningJourney') ? data.get('learningJourney') : null;
		const course = data.has('course') ? data.get('course') : null;
		const contentType = data.has('contentType') ? data.get('contentType') : null;
		const resourceLink = data.has('resourceLink') ? data.get('resourceLink') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createModule(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			learningJourney.valueOf() as string,
			course.valueOf() as string,
			contentType.valueOf() as string,
			resourceLink.valueOf() as string
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/learning-journey/module${id}/view`,
			successMessage(`module created successful!`),
			event
		);
	}
};

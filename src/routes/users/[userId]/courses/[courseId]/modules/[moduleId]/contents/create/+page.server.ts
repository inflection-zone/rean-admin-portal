import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourseContent } from '../../../../../../../../api/services/course.contents';
/////////////////////////////////////////////////////////////////////////

export const actions = {
	createCourseContentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const learningJourney = data.has('learningJourney') ? data.get('learningJourney') : null;
		const course = data.has('course') ? data.get('course') : null;
		const contentType = data.has('contentType') ? data.get('contentType') : null;
		const resourceLink = data.has('resourceLink') ? data.get('resourceLink') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createCourseContent(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			learningJourney.valueOf() as string,
			course.valueOf() as string,
			contentType.valueOf() as string,
			resourceLink.valueOf() as string
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/learning-journeys/modules', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/course/modules/${id}/view`,
			successMessage(`module created successful!`),
			event
		);
	}
};

import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourse } from '../../../../api/services/courses';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createCourseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const description = data.has('description') ? data.get('description') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const durationInDays = data.has('durationInDays') ? data.get('durationInDays') : null;
		const sessionId = event.cookies.get('sessionId');
		
		const response = await createCourse(
			sessionId,
			name.valueOf() as string,
			description.valueOf() as string,
			imageUrl.valueOf() as string,
			durationInDays?.valueOf() as number
		);
		const courseId = response.Data.Course.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/view`,
			successMessage(`Course created successfully !`),
			event
		);
	}
};

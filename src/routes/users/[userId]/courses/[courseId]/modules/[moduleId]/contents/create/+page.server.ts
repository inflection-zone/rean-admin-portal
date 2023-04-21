import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourseContent } from '../../../../../../../../api/services/course.contents';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createCourseContentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const sequence = data.has('sequence') ? data.get('sequence') : null;
		const contentType = data.has('contentType') ? data.get('contentType') : null;
		const resourceLink = data.has('resourceLink') ? data.get('resourceLink') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createCourseContent(
			sessionId,
			// courseId,
			moduleId,
			title.valueOf() as string,
			description.valueOf() as string,
			sequence.valueOf() as number,
			contentType.valueOf() as string,
			resourceLink.valueOf() as string,
			imageUrl.valueOf() as string
		);
		const id = response.Data.CourseContent.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/view`,
			successMessage(`Content created successfully !`),
			event
		);
	}
};

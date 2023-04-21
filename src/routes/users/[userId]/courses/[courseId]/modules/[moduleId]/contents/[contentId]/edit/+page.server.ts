import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getCourseContentById,
	updateCourseContent
} from '../../../../../../../../../api/services/course.contents';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const contentId = event.params.contentId;
		const response = await getCourseContentById(sessionId, contentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const content = response.Data.CourseContent;
		return {
			content
		};
	} catch (error) {
		console.error(`Error retriving content: ${error.message}`);
	}
};

export const actions = {
	updateCourseContentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;
		const contentId = event.params.contentId;

		const data = await request.formData();
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const sequence = data.has('sequence') ? data.get('sequence') : null;
		const contentType = data.has('contentType') ? data.get('contentType') : null;
		const resourceLink = data.has('resourceLink') ? data.get('resourceLink') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');
		console.log('data', data);
		const response = await updateCourseContent(
			sessionId,
			moduleId,
			contentId,
			title.valueOf() as string,
			description.valueOf() as string,
			sequence.valueOf() as number,
			contentType.valueOf() as string,
			resourceLink.valueOf() as string,
			imageUrl.valueOf() as string
		);
		const id = response.Data.CourseContent.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/view`,
			successMessage(`Content updated successfully !`),
			event
		);
	}
};

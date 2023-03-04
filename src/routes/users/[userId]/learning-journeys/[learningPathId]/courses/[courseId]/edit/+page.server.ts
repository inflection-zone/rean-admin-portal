import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getCourseById, updateCourse } from '../../../../../../../api/services/courses';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const courseId = event.params.id;
		const response = await getCourseById(sessionId, courseId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const course = response.Data;
		return {
			course
		};
	} catch (error) {
		console.error(`Error retriving course: ${error.message}`);
	}
};

export const actions = {
	updateCourseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const learningJourney = data.has('learningJourney') ? data.get('learningJourney') : null;
		const description = data.has('description') ? data.get('description') : null;
		const image = data.has('image') ? data.get('image') : null;
		const sessionId = event.cookies.get('sessionId');
		const courseId = event.params.id;

		const response = await updateCourse(
			sessionId,
			courseId,
			name.valueOf() as string,
			learningJourney.valueOf() as string,
			description.valueOf() as string,
			image.valueOf() as File
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/learning-journeys/courses', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/courses/${id}/view`,
			successMessage(`course updated successful!`),
			event
		);
	}
};

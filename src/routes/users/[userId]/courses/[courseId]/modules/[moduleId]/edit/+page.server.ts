import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getModuleById, updateModule } from '../../../../../../../api/services/modules';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const moduleId = event.params.moduleId;
		const response = await getModuleById(sessionId, moduleId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const module = response.Data.CourseModule;
		return {
			module
		};
	} catch (error) {
		console.error(`Error retriving module: ${error.message}`);
	}
};

export const actions = {
	updateModuleAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const description = data.has('description') ? data.get('description') : null;
		// const sequence = data.has('sequence') ? data.get('sequence') : null;
		const durationInMins = data.has('durationInMins') ? data.get('durationInMins') : null;
		const sessionId = event.cookies.get('sessionId');
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;

		const response = await updateModule(
			sessionId,
			moduleId,
			courseId,
			name.valueOf() as string,
			description.valueOf() as string,
			// sequence.valueOf() as number,
			durationInMins.valueOf() as number
		);
		const id = response.Data.CourseModule.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/courses/${courseId}/modules`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${id}/view`,
			successMessage(`module updated successful!`),
			event
		);
	}
};

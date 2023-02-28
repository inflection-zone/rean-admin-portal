import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getModuleById, updateModule } from '../../../../../../api/services/modules';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const moduleId = event.params.id;
		console.log(moduleId);
		const response = await getModuleById(sessionId, moduleId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const module = response.Data;
		console.log('module', module);
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
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const learningJourney = data.has('learningJourney') ? data.get('learningJourney') : null;
		const course = data.has('course') ? data.get('course') : null;
		const contentType = data.has('contentType') ? data.get('contentType') : null;
		const resourceLink = data.has('resourceLink') ? data.get('resourceLink') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const moduleId = event.params.id;
		console.log('module id', moduleId);

		const response = await updateModule(
			sessionId,
			moduleId,
			title.valueOf() as string,
			description.valueOf() as string,
			learningJourney.valueOf() as string,
			course.valueOf() as string,
			contentType.valueOf() as string,
			resourceLink.valueOf() as string
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/learning-journeys/modules', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/modules/${id}/view`,
			successMessage(`module updated successful!`),
			event
		);
	}
};

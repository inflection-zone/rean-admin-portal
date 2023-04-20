import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import { getPriorityById, updatePriority } from '../../../../../api/services/priorities';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const priorityId = event.params.id;
		const response = await getPriorityById(sessionId, priorityId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priority = response.Data.PriorityType;
		const id = response.Data.PriorityType.id;
		return {
			location: `${id}/edit`,
			priority,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving priority: ${error.message}`);
	}
};

export const actions = {
	updatePriorityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const sessionId = event.cookies.get('sessionId');
		const priorityId = event.params.id;

		const response = await updatePriority(
			sessionId,
			priorityId,
			type.valueOf() as string,
			tags.valueOf() as string[]
		);
		const id = response.Data.PriorityType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/priorities', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priorities/${id}/view`,
			successMessage(`priority updated successful!`),
			event
		);
	}
};

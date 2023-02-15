import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getknowledgeNuggetsById,
	updateknowledgeNuggets
} from '../../../../../api/services/knowledge-nuggets';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const knowledgeNuggetsId = event.params.id;
		console.log(knowledgeNuggetsId);
		const response = await getknowledgeNuggetsById(sessionId, knowledgeNuggetsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const knowledgeNuggets = response.Data;
		console.log('knowledge nuggets', knowledgeNuggets);
		return {
			knowledgeNuggets
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};

export const actions = {
	updateknowledgeNuggets: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		const name = data.has('name') ? data.get('name') : null;
		const briefInformation = data.has('briefInformation') ? data.get('briefInformation') : null;
		const detailedInformation = data.has('detailedInformation')
			? data.get('detailedInformation')
			: null;
		const additionalResource = data.has('additionalResource')
			? data.get('additionalResource')
			: null;
		const temp = data.has('tags') ? data.get('tags') : null;
		const tags = temp ? JSON.parse(temp?.valueOf() as string) : [];

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const knowledgeNuggetsId = event.params.id;
		console.log('knowledge nuggets id', knowledgeNuggetsId);

		const response = await updateknowledgeNuggets(
			sessionId,
			knowledgeNuggetsId,
			name.valueOf() as string,
			briefInformation.valueOf() as string,
			detailedInformation.valueOf() as string,
			additionalResource.valueOf() as string,
			tags
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/knowledge-nuggets', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/knowledge-nuggets/${id}/view`,
			successMessage(`knowledge nuggets updated successful!`),
			event
		);
	}
};

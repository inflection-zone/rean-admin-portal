import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getKnowledgeNuggetById,
	updateKnowledgeNugget
} from '../../../../../api/services/knowledge-nuggets';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const knowledgeNuggetsId = event.params.id;
		const response = await getKnowledgeNuggetById(sessionId, knowledgeNuggetsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const KnowledgeNugget = response.Data.KnowledgeNugget;
		console.log(KnowledgeNugget);
		const id = response.Data.KnowledgeNugget.id;
		return {
			location: `${id}/edit`,
			KnowledgeNugget,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};

export const actions = {
	updateKnowledgeNuggetAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const topicName = data.has('topicName') ? data.get('topicName') : null;
		const briefInformation = data.has('briefInformation') ? data.get('briefInformation') : null;
		const detailedInformation = data.has('detailedInformation')
			? data.get('detailedInformation')
			: null;
		const additionalResources = data.has('additionalResources')
			? data.getAll('additionalResources')
			: null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const sessionId = event.cookies.get('sessionId');
		const knowledgeNuggetsId = event.params.id;

		const response = await updateKnowledgeNugget(
			sessionId,
			knowledgeNuggetsId,
			topicName?.valueOf() as string,
			briefInformation?.valueOf() as string,
			detailedInformation?.valueOf() as string,
			additionalResources?.valueOf() as string[],
			tags?.valueOf() as string[]
		);
		const id = response.Data.KnowledgeNugget.id;

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

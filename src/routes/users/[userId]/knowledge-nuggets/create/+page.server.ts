import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createKnowledgeNugget } from '../../../../api/services/knowledge-nuggets';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createKnowledgeNuggetAction: async (event: RequestEvent) => {
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

		const response = await createKnowledgeNugget(
			sessionId,
			topicName.valueOf() as string,
			briefInformation.valueOf() as string,
			detailedInformation.valueOf() as string,
			additionalResources?.valueOf() as string[],
			tags?.valueOf() as string[]
		);
		const id = response.Data.KnowledgeNugget.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/knowledge-nuggets`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/knowledge-nuggets/${id}/view`,
			successMessage(`Knowledge nuggets created successfully !`),
			event
		);
	}
};

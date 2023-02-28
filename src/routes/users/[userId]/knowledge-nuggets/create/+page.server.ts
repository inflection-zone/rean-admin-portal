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
		console.log(data);
		const topicName = data.has('topicName') ? data.get('topicName') : null;
		const briefInformation = data.has('briefInformation') ? data.get('briefInformation') : null;
		const detailedInformation = data.has('detailedInformation')
			? data.get('detailedInformation')
			: null;
		// const additional = data.has('additionalResource') ? data.get('additionalResource') : null;
		// const additionalResource = additional ? JSON.parse(additional?.valueOf() as string) : [];
		const temp = data.has('tags') ? data.get('tags') : null;
		const tags = temp ? JSON.parse(temp?.valueOf() as string) : [];

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createKnowledgeNugget(
			sessionId,
			topicName.valueOf() as string,
			briefInformation.valueOf() as string,
			detailedInformation.valueOf() as string,
			// additionalResource,
			tags
		);
		const id = response.Data.KnowledgeNugget.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/knowledge-nuggets', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/knowledge-nuggets/${id}/view`,
			successMessage(`knowledge nuggets created successful!`),
			event
		);
	}
};

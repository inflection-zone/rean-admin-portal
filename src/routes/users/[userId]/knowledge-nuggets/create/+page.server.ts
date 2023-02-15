import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createknowledgeNuggets } from '../../../../api/services/knowledge-nuggets';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createknowledgeNuggets: async (event: RequestEvent) => {
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

		const response = await createknowledgeNuggets(
			sessionId,
			name.valueOf() as string,
			briefInformation.valueOf() as string,
			detailedInformation.valueOf() as string,
			additionalResource.valueOf() as string,
			tags
		);
		const id = response.Data.id;
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

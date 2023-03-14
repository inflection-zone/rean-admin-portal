import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createSymptom } from '../../../../api/services/symptoms';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createSymptomAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const symptom = data.has('symptom') ? data.get('symptom') : null;
		const description = data.has('description') ? data.get('description') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const language = data.has('language') ? data.get('language') : null;
		const imageResourceId = data.has('imageResourceId') ? data.get('imageResourceId') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createSymptom(
			sessionId,
			symptom.valueOf() as string,
			description.valueOf() as string,
			tags.valueOf() as string[],
			language.valueOf() as string,
			imageResourceId.valueOf() as string,
		);
		const id = response.Data.SymptomType.id;
		
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/symptoms', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/symptoms/${id}/view`,
			successMessage(`symptom created successful!`),
			event
		);
	}
};

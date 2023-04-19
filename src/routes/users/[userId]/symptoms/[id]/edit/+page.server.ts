import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { BACKEND_API_URL } from '$env/static/private';
import type { PageServerLoad, Action } from './$types';
import { getSymptomById, updateSymptom } from '../../../../../api/services/symptoms';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const symptomId = event.params.id;
		const response = await getSymptomById(sessionId, symptomId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptom = response.Data.SymptomType;
		const imageResourceId = symptom.ImageResourceId;
		if (imageResourceId) {
			symptom['ImageUrl'] =
				BACKEND_API_URL + `/file-resources/${imageResourceId}/download?disposition=inline`;
		} else {
			symptom['ImageUrl'] = null;
		}
		return {
			symptom
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
	}
};

export const actions = {
	updateSymptomAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const symptom = data.has('symptom') ? data.get('symptom') : null;
		const description = data.has('description') ? data.get('description') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const language = data.has('language') ? data.get('language') : null;
		const imageResourceId = data.has('imageResourceId') ? data.get('imageResourceId') : null;
		const sessionId = event.cookies.get('sessionId');
		const symptomId = event.params.id;

		const response = await updateSymptom(
			sessionId,
			symptomId,
			symptom.valueOf() as string,
			description.valueOf() as string,
			tags.valueOf() as string[],
			language.valueOf() as string,
			imageResourceId.valueOf() as string
		);

		const id = response.Data.SymptomType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/symptoms', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/symptoms/${id}/view`,
			successMessage(`symptom updated successful!`),
			event
		);
	}
};

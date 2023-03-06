import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
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
		const symptom = response.Data;
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
		const temp = data.has('tags') ? data.get('tags') : null;
		const tags = temp ? JSON.parse(temp?.valueOf() as string) : [];
		const language = data.has('language') ? data.get('language') : null;
		const imageResourceId = data.has('imageResourceId') ? data.get('imageResourceId') : null;
		const sessionId = event.cookies.get('sessionId');
		const symptomId = event.params.id;

		const response = await updateSymptom(
			sessionId,
			symptomId,
			symptom.valueOf() as string,
			description.valueOf() as string,
			tags,
			language.valueOf() as string,
			imageResourceId.valueOf() as string
		);
		const id = response.Data.id;

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

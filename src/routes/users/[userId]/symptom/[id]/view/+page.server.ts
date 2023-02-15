import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getSymptomById } from '../../../../../api/services/symptom';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const symptomId = event.params.id;
		console.log(symptomId);
		const response = await getSymptomById(sessionId, symptomId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptom = response.Data;
		console.log('symptom', symptom);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			symptom,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
	}
};

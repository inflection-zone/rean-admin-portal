import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getSymptomById } from '../../../../../api/services/symptoms';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const symptomId = event.params.id;
		const response = await getSymptomById(sessionId, symptomId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptom = response.Data;
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

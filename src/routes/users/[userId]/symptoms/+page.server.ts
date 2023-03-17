import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchSymptoms } from '../../../api/services/symptoms';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchSymptoms(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptom = response.Data.SymptomTypes.Items;
		return {
			symptom,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
	}
};

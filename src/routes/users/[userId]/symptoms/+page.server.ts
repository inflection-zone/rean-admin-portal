import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import { searchSymptoms } from '../../../api/services/symptoms';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchSymptoms(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptoms = response.Data.SymptomTypes.Items;
		console.log('data===',symptoms)

		for (const symptom of symptoms) {
			if (symptom.ImageResourceId) {
				symptom['ImageUrl'] =
					BACKEND_API_URL +
					`/file-resources/${symptom.ImageResourceId}/download?disposition=inline`;
			} else {
				symptom['ImageUrl'] = null;
			}
		}
		return {
			symptoms,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
	}
};

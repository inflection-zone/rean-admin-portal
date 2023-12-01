import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { searchSymptoms } from '../../../api/services/symptoms';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchSymptoms(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}

		const symptomsCount = response.Data.SymptomTypes.TotalCount;
		const symptoms = response.Data.SymptomTypes.Items;

		// for (const symptom of symptoms) {
		// 	if (symptom.ImageResourceId) {
		// 		symptom['ImageUrl'] =
		// 			BACKEND_API_URL +
		// 			`/file-resources/${symptom.ImageResourceId}/download?disposition=inline`;
		// 	} else {
		// 		symptom['ImageUrl'] = null;
		// 	}
		// }
		return {
			symptomsCount,
			symptoms,
			sessionId,
			message: response.Message,
			backendUrl:BACKEND_API_URL
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving Lab record types`),event)
	}
};

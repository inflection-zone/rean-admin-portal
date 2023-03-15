import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchApiClients } from '../../../api/services/api-clients';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchApiClients(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}

		const apiClients = response.Data.ApiClientRecords.Items;
		return {
			apiClients,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};

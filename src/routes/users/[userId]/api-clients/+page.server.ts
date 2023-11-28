import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchApiClients } from '../../../api/services/api-clients';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchApiClients(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}

		const apiClients = response.Data.ApiClientRecords;
		return {
			apiClients,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving api-clients: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving api-clients`),event)
	}
};

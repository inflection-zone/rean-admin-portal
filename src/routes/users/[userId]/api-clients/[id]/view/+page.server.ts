import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad} from './$types';
import { getApiClientById } from '../../../../../api/services/api-clients';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId-------------', sessionId);

	try {
		const apiClientId = event.params.id;
		   console.log("apiclientId-------------", apiClientId);
		const response = await getApiClientById(sessionId, apiClientId);
		console.log("response-------------////", response);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const apiClient = response.Data.Client;
     console.log("apiClient---->",apiClient);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			apiClient,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving api client: ${error.message}`);
	}
};

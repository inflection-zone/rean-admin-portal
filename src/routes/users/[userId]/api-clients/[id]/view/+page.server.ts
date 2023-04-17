import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getApiClientById, getCurrentApiKey, updateApiKey } from '../../../../../api/services/api-clients';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const apiClientId = event.params.id;
		const response = await getApiClientById(sessionId, apiClientId);
		const apiClient = response.Data.Client;
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		
		return {
			apiClient,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving api client: ${error.message}`);
	}
};

export const actions = {
	getApiKey: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const clientCode = data.has('clientCode') ? data.get('clientCode') : null;
		const userName = data.has('userName') ? data.get('userName') : null;
		const password = data.has('password') ? data.get('password') : null;

		console.log("data",data)
		const response = await getCurrentApiKey(
			clientCode.valueOf() as string,
			userName.valueOf() as string,
			password.valueOf() as string,
		);
		const apiKeyDetails =  response.Data.ApiKeyDetails
		console.log("apiKeyDetails",apiKeyDetails)
		const id = apiKeyDetails.id

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/api-clients', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`api client updated successful!`),
			event
		);
	},
	// updateApiKey: async (event: RequestEvent) => {
	// 	const request = event.request;
	// 	const userId = event.params.userId;
	// 	const data = await request.formData();

	// 	const clientCode = data.has('clientCode') ? data.get('clientCode') : null;
		
	// 	const response = await updateApiKey(
	// 		clientCode.valueOf() as string,
	// 	);
	// 	const id = response.Data.Client.id;

	// 	if (response.Status === 'failure' || response.HttpCode !== 200) {
	// 		throw redirect(303, '/api-clients', errorMessage(response.Message), event);
	// 	}
	// 	throw redirect(
	// 		303,
	// 		`/users/${userId}/api-clients/${id}/view`,
	// 		successMessage(`api client updated successful!`),
	// 		event
	// 	);
	// }
};
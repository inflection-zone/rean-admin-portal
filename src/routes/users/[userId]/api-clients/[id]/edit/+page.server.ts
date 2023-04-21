import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getApiClientById, updateApiClient } from '../../../../../api/services/api-clients';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const apiClientId = event.params.id;
		const response = await getApiClientById(sessionId, apiClientId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const apiClient = response.Data.Client;
		return {
			apiClient
		};
	} catch (error) {
		console.error(`Error retriving api client: ${error.message}`);
	}
};

export const actions = {
	updateApiClientAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const clientName = data.has('clientName') ? data.get('clientName') : null;
		const password = data.has('password') ? data.get('password') : null;
		const phone = data.has('phone') ? data.get('phone') : null;
		const email = data.has('email') ? data.get('email') : null;
		const sessionId = event.cookies.get('sessionId');
		const apiClientId = event.params.id;

		const response = await updateApiClient(
			sessionId,
			apiClientId,
			clientName.valueOf() as string,
			password.valueOf() as string,
			phone.valueOf() as number,
			email.valueOf() as string
		);
		const id = response.Data.Client.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/api-clients`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`Api client updated successfully !`),
			event
		);
	}
};

import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getapiKeyManagementById,
	updateapiKeyManagement
} from '../../../api/services/api-key-management';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const apiKeyManagementId = event.params.id;
		console.log(apiKeyManagementId);
		const response = await getapiKeyManagementById(sessionId, apiKeyManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const apiKeyManagement = response.Data;
		console.log('api key management', apiKeyManagement);
		return {
			apiKeyManagement
		};
	} catch (error) {
		console.error(`Error retriving api key management: ${error.message}`);
	}
};

export const actions = {
	updateapiKeyManagement: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const clientName = data.has('clientName') ? data.get('clientName') : null;
		const password = data.has('password') ? data.get('password') : null;
		const phone = data.has('phone') ? data.get('phone') : null;
		const email = data.has('email') ? data.get('email') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const apiKeyManagementId = event.params.id;
		console.log('api key management id', apiKeyManagementId);

		const response = await updateapiKeyManagement(
			sessionId,
			apiKeyManagementId,
			clientName.valueOf() as string,
			password.valueOf() as string,
			phone.valueOf() as number,
			email.valueOf() as string
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/api-key-management/${id}/view`,
			successMessage(`api key management updated successful!`),
			event
		);
	}
};

import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createApiClient } from '../../../../api/services/api-clients';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createApiClientAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const countryCode = '+91';
		const clientName = data.has('clientName') ? data.get('clientName') : null;
		const password = data.has('password') ? data.get('password') : null;
		const phone = data.has('phone') ? data.get('phone') : null;
		const email = data.has('email') ? data.get('email') : null;
		const sessionId = event.cookies.get('sessionId');

		if (!phone && !countryCode) {
			throw error(400, `Phone is not valid!`);
		}

		const response = await createApiClient(
			sessionId,
			clientName.valueOf() as string,
			password.valueOf() as string,
			phone.valueOf() as string,
			email.valueOf() as string
		);

		const id = response.Data.Client.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/api-clients`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`Api client created successfully !`),
			event
		);
	}
};

import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createapiKeyManagement } from '../../api/services/api-key-management';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createapiKeyManagement: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const clientName = data.has('clientName') ? data.get('clientName') : null;
		const password = data.has('password') ? data.get('password') : null;
		const phone = data.has('phone') ? data.get('phone') : null;
		const email = data.has('email') ? data.get('email') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createapiKeyManagement(
			sessionId,
			clientName.valueOf() as string,
			password.valueOf() as string,
			phone.valueOf() as number,
			email.valueOf() as string
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/api-key-management/${id}/view`,
			successMessage(`Api key management created successful!`),
			event
		);
	}
};

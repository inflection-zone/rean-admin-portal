import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNotification } from '../../../../api/services/notifications';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNotification: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		console.log('data====', data);
		const title = data.has('title') ? data.get('title') : null;
		const Body = data.has('Body') ? data.get('Body') : null;
		const type = data.has('type') ? data.get('type') : null;
		//const sentOn = data.has('sentOn') ? data.get('sentOn') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		console.log('type===', type);

		const response = await createNotification(
			sessionId,
			title.valueOf() as string,
			Body.valueOf() as string,
			type.valueOf() as string
			//sentOn.valueOf() as Date
		);
		const id = response.Data.Notification.id;
		//console.log('res====<>', response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/notification', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notification/${id}/view`,
			successMessage(`notification created successful!`),
			event
		);
	}
};

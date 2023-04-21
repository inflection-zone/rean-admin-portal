import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNotification } from '../../../../api/services/notifications';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNotificationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const Body = data.has('Body') ? data.get('Body') : null;
		const type = data.has('type') ? data.get('type') : null;
		const broadcastToAll = data.has('broadcastToAll') ? data.get('broadcastToAll') : false;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createNotification(
			sessionId,
			title.valueOf() as string,
			Body.valueOf() as string,
			type.valueOf() as string,
			broadcastToAll?.valueOf() as boolean,
			imageUrl.valueOf() as string
		);
		const id = response.Data.Notification.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/notifications', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notifications/${id}/view`,
			successMessage(`notification created successful!`),
			event
		);
	}
};

import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getNotificationById, updateNotification } from '../../../../../api/services/notifications';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const notificationId = event.params.id;
		const response = await getNotificationById(sessionId, notificationId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notification = response.Data.Notification;
		const id = response.Data.Notification.id;
		return {
			sessionId,
			location: `${id}/edit`,
			notification,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notification: ${error.message}`);
	}
};

export const actions = {
	updateNotificationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const Body = data.has('Body') ? data.get('Body') : null;
		const type = data.has('type') ? data.get('type') : null;
		const broadcastToAll = data.has('broadcastToAll') ? data.get('broadcastToAll') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');
		const notificationId = event.params.id;

		const response = await updateNotification(
			sessionId,
			notificationId,
			title.valueOf() as string,
			Body.valueOf() as string,
			type.valueOf() as string,
			broadcastToAll?.valueOf() as boolean,
			imageUrl.valueOf() as string
		);
		const id = response.Data.Notification.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/notifications`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notifications/${id}/view`,
			successMessage(`Notification updated successfully !`),
			event
		);
	}
};

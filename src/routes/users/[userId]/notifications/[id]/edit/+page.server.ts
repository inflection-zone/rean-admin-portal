import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getNotificationById, updateNotification } from '../../../../../api/services/notifications';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const notificationId = event.params.id;
		console.log(notificationId);
		const response = await getNotificationById(sessionId, notificationId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notification = response.Data.Notification;
		console.log('notification', notification);

		const id = response.Data.Notification.id;
		return {
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
		console.log('data====',data);
		const title = data.has('title') ? data.get('title') : null;
		const Body = data.has('Body') ? data.get('Body') : null;
		const type = data.has('type') ? data.get('type') : null;
		// const sentOn = data.has('sentOn') ? data.get('sentOn') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		console.log('title---',title)
		console.log('Body---',Body)
		console.log('type---',type)
		// console.log('sentOn---',sentOn)

		const notificationId = event.params.id;
		console.log('notification id', notificationId);

		const response = await updateNotification(
			sessionId,
			notificationId,
			title.valueOf() as string,
			Body.valueOf() as string,
			type.valueOf() as string,
			// sentOn.valueOf() as Date
		);
		const id = response.Data.Notification.id;
		console.log(response)

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/notifications', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notifications/${id}/view`,
			successMessage(`notification updated successful!`),
			event
		);
	}
};

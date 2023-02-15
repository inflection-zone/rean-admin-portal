import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getNotificationById, updateNotification } from '../../../../../api/services/notification';

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
		const notification = response.Data;
		console.log('notification', notification);
		return {
			notification
		};
	} catch (error) {
		console.error(`Error retriving notification: ${error.message}`);
	}
};

export const actions = {
	updateNotification: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		const title = data.has('title') ? data.get('title') : null;
		const Body = data.has('Body') ? data.get('Body') : null;
		const type = data.has('type') ? data.get('type') : null;
		const sentOn = data.has('sentOn') ? data.get('sentOn') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const notificationId = event.params.id;
		console.log('notification id', notificationId);

		const response = await updateNotification(
			sessionId,
			notificationId,
			title.valueOf() as string,
			Body.valueOf() as string,
			type.valueOf() as string,
			sentOn.valueOf() as Date
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/notification', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notification/${id}/view`,
			successMessage(`notification updated successful!`),
			event
		);
	}
};

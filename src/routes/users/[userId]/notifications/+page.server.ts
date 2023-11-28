import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchNotifications } from '../../../api/services/notifications';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchNotifications(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notification = response.Data.NotificationRecords;
		return {
			notification,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notification: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving notification`),event)
	}
};

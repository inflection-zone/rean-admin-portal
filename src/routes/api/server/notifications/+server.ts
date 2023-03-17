import type { RequestEvent } from '@sveltejs/kit';
import { deleteNotification } from '../../services/notifications';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside notification server endpoints');
		const response = await deleteNotification(data.sessionId, data.notificationId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting notification: ${err.message}`);
		return new Response(err.message);
	}
};

import type { RequestEvent } from '@sveltejs/kit';
import { deleteNotice } from '../../services/notices';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside notice server endpoints');
		const response = await deleteNotice(data.sessionId, data.noticeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting notice: ${err.message}`);
		return new Response(err.message);
	}
};

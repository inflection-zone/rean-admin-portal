import type { RequestEvent } from '@sveltejs/kit';
import { deleteNewsfeed } from '../../services/newsfeeds';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside newsfeed server endpoints');
		const response = await deleteNewsfeed(data.sessionId, data.newsfeedId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting newsfeed: ${err.message}`);
		return new Response(err.message);
	}
};

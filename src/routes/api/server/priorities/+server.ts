import type { RequestEvent } from '@sveltejs/kit';
import { deletePriority } from '../../services/priorities';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside priority server endpoints');
		const response = await deletePriority(data.sessionId, data.priorityId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting priority: ${err.message}`);
		return new Response(err.message);
	}
};

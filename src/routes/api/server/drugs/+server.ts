import type { RequestEvent } from '@sveltejs/kit';
import { deleteDrug } from '../../services/drugs';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside drug server endpoints');
		const response = await deleteDrug(data.sessionId, data.drugId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting drug: ${err.message}`);
		return new Response(err.message);
	}
};

import type { RequestEvent } from '@sveltejs/kit';
import { deleteLinkage } from '../../services/linkages';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside linkage server endpoints');
		const response = await deleteLinkage(data.sessionId, data.linkageId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting linkage: ${err.message}`);
		return new Response(err.message);
	}
};

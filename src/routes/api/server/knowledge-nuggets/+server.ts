import type { RequestEvent } from '@sveltejs/kit';
import { deleteKnowledgeNugget } from '../../services/knowledge-nuggets';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside knowledge nugget server endpoints');
		const response = await deleteKnowledgeNugget(data.sessionId, data.knowledgeNuggetId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting knowledge nugget: ${err.message}`);
		return new Response(err.message);
	}
};

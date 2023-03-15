import type { RequestEvent } from '@sveltejs/kit';
import { deleteSymptom } from '../../services/symptoms';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside symptom server endpoints');
		const response = await deleteSymptom(data.sessionId, data.symptomId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting symptom: ${err.message}`);
		return new Response(err.message);
	}
};

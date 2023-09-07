import type { RequestEvent } from '@sveltejs/kit';
import { deleteLearningJourney } from '../../services/learning-journeys';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside learning journey server endpoints');
		const response = await deleteLearningJourney(data.sessionId, data.symptomId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting learning journey: ${err.message}`);
		return new Response(err.message);
	}
};

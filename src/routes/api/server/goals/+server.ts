import type { RequestEvent } from '@sveltejs/kit';
import { deleteGoal } from '../../services/goals';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside goal server endpoints');
		const response = await deleteGoal(data.sessionId, data.goalId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting goal: ${err.message}`);
		return new Response(err.message);
	}
};

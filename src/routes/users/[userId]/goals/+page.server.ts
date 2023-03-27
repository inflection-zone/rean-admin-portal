import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchGoals } from '../../../api/services/goals';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchGoals(sessionId);
		// if (response.Status === 'failure' || response.HttpCode !== 200) {
		// 	throw error(response.HttpCode, response.Message);
		// }
		const goal = response.Data.GoalTypes;
		return {
			goal,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

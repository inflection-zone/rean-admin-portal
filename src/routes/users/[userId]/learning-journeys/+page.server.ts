import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchLearningJourneys } from '../../../api/services/learning-journeys';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	console.log('sessionId', sessionId);
	try {
		const response = await searchLearningJourneys(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningPaths = response.Data.LearningPaths;
		console.log('learningPaths', learningPaths);
		return {
			learningPaths,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving learning paths: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving learning paths`),event)
	}
};

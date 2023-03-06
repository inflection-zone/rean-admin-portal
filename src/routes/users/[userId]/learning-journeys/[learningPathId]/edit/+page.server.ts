import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import {
	getLearningJourneyById,
	updateLearningJourney
} from '../../../../../api/services/learning-journeys';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const learningJourneyId = event.params.learningPathId;
		const response = await getLearningJourneyById(sessionId, learningJourneyId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningJourney = response.Data.LearningPath;
		return {
			learningJourney
		};
	} catch (error) {
		console.error(`Error retriving learning journey: ${error.message}`);
	}
};

export const actions = {
	updateLearningJourneyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const preferenceWeight = data.has('preferenceWeight') ? data.get('preferenceWeight') : null;
		const description = data.has('description') ? data.get('description') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');
		const learningJourneyId = event.params.learningPathId;

		const response = await updateLearningJourney(
			sessionId,
			learningJourneyId,
			name.valueOf() as string,
			preferenceWeight.valueOf() as number,
			description.valueOf() as string,
			imageUrl.valueOf() as File
		);
		const learningPathId = response.Data.LearningPath.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/learning-journeys', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/${learningPathId}/view`,
			successMessage(`learning journey updated successful!`),
			event
		);
	}
};

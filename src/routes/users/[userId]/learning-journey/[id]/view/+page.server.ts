import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getLearningJourneyById } from '../../../../../api/services/learning-journey';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const learningJourneyId = event.params.id;
		console.log(learningJourneyId);
		const response = await getLearningJourneyById(sessionId, learningJourneyId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningJourney = response.Data;
		console.log('learning journey', learningJourney);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			learningJourney,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving learning journey: ${error.message}`);
	}
};

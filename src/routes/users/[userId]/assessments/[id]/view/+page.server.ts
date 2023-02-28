import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getAssessmentById } from '../../../../../api/services/assessments';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const assessmentId = event.params.id;
		//console.log('knowid=====', knowledgeNuggetsId);
		const response = await getAssessmentById(sessionId, assessmentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessment = response.Data.assessment;
		console.log('assessment====', assessment);
		//const id = response.Data.id;
		const id = response.Data.assessment.id;
		//console.log('id====', id);
		return {
			location: `${id}/edit`,
			assessment,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment: ${error.message}`);
	}
};

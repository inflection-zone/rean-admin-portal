import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getAssessmentById } from '../../../../../api/services/assessments';
import type { PageServerLoad, Action } from './$types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentId = event.params.id;
		const response = await getAssessmentById(sessionId, assessmentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessment = response.Data.assessment;
		const id = response.Data.assessment.id;
		return {
			location: `${id}/edit`,
			assessment,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment: ${error.message}`);
	}
};

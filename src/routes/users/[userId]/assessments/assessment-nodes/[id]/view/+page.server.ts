import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getAssessmentNodeById } from '../../../../../../api/services/assessment-nodes';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentNodeId = event.params.id;
		const response = await getAssessmentNodeById(sessionId, assessmentNodeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNode = response.Data.assessmentNode;
		const id = response.Data.assessmentNode.id;
		return {
			location: `${id}/edit`,
			assessmentNode,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment node: ${error.message}`);
	}
};

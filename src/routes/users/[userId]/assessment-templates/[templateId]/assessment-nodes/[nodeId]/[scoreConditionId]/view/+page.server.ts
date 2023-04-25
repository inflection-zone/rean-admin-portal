import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAssessmentNodeById, getScoringCondition } from '../../../../../../../../api/services/assessment-nodes';
import { getAssessmentTemplateById } from '$routes/api/services/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentNodeId = event.params.nodeId;
		const templateId = event.params.templateId;
		const scoringConditionId = event.params.scoreConditionId;
		const response = await getAssessmentNodeById(sessionId, templateId, assessmentNodeId);
		const _templateScoringCondition = await getAssessmentTemplateById(sessionId, templateId) 
		const _scoringCondition = await getScoringCondition(sessionId, templateId, scoringConditionId)
		const templateScoringCondition = _templateScoringCondition.Data.AssessmentTemplate;
		const scoringCondition = _scoringCondition.Data.ScoringCondition;
		console.log("scoringCondition",scoringCondition);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNode = response.Data.AssessmentNode;
		const id = response.Data.AssessmentNode.id;
		return {
			location: `${id}/edit`,
			assessmentNode,
			sessionId,
			scoringCondition,
			templateScoringCondition,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment node: ${error.message}`);
	}
};

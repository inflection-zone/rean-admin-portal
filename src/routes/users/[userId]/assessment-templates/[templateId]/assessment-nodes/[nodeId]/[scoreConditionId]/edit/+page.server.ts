import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getAssessmentNodeById,
	getQueryResponseTypes,
	getScoringCondition,
	searchAssessmentNodes,
	updateAssessmentNode,
	updateScoringCondition
} from '../../../../../../../../api/services/assessment-nodes';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const templateId = event.params.templateId;
		const assessmentNodeId = event.params.nodeId;
		const scoringConditionId = event.params.scoreConditionId;
		const searchParams = {
			templateId: templateId
		};
		const _queryResponseTypes = await getQueryResponseTypes(sessionId);
		const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);
		const response = await getAssessmentNodeById(sessionId, templateId, assessmentNodeId);
		const _scoringCondition = await getScoringCondition(sessionId, templateId, scoringConditionId)
		const scoringCondition = _scoringCondition.Data.ScoringCondition;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNode = response.Data.AssessmentNode;
		const queryResponseTypes = _queryResponseTypes.Data.QueryResponseTypes;
		const assessmentNodes = _assessmentNodes.Data.AssessmentNodeRecords.Items;
		const id = response.Data.AssessmentNode.id;
		return {
			location: `${id}/edit`,
			assessmentNode,
			queryResponseTypes,
			assessmentNodes,
			scoringCondition,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment node: ${error.message}`);
	}
};

export const actions = {
	updateAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.templateId;
		const assessmentNodeId = event.params.nodeId;
		const scoreConditionId = event.params.scoreConditionId;
		const data = await request.formData();

		const nodeType = data.has('nodeType') ? data.get('nodeType') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const queryType = data.has('queryType') ? data.get('queryType') : null;
		const options = data.has('options') ? data.getAll('options') : [];
		const message = data.has('message') ? data.get('message') : null;
		const resolutionScore = data.has('resolutionScore') ? data.get('resolutionScore') : 1;
		const sessionId = event.cookies.get('sessionId');

		console.log('data', data);
		const response = await updateAssessmentNode(
			sessionId,
			templateId,
			assessmentNodeId,
			nodeType.valueOf() as string,
			title.valueOf() as string,
			description?.valueOf() as string,
			queryType?.valueOf() as string,
			options?.valueOf() as string[],
			message?.valueOf() as string
		);
		const nodeId = response.Data.AssessmentNode.id;

		console.log("response",response.Data)

		const scoringCondition = await updateScoringCondition(
			sessionId,
			templateId,
			nodeId,
			scoreConditionId,
			resolutionScore?.valueOf() as number,
		);

		const scoringConditionId = scoringCondition.Data.ScoringCondition.id;
		console.log("response",scoringCondition.Data.ScoringCondition)

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/assessment-templates`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/${scoringConditionId}/view`,
			successMessage(`Assessment node updated successfully !`),
			event
		);
	}
};

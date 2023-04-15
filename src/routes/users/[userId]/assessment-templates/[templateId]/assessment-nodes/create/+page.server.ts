import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	addScoringCondition,
	createAssessmentNode,
	getQueryResponseTypes,
	searchAssessmentNodes
} from '../../../../../../api/services/assessment-nodes';
import { getAssessmentTemplateById } from '../../../../../../api/services/assessment-templates';
import type { PageServerLoad } from './$types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const templateId = event.params.templateId;
		const searchParams = {
			templateId: templateId
		};
		const _queryResponseTypes = await getQueryResponseTypes(sessionId);
		const response = await searchAssessmentNodes(sessionId, searchParams);
		const _assessmentTemplate = await getAssessmentTemplateById(sessionId, templateId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const queryResponseTypes = _queryResponseTypes.Data.QueryResponseTypes;
		const assessmentNodes = response.Data.AssessmentNodeRecords.Items;
		const assessmentTemplate = _assessmentTemplate.Data.AssessmentTemplate;

		return {
			queryResponseTypes,
			assessmentNodes,
			assessmentTemplate,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving query response types: ${error.message}`);
	}
};

export const actions = {
	createAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.templateId;
		const data = await request.formData();

		const nodeType = data.has('nodeType') ? data.get('nodeType') : null;
		const parentNodeId = data.has('parentNodeId') ? data.get('parentNodeId') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const queryType = data.has('queryType') ? data.get('queryType') : null;
		const message = data.has('message') ? data.get('message') : null;
		const serveListNodeChildrenAtOnce = data.has('serveListNodeChildrenAtOnce')
			? data.get('serveListNodeChildrenAtOnce')
			: false;
		const options = data.has('options') ? data.getAll('options') : [];
		const resolutionScore = data.has('resolutionScore') ? data.get('resolutionScore') : null;
		const _scoringApplicable = data.has('scoringApplicable')
			? data.get('scoringApplicable')
			: false;
		const scoringApplicable = _scoringApplicable.valueOf() as boolean;
		console.log("scoringApplicable------------",scoringApplicable)
		const _queryType = queryType?.valueOf() as string;
		console.log("queryType",_queryType)
		const sessionId = event.cookies.get('sessionId');

		const response = await createAssessmentNode(
			sessionId,
			templateId,
			parentNodeId.valueOf() as string,
			nodeType.valueOf() as string,
			title.valueOf() as string,
			(description?.valueOf() as string) ?? null,
			(message?.valueOf() as string) ?? null,
			(serveListNodeChildrenAtOnce?.valueOf() as boolean) ?? null,
			(queryType?.valueOf() as string) ?? null,
			(options?.valueOf() as string[]) ?? null
		);
		const nodeId = response.Data.AssessmentNode.id;
		console.log("scoringApplicable",scoringApplicable);
		console.log("Query respose type", _queryType);

	if (
			(scoringApplicable === true) && 
			(_queryType ==='Single Choice Selection' ||
				_queryType === 'Multi Choice Selection' ||
				_queryType === 'Boolean')
		) {
			const scoringCondition = await 
			 addScoringCondition(
				sessionId,
				templateId,
				nodeId,
				resolutionScore?.valueOf() as number
			);
			console.log("scoringCondition----",scoringCondition);
		}

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/assessment-templates`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`,
			successMessage(`Assessment node updated successful!`),
			event
		);
	}
};

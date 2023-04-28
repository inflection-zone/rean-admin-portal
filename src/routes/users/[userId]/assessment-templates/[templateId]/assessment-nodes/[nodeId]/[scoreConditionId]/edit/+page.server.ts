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
import { zfd } from 'zod-form-data';
import { z } from 'zod';

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

const updateAssessmentNodeSchema = zfd.formData({
	nodeType: z.string(),
	title: z.string().min(8).max(256),
	description: z.string().optional(),
	queryType: z.string().optional(),
	resolutionScore:zfd.numeric(z.number().default(1)),
	providerAssessmentCode: z.string().optional(),
	message: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox({ trueValue: 'true' }),
	scoringApplicable: zfd.checkbox({ trueValue: 'true' }),
	options: z.array(z.string()),
});

export const actions = {
	updateAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.templateId;
		const assessmentNodeId = event.params.nodeId;
		const scoreConditionId = event.params.scoreConditionId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const options = data.has('options') ? data.getAll('options') : [];
		const formData = Object.fromEntries(data);
		const formDataValue = {...formData, options:options};

		type AssessmentNodeSchema = z.infer<typeof updateAssessmentNodeSchema>;

		let result: AssessmentNodeSchema = {};
		try {
			result = updateAssessmentNodeSchema.parse(formDataValue);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await updateAssessmentNode(
			sessionId,
			templateId,
			assessmentNodeId,
			result.nodeType,
		  result.title,
			result.description,
			result.queryType,
			result.options,
			result.message,
		);
		const nodeId = response.Data.AssessmentNode.id;

		console.log("response",response.Data)

		const scoringCondition = await updateScoringCondition(
			sessionId,
			templateId,
			nodeId,
			scoreConditionId,
			result.resolutionScore,
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

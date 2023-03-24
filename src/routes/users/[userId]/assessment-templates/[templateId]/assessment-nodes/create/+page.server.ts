import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAssessmentNode } from '../../../../../../api/services/assessment-nodes';
import { getAssessmentTemplateById } from '../../../../../../api/services/assessment-templates';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.templateId;
		const data = await request.formData();

		const nodeType = data.has('nodeType') ? data.get('nodeType') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const queryType = data.has('queryType') ? data.get('queryType') : null;
		const options = data.has('options') ? data.getAll('options') : [];
		const sessionId = event.cookies.get('sessionId');

		console.log("data",data)
		const _assessmentTemplate = await getAssessmentTemplateById(sessionId,templateId);
		const assessmentTemplate = _assessmentTemplate.Data.AssessmentTemplate;
		const parentNodeId = assessmentTemplate.RootNodeId;
		const response = await createAssessmentNode(
			sessionId,
			templateId,
			parentNodeId,
			nodeType.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			queryType.valueOf() as string,
			options.valueOf()as string[],
		);
		const nodeId = response.Data.AssessmentNode.id;
		console.log("response",response)
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/assessment-templates`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`,
			successMessage(`Assessment node updated successful!`),
			event
		);
	}
};

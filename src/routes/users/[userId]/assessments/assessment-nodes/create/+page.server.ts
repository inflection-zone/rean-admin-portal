import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAssessmentNode } from '../../../../../api/services/assessment-nodes';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const nodeType = data.has('nodeType') ? data.get('nodeType') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const queryType = data.has('queryType') ? data.get('queryType') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createAssessmentNode(
			sessionId,
			nodeType.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			queryType.valueOf() as string
		);
		const id = response.Data.assessmentNode.id;
		
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/assessments/assessment-nodes', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessments/assessment-nodes/${id}/view`,
			successMessage(`assessment node updated successful!`),
			event
		);
	}
};

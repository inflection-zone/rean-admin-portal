import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAssessmentTemplate } from '../../../../api/services/assessment-templates';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createAssessmentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const type = data.has('type') ? data.get('type') : null;
		const provider = data.has('provider') ? data.get('provider') : null;
		const providerAssessmentCode = data.has('providerAssessmentCode')
			? data.get('providerAssessmentCode')
			: null;
		const serveListNodeChildrenAtOnce = data.has('serveListNodeChildrenAtOnce')
			? data.get('serveListNodeChildrenAtOnce')
			: false;
			const scoringApplicable = data.has('scoringApplicable') ? data.get('scoringApplicable') : false;

		const sessionId = event.cookies.get('sessionId');

		console.log(data);
		const response = await createAssessmentTemplate(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			type.valueOf() as string,
			provider.valueOf() as string,
			providerAssessmentCode.valueOf() as string,
			serveListNodeChildrenAtOnce.valueOf() as boolean,
			scoringApplicable.valueOf() as boolean
		);
		const id = response.Data.AssessmentTemplate.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/assessment-templates`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${id}/view`,
			successMessage(`Assessment template created successfully !`),
			event
		);
	}
};

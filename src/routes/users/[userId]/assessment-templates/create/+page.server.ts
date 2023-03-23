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

		const assetCode = data.has('assetCode') ? data.get('assetCode') : 'Assessment';
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		// const displayCode = data.has('displayCode') ? data.get('displayCode') : null;
		const type = data.has('type') ? data.get('type') : null;
		const provider = data.has('provider') ? data.get('provider') : null;
		const providerAssessmentCode = data.has('providerAssessmentCode')
			? data.get('providerAssessmentCode')
			: null;
		// const serveListNodeChildrenAtOnce = data.has('serveListNodeChildrenAtOnce')
		// 	? data.get('serveListNodeChildrenAtOnce')
		// 	: null;
		const sessionId = event.cookies.get('sessionId');

		console.log(data)
		const response = await createAssessmentTemplate(
			sessionId,
			assetCode.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			// displayCode.valueOf() as string,
			type.valueOf() as string,
			provider.valueOf() as string,
			providerAssessmentCode.valueOf() as string,
			// serveListNodeChildrenAtOnce.valueOf() as string
		);
		const id = response.Data.AssessmentTemplate.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/assessment-templates', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${id}/view`,
			successMessage(`Assessment template created successful!`),
			event
		);
	}
};

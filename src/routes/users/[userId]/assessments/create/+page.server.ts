import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAssessment } from '../../../../api/services/assessments';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createAssessment: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		//console.log(data);
        const assetCode = data.has('assetCode') ? data.get('assetCode') : 'Assessment';
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const displayCode = data.has('displayCode') ? data.get('displayCode') : null;
		const type = data.has('type') ? data.get('type') : null;
		const providerAssessmentCode = data.has('providerAssessmentCode')
			? data.get('providerAssessmentCode')
			: null;
		const serveListNodeChildrenAtOnce = data.has('serveListNodeChildrenAtOnce')
			? data.get('serveListNodeChildrenAtOnce')
			: null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createAssessment(
			sessionId,
            assetCode.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			displayCode.valueOf() as string,
			type.valueOf() as string,
			providerAssessmentCode.valueOf() as string,
			serveListNodeChildrenAtOnce.valueOf() as string
		);
		const id = response.Data.assessment.id;
		//console.log('response', response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/assessments', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessments/${id}/view`,
			successMessage(`assessment created successful!`),
			event
		);
	}
};

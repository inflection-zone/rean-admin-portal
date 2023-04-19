import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getAssessmentTemplateById,
	updateAssessmentTemplate
} from '../../../../../api/services/assessment-templates';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentTemplateId = event.params.templateId;
		const response = await getAssessmentTemplateById(sessionId, assessmentTemplateId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentTemplate = response.Data.AssessmentTemplate;
		const id = response.Data.AssessmentTemplate.id;
		return {
			location: `${id}/edit`,
			assessmentTemplate,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessments: ${error.message}`);
	}
};

export const actions = {
	updateAssessmentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const assessmentTemplateId = event.params.templateId;

		const data = await request.formData();

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
		console.log('data', data);
		const response = await updateAssessmentTemplate(
			sessionId,
			assessmentTemplateId,
			title.valueOf() as string,
			description.valueOf() as string,
			// displayCode.valueOf() as string,
			type.valueOf() as string,
			provider.valueOf() as string,
			providerAssessmentCode.valueOf() as string
			// serveListNodeChildrenAtOnce.valueOf() as string
		);
		const id = response.Data.AssessmentTemplate.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/assessments', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${id}/view`,
			successMessage(`Assessment template updated successful!`),
			event
		);
	}
};

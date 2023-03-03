import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import { getAssessmentById, updateAssessment } from '../../../../../api/services/assessments';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentId = event.params.id;
		const response = await getAssessmentById(sessionId, assessmentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessment = response.Data.assessment;
		const id = response.Data.assessment.id;
		return {
			location: `${id}/edit`,
			assessment,
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
		const data = await request.formData();
		
		const assetCode = data.has('assetCode') ? data.get('assetCode') : 'Assessment';
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const displayCode = data.has('displayCode') ? data.get('displayCode') : null;
		const type = data.has('type') ? data.get('type') : null;
		const provider = data.has('provider') ? data.get('provider') : null;
		const providerAssessmentCode = data.has('providerAssessmentCode')
			? data.get('providerAssessmentCode')
			: null;
		const serveListNodeChildrenAtOnce = data.has('serveListNodeChildrenAtOnce')
			? data.get('serveListNodeChildrenAtOnce')
			: null;
		const sessionId = event.cookies.get('sessionId');
		const assessmentId = event.params.id;

		const response = await updateAssessment(
			sessionId,
			assessmentId,
			assetCode.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			displayCode.valueOf() as string,
			type.valueOf() as string,
			provider.valueOf() as string,
			providerAssessmentCode.valueOf() as string,
			serveListNodeChildrenAtOnce.valueOf() as string
		);
		const id = response.Data.assessment.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/assessments', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessments/${id}/view`,
			successMessage(`Assessment updated successful!`),
			event
		);
	}
};

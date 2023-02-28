import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getAssessmentById, updateAssessment } from '../../../../../api/services/assessments';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const assessmentId = event.params.id;
		console.log(assessmentId);
		const response = await getAssessmentById(sessionId, assessmentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessment = response.Data.assessment;
		console.log('assessment', assessment);
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
		console.log(data);
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

		const assessmentId = event.params.id;
		console.log('assessment id', assessmentId);

		const response = await updateAssessment(
			sessionId,
			assessmentId,
			assetCode.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			displayCode.valueOf() as string,
			type.valueOf() as string,
			providerAssessmentCode.valueOf() as string,
			serveListNodeChildrenAtOnce.valueOf() as string
		);
		const id = response.Data.assessment.id;
		console.log(response);

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

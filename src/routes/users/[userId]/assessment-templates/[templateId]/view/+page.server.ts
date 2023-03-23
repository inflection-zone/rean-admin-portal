import { error, type RequestEvent } from '@sveltejs/kit';
import { getAssessmentTemplateById } from '../../../../../api/services/assessment-templates';
import type { PageServerLoad } from './$types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentTemplateId = event.params.templateId;
		const response = await getAssessmentTemplateById(sessionId, assessmentTemplateId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessment = response.Data.AssessmentTemplate;
		console.log(assessment)
		const id = response.Data.AssessmentTemplate.id;
		return {
			location: `${id}/edit`,
			assessment,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment template: ${error.message}`);
	}
};

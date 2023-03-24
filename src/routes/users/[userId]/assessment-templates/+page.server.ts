import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchAssessmentTemplates } from '../../../api/services/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchAssessmentTemplates(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentTemplates = response.Data.AssessmentTemplateRecords.Items;
		return {
			assessmentTemplates,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment templates: ${error.message}`);
	}
};

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchAssessmentNodes } from '../../../../../api/services/assessment-nodes';
import { getAssessmentTemplateById } from '../../../../../api/services/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,params,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:viewAssessment');
	try {
		const assessmentTemplateId = params.templateId;
		const searchParams = {
			templateId: assessmentTemplateId
		};
		const response = await getAssessmentTemplateById(sessionId, assessmentTemplateId);
		const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentTemplate = response.Data.AssessmentTemplate;
		const assessmentNodes = _assessmentNodes.Data.AssessmentNodeRecords.Items;
		const id = response.Data.AssessmentTemplate.id;
		console.log("assessmentTemplate", assessmentTemplate)
		return {
			location: `${id}/edit`,
			assessmentTemplate,
			assessmentNodes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment template: ${error.message}`);
	}
};
